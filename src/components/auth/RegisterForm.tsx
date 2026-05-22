'use client';

import {
  useState,
  type FormEvent,
  type ChangeEvent,
} from 'react';
import {
  Eye,
  EyeOff,
  ArrowRight,
} from 'lucide-react';

import {
  useNavigate,
  Link,
} from 'react-router-dom';

import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validatePhone,
  validateLocation,
} from '../../utils/validators';

import { registerUser } from '../../services/authService';

import type { UserRole } from '../../types/auth';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  location: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

type ErrorState = Partial<Record<keyof FormData, string[]>> & {
  formError?: string[];
};

export default function RegisterForm() {
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('CANDIDATE');

  const [formData, setFormData] =
    useState<FormData>({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      location: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    });

  const [errors, setErrors] =
    useState<ErrorState>({});
  const [showPassword, setShowPassword] =
    useState(false);
  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [isLoading, setIsLoading] =
    useState(false);
  const [submitError, setSubmitError] =
    useState('');

  const inputClass =
    'w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 backdrop-blur-md';

  // Reusable error renderer
  const renderErrors = (
    fieldErrors?: string[]
  ) => {
    if (
      !fieldErrors ||
      fieldErrors.length === 0
    )
      return null;

    return (
      <div className="text-red-400 text-xs mt-1 space-y-1">
        {fieldErrors.map((err, index) => (
          <p key={index}>{err}</p>
        ))}
      </div>
    );
  };

  const handleChange = (
  e: ChangeEvent<HTMLInputElement>
) => {
  const { name, value, type } =
    e.target;

  let updatedValue: string | boolean =
    type === 'checkbox'
      ? e.target.checked
      : value;

  // First name → only letters
  if (name === 'first_name') {
    updatedValue = String(value).replace(
      /[^A-Za-z]/g,
      ''
    );
  }

  // Last name → letters + spaces
  if (name === 'last_name') {
    updatedValue = String(value).replace(
      /[^A-Za-z\s]/g,
      ''
    );
  }

  // Phone formatting
  if (name === 'phone_number') {
    updatedValue = String(value)
      .replace(/\D/g, '')
      .slice(0, 10);
  }

  setFormData((prev) => ({
    ...prev,
    [name]: updatedValue,
  }));

  if (submitError) setSubmitError('');

  let error = '';

  switch (name) {
    case 'first_name':
      error = validateFirstName(
        updatedValue as string
      );
      break;

    case 'last_name':
      error = validateLastName(
        updatedValue as string
      );
      break;

    case 'email':
      error = validateEmail(
        updatedValue as string
      );
      break;

    case 'phone_number':
      error = validatePhone(
        updatedValue as string
      );
      break;

    case 'location':
      error = validateLocation(
        updatedValue as string
      );
      break;

    case 'password':
      error = validatePassword(
        updatedValue as string
      );

      setErrors((prev) => ({
        ...prev,
        confirmPassword: [
          validateConfirmPassword(
            updatedValue as string,
            formData.confirmPassword
          ),
        ].filter(Boolean),
      }));
      break;

    case 'confirmPassword':
      error = validateConfirmPassword(
        formData.password,
        updatedValue as string
      );
      break;

    default:
      break;
  }

  setErrors((prev) => ({
    ...prev,
    [name]: error ? [error] : [],
  }));
};

  const validateForm = () => {
    const newErrors: ErrorState = {};

    if (role === 'CANDIDATE') {
      const firstNameError =
        validateFirstName(
          formData.first_name
        );
      const lastNameError =
        validateLastName(
          formData.last_name
        );

      if (firstNameError)
        newErrors.first_name = [
          firstNameError,
        ];
      if (lastNameError)
        newErrors.last_name = [
          lastNameError,
        ];
    }

    const emailError = validateEmail(
      formData.email
    );
    const phoneError = validatePhone(
      formData.phone_number
    );
    const locationError =
      validateLocation(
        formData.location
      );
    const passwordError =
      validatePassword(
        formData.password
      );
    const confirmError =
      validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      );

    if (emailError)
      newErrors.email = [emailError];
    if (phoneError)
      newErrors.phone_number = [
        phoneError,
      ];
    if (locationError)
      newErrors.location = [
        locationError,
      ];
    if (passwordError)
      newErrors.password = [
        passwordError,
      ];
    if (confirmError)
      newErrors.confirmPassword = [
        confirmError,
      ];

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = [
        'Please accept Terms & Privacy Policy',
      ];
    }

    setErrors(newErrors);
    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setErrors({});
    setSubmitError('');

    if (!validateForm()) return;

    setIsLoading(true);

    const payload = {
      ...(role === 'CANDIDATE' && {
        first_name:
          formData.first_name,
        last_name:
          formData.last_name,
      }),
      email: formData.email,
      password: formData.password,
      phone_number:
        formData.phone_number,
      location: formData.location,
       role
    };

    const result =
      await registerUser(payload);

   if (result?.message) {
  navigate('/verify-otp', {
    state: {
      email: formData.email,
      message: result.message,
    },
  });

    } else {
      if (result.errors) {
        setErrors(result.errors);
        
      }

      if (result.formError) {
        setSubmitError(
          result.formError
        );
      }
    }

    setIsLoading(false);
  };

  const hasErrors =
    Object.values(errors).some(
      (err) =>
        Array.isArray(err) &&
        err.length > 0
    );

  const isFormValid =
    formData.email &&
    formData.phone_number &&
    formData.location &&
    formData.password &&
    formData.confirmPassword &&
    formData.agreeToTerms &&
    !hasErrors &&
    (role === 'EMPLOYER' ||
      (formData.first_name &&
        formData.last_name));

  return (
    <div>
      {/* Role Toggle */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={() =>
            setRole('CANDIDATE')
          }
          className={`py-2.5 rounded-xl font-medium ${
            role === 'CANDIDATE'
              ? 'bg-gradient-to-r from-blue-900 to-blue-600 text-white'
              : 'bg-white/10 text-gray-300'
          }`}
        >
          Job Seeker
        </button>

        <button
          type="button"
          onClick={() =>
            setRole('EMPLOYER')
          }
          className={`py-2.5 rounded-xl font-medium ${
            role === 'EMPLOYER'
              ? 'bg-gradient-to-r from-blue-900 to-blue-600 text-white'
              : 'bg-white/10 text-gray-300'
          }`}
        >
          Employer
        </button>
      </div>

      {/* Backend Form Error */}
      {submitError && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-400 text-red-300 text-sm">
          {submitError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {role === 'CANDIDATE' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                name="first_name"
                value={
                  formData.first_name
                }
                onChange={
                  handleChange
                }
                placeholder="First Name"
                className={inputClass}
              />
              {renderErrors(
                errors.first_name
              )}
            </div>

            <div>
              <input
                name="last_name"
                value={
                  formData.last_name
                }
                onChange={
                  handleChange
                }
                placeholder="Last Name"
                className={inputClass}
              />
              {renderErrors(
                errors.last_name
              )}
            </div>
          </div>
        )}

        <div>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={inputClass}
          />
          {renderErrors(errors.email)}
        </div>

        <div>
          <input
            name="phone_number"
            value={
              formData.phone_number
            }
            onChange={handleChange}
            placeholder="Phone"
            className={inputClass}
          />
          {renderErrors(
            errors.phone_number
          )}
        </div>

        <div>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className={inputClass}
          />
          {renderErrors(
            errors.location
          )}
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <input
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              name="password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              placeholder="Password"
              className={`${inputClass} pr-10`}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
          {renderErrors(
            errors.password
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <div className="relative">
            <input
              type={
                showConfirmPassword
                  ? 'text'
                  : 'password'
              }
              name="confirmPassword"
              value={
                formData.confirmPassword
              }
              onChange={
                handleChange
              }
              placeholder="Confirm Password"
              className={`${inputClass} pr-10`}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
          {renderErrors(
            errors.confirmPassword
          )}
        </div>

        {/* Terms */}
        <div>
          <label className="flex gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={
                formData.agreeToTerms
              }
              onChange={
                handleChange
              }
            />
            I agree to Terms &
            Privacy Policy
          </label>
          {renderErrors(
            errors.agreeToTerms
          )}
        </div>

      <button
  type="submit"
  disabled={
    !isFormValid || isLoading
  }
  className="w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
>
  {isLoading
    ? 'Creating...'
    : 'Create Account'}

  <ArrowRight size={18} />
</button>

<div className="pt-4 text-center">
  <p className="text-sm text-gray-300">
    Already have an account?
    <Link
      to="/login"
      className="ml-1 font-medium text-blue-400 hover:text-blue-300 hover:underline transition"
    >
      Log in
    </Link>
  </p>
</div>
      </form>
    </div>
  );
}