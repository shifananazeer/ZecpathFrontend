import axios from 'axios';
import type {
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  clearSession,
} from '../utils/tokenStorage';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000/api';

if (!API_BASE_URL) {
  console.warn(
    'VITE_API_BASE_URL is not set. API calls may fail.'
  );
}

/* -------------------------------------------------- */
/* Extended Axios Config */
/* -------------------------------------------------- */
interface RetryAxiosRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/* -------------------------------------------------- */
/* Axios Instance */
/* -------------------------------------------------- */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* -------------------------------------------------- */
/* Refresh Queue */
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
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

/* -------------------------------------------------- */
/* Request Interceptor */
/* -------------------------------------------------- */
api.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* -------------------------------------------------- */
/* Response Interceptor */
/* -------------------------------------------------- */
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as RetryAxiosRequestConfig;

    /* no request config */
    if (!originalRequest) {
      return Promise.reject(error);
    }

    /* only handle 401 */
    if (
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    /* login should fail normally */
    if (
      originalRequest.url?.includes('/auth/login/')
    ) {
      return Promise.reject(error);
    }

    /* prevent refresh recursion */
    if (
      originalRequest.url?.includes('/auth/refresh/')
    ) {
      clearSession();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    /* -------------------------------------------------- */
    /* Queue requests while refresh is running */
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
      window.location.href = '/login';
      return Promise.reject(error);
    }

    try {
      /* use raw axios -> avoid interceptor loop */
      const response = await axios.post(
        `${API_BASE_URL}/auth/refresh/`,
        {
          refresh: refreshToken,
        }
      );

      const newAccessToken =
        response.data.access;

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
      window.location.href = '/login';

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;