import api from './api';
import type { RegisterPayload , ApiResponse   } from '../types/auth';


export const registerUser = async (payload: RegisterPayload) => {
  try {
    const response = await api.post('/auth/register/', payload);

    console.log("REGISTER SUCCESS:", response.data);

    return response.data;
  } catch (error: any) {
    console.log("REGISTER FAILED STATUS:", error.response?.status);
    console.log("REGISTER FAILED DATA:", error.response?.data);

    throw error; // important so UI can handle it
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