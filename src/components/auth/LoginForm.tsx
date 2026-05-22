'use client';

import { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';


export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const inputClass =
    'w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 backdrop-blur-md';

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-xs text-gray-300 mb-1">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs text-gray-300 mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
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

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
      >
        Login
        <ArrowRight size={18} />
      </button>
          {/* Signup */}
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