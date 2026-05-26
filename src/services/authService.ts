import api from './api';
import type { RegisterPayload , ApiResponse   } from '../types/auth';


import type { CustomAxiosConfig } from "./api"; // export it first

export const registerUser = async (
  payload: RegisterPayload
) => {
  try {
    const config: CustomAxiosConfig = {
      skipAuth: true,
    };

    const response = await api.post(
      "/auth/register/",
      payload,
      config
    );

    console.log("REGISTER SUCCESS:", response.data);
    return response.data;
  } catch (error: any) {
    console.log(
      "REGISTER FAILED STATUS:",
      error.response?.status
    );
    console.log(
      "REGISTER FAILED DATA:",
      error.response?.data
    );
    throw error;
  }
};

export const verifyOtpService = async (payload: {
  email: string;
  otp: string;
}) => {
  try {
    const response =
      await api.post<ApiResponse>(
        '/auth/verifyotp/',
        payload
      );

    return response.data;
  } catch (error: any) {
    console.log(
      'FULL OTP ERROR:',
      error.response
    );

    console.log(
      'ERROR DATA:',
      error.response?.data
    );

    console.log(
      'ERROR MESSAGE:',
      error.response?.data
        ?.message
    );

    throw error;
  }
};

export const resendOtpService =
  async (
    email: string
  ): Promise<ApiResponse> => {
    try {
      const response =
        await api.post<ApiResponse>(
          '/auth/resendotp/',
          { email }
        );

      return response.data;
    } catch (error: any) {
      console.log(
        'RESEND OTP ERROR:',
        error.response
      );

      throw error;
    }
  };

  export const loginUser = async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
};

export const forgotPassword = async (
  email: string
) => {
  const response = await api.post(
    '/auth/forgot-password/',
    { email },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export const verifyForgotPasswordOtpService =
  async (data: {
    email: string;
    otp: string;
  }) => {
    try {
      const response = await api.post(
        '/auth/forgot-password/verify/',
        data
      );

      return response.data;
    } catch (error: any) {
      console.log(
        'VERIFY FORGOT OTP ERROR:',
        error.response
      );
      throw error;
    }
  };

  export const resendForgotPasswordOtpService =
  async (email: string) => {
    try {
      const response = await api.post(
        '/auth/forgot-password/',
        { email }
      );

      return response.data;
    } catch (error: any) {
      console.log(
        'RESEND FORGOT OTP ERROR:',
        error.response
      );

      throw error;
    }
  };

/* =========================
   RESET PASSWORD
   POST /api/auth/forgot-password/reset/
========================= */
export const resetPasswordService =
  async (data: {
    email: string;
    reset_token: string;
    password: string;
    confirm_password: string;
  }) => {
    try {
      const response = await api.post(
        '/auth/forgot-password/reset/',
        data
      );

      return response.data;
    } catch (error: any) {
      console.log(
        'RESET PASSWORD ERROR:',
        error.response
      );
      throw error;
    }
  };
