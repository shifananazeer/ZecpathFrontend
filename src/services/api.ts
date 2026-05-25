import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  clearSession,
} from "../utils/tokenStorage";

/* -------------------------------------------------- */
/* Extended Axios Config */
/* -------------------------------------------------- */
interface CustomAxiosConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  skipAuth?: boolean;
  token?: string;
}

/* -------------------------------------------------- */
/* Axios Instance */
/* -------------------------------------------------- */
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* -------------------------------------------------- */
/* Refresh State */
/* -------------------------------------------------- */
let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (
  error: unknown,
  token: string | null = null
) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else if (token) p.resolve(token);
  });

  failedQueue = [];
};

/* -------------------------------------------------- */
/* REQUEST INTERCEPTOR */
/* -------------------------------------------------- */
api.interceptors.request.use(
  (config: CustomAxiosConfig) => {
    const token =
      config.token ||
      localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

/* -------------------------------------------------- */
/* RESPONSE INTERCEPTOR */
/* -------------------------------------------------- */
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as CustomAxiosConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // ❌ only handle auth failures
    if (
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    // ❌ ignore login/refresh endpoints
    if (
      originalRequest.url?.includes("/auth/login/") ||
      originalRequest.url?.includes("/auth/refresh/")
    ) {
      clearSession();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    /* -------------------------------------------------- */
    /* QUEUE REQUESTS */
    /* -------------------------------------------------- */
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization =
              `Bearer ${token}`;
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

      api.defaults.headers.common.Authorization =
        `Bearer ${newAccessToken}`;

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);

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