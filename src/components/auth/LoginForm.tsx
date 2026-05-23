'use client';

import { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth(); // 🔥 context

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputClass =
    'w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 backdrop-blur-md';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const result = await loginUser({
        email,
        password,
      });

      console.log('LOGIN RESULT:', result);

      if (result?.access) {
        // 🔥 IMPORTANT: use context only
        login(result);

        // 🔥 role-based redirect
        if (result.role === 'CANDIDATE') {
          navigate('/candidate/dashboard');
        } else if (result.role === 'EMPLOYER') {
          navigate('/employer/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError('Invalid login response');
      }
    } catch (err: any) {
        console.log('LOGIN ERROR:', err.response?.data);

     const status = err.response?.status;
      const details = err.response?.data?.details;
      const message = err.response?.data?.message;

      if (
    status === 401 &&
    details === 'No active account found with the given credentials'
  ) 
     {
       setError('Email or password is incorrect');
    }  else {
    setError(
      message ||
      details ||
      'Login failed. Please try again.'
    );
  }
  } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* EMAIL */}
      <div>
        <label className="block text-xs text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="block text-xs text-gray-300 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`${inputClass} pr-11`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
        {/* FORGOT PASSWORD */}
        <div className="flex justify-end mt-2">
          <a href="/forgot-password"
            className="text-xs text-blue-300 hover:text-white transition"
          >
            Forgot Password?
          </a>
        </div>
     
      {/* ERROR */}
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? 'Logging in...' : 'Login'}
        <ArrowRight size={18} />
      </button>

      {/* SIGNUP */}
      <p className="text-center text-sm text-gray-300 pt-1">
        Don't have an account?{' '}
        <a
          href="/signup"
          className="text-purple-300 font-medium hover:text-white"
        >
          Sign up
        </a>
      </p>
    </form>
  );
}
