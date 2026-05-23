'use client';

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  verifyOtpService,
  resendOtpService,
  verifyForgotPasswordOtpService,
  resendForgotPasswordOtpService,
} from '../../services/authService';



const OTP_LENGTH = 6;
const RESEND_TIME = 60;

type OTPMode = 'register' | 'forgot-password';

const OTPForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const mode: OTPMode =
    location.state?.mode || 'register';

  const [otp, setOtp] = useState<string[]>(
    Array(OTP_LENGTH).fill('')
  );

  const [timer, setTimer] = useState(RESEND_TIME);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] =
    useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const inputRefs = useRef<
    (HTMLInputElement | null)[]
  >([]);

  // redirect safely
  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  if (!email) return null;

  // countdown
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // OTP input
  const handleChange = (
    value: string,
    index: number
  ) => {
    const digit = value.replace(/\D/g, '');

    const newOtp = [...otp];
    newOtp[index] = digit.slice(-1);
    setOtp(newOtp);

    if (
      digit &&
      index < OTP_LENGTH - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }

    setError('');
  };

  // backspace
  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === 'Backspace' &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // VERIFY
  const handleVerify = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const otpValue = otp.join('');

    if (otpValue.length !== OTP_LENGTH) {
      setError('Please enter complete OTP');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      let result;

      if (mode === 'forgot-password') {
        result =
          await verifyForgotPasswordOtpService({
            email,
            otp: otpValue,
          });
      } else {
        result =
          await verifyOtpService({
            email,
            otp: otpValue,
          });
      }

      if (result?.message) {
        setSuccess(result.message);

        setTimeout(() => {
          if (
            mode ===
            'forgot-password'
          ) {
            navigate(
              '/reset-password',
              {
                state: {
                  email,
                  resetToken:
                    result.reset_token,
                },
              }
            );
          } else {
            navigate('/login');
          }
        }, 1000);
      }
    } catch (err: any) {
      const data =
        err.response?.data;

      setError(
        data?.details?.otp ||
          data?.details?.email ||
          data?.error ||
          'Invalid OTP'
      );

      setOtp(
        Array(OTP_LENGTH).fill('')
      );
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  // RESEND
  const handleResend = async () => {
    setIsResending(true);
    setError('');
    setSuccess('');

    try {
      let result;

      if (
        mode === 'forgot-password'
      ) {
        result =
          await resendForgotPasswordOtpService(
            email
          );
      } else {
        result =
          await resendOtpService(
            email
          );
      }

      if (
        result?.success ||
        result?.message
      ) {
        setTimer(RESEND_TIME);
        setOtp(
          Array(OTP_LENGTH).fill('')
        );
        inputRefs.current[0]?.focus();
        setSuccess(
          'OTP resent successfully'
        );
      }
    } catch (err: any) {
      setError(
        err.response?.data
          ?.message ||
          'Failed to resend OTP'
      );
    } finally {
      setIsResending(false);
    }
  };

  const inputClass =
    'w-12 h-12 text-center text-lg font-semibold bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40';

  return (
    <form onSubmit={handleVerify} className="space-y-6">
      {/* EMAIL */}
      <div className="text-center">
        <p className="text-sm text-gray-300">
          Enter OTP sent to
        </p>
        <p className="text-white font-medium">{email}</p>
      </div>

      {/* OTP BOXES */}
      <div className="flex justify-center gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={inputClass}
          />
        ))}
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-400 text-sm text-center">
          {error}
        </p>
      )}

      {/* SUCCESS */}
      {success && (
        <p className="text-green-400 text-sm text-center">
          {success}
        </p>
      )}

      {/* VERIFY BUTTON */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? 'Verifying...' : 'Verify OTP'}
        <ArrowRight size={18} />
      </button>

      {/* RESEND */}
      <div className="text-center text-sm text-gray-300">
        {timer > 0 ? (
          <p>
            Resend OTP in{' '}
            <span className="text-blue-400 font-medium">
              {timer}s
            </span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="text-blue-400 hover:underline"
          >
            {isResending ? 'Resending...' : 'Resend OTP'}
          </button>
        )}
      </div>
    </form>
  );
};

export default OTPForm;