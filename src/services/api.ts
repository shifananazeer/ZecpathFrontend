import axios from "axios";
import type {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  clearSession,
} from "../utils/tokenStorage";

export interface CustomAxiosConfig extends AxiosRequestConfig {
  _retry?: boolean;
  skipAuth?: boolean;
  token?: string;
}

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://api.zecpath.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else if (token) p.resolve(token);
  });

  failedQueue = [];
};

// ✅ REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig & CustomAxiosConfig) => {
    if (config.skipAuth) return config;

    const token = config.token || getAccessToken();

    config.headers = config.headers ?? {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

// ✅ RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as (InternalAxiosRequestConfig & CustomAxiosConfig) | undefined;

    if (!originalRequest) return Promise.reject(error);

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const isPublicRoute =
      originalRequest.url?.includes("/auth/login/") ||
      originalRequest.url?.includes("/auth/register/") ||
      originalRequest.url?.includes("/auth/refresh/") ||
      originalRequest.url?.includes("/auth/verify-otp/");

    if (isPublicRoute) {
      clearSession();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // queue requests during refresh
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearSession();
      return Promise.reject(error);
    }

    try {
      const { data } = await axios.post(
        `${api.defaults.baseURL}/auth/refresh/`,
        {
          refresh: refreshToken,
        }
      );

      const newAccessToken = data.access;

      setAccessToken(newAccessToken);

      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearSession();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;