'use client';

import { useEffect, useState } from 'react';
import {
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
} from 'lucide-react';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { resetPasswordService } from '../../services/authService';

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const resetToken =
    location.state?.resetToken;

  const [password, setPassword] =
    useState('');
  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('');

  const [showPassword, setShowPassword] =
    useState(false);
  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);
  const [error, setError] =
    useState('');
  const [success, setSuccess] =
    useState('');

  // protect route
  useEffect(() => {
    if (!email || !resetToken) {
      navigate('/forgot-password');
    }
  }, [email, resetToken, navigate]);

  if (!email || !resetToken) return null;

  const inputClass =
    'w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40';

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError(
        'All fields are required'
      );
      return;
    }

    if (password.length < 8) {
      setError(
        'Password must be at least 8 characters'
      );
      return;
    }

    if (
      password !== confirmPassword
    ) {
      setError(
        'Passwords do not match'
      );
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result =
        await resetPasswordService({
          email,
          reset_token: resetToken,
          password,
          confirm_password:
            confirmPassword,
        });

      setSuccess(
        result?.message ||
          'Password reset successful'
      );

      setTimeout(() => {
        navigate('/login');
      }, 1200);
    } catch (err: any) {
      const data =
        err.response?.data;

      setError(
        data?.details
          ?.confirm_password ||
          data?.details?.password ||
          data?.error ||
          data?.message ||
          'Failed to reset password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 flex items-center justify-center shadow-lg">
            <Lock
              className="text-white"
              size={24}
            />
          </div>

          <h2 className="text-2xl font-bold text-white">
            Reset Password
          </h2>

          <p className="text-sm text-gray-300 mt-2">
            Enter your new password
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* NEW PASSWORD */}
          <div>
            <label className="block text-xs text-gray-300 mb-1">
              New Password
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="Enter new password"
                className={`${inputClass} pr-12`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-xs text-gray-300 mb-1">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                }
                value={
                  confirmPassword
                }
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm new password"
                className={`${inputClass} pr-12`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          {/* SUCCESS */}
          {success && (
            <p className="text-green-400 text-sm">
              {success}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition disabled:opacity-50"
          >
            {loading
              ? 'Resetting...'
              : 'Reset Password'}
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}