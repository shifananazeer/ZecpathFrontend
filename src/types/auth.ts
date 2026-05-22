export type UserRole = 'CANDIDATE' | 'EMPLOYER';

export interface RegisterFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  location: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterPayload {
  first_name?: string;
  last_name?: string;
  email: string;
  phone_number: string;
  location: string;
  password: string;
  role: UserRole;
}

export interface RegisterResponse {
  success: boolean;
  email?: string;
  errors?: Record<string, string[]>;
  formError?: string;
}



export interface ApiResponse {
  message: string;
  success?: boolean;
  token?: string;
  user?: unknown;
}

