'use client';

import { useState } from 'react';
import { ArrowRight, Mail, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../services/authService';

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputClass =
    'w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 backdrop-blur-md';

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await forgotPassword(email);

      // move to otp screen
     navigate('/verify-otp', {
  state: {
    email,
    mode: 'forgot-password',
  },
});
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          'Failed to send OTP'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Glass Card */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 flex items-center justify-center shadow-lg">
            <Mail className="text-white" size={24} />
          </div>

          <h2 className="text-2xl font-bold text-white">
            Forgot Password
          </h2>

          <p className="text-sm text-gray-300 mt-2">
            Enter your registered email address.
            We’ll send you a 6-digit OTP.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* EMAIL */}
          <div>
            <label className="block text-xs text-gray-300 mb-1">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          {/* SEND OTP */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition disabled:opacity-50"
          >
            {loading
              ? 'Sending OTP...'
              : 'Send OTP'}
            <ArrowRight size={18} />
          </button>

          {/* BACK TO LOGIN */}
          <Link
            to="/login"
            className="w-full flex items-center justify-center gap-2 text-sm text-gray-300 hover:text-white transition pt-1"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
}