'use client';

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  verifyOtpService,
  resendOtpService,
} from '../../services/authService';



const OTP_LENGTH = 6;
const RESEND_TIME = 60;

const OTPForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

    const email = location.state?.email;


  if (!email) {
    navigate("/register");
    return null;
  }

  const [otp, setOtp] = useState<string[]>(
    Array(OTP_LENGTH).fill('')
  );

  const [timer, setTimer] = useState(RESEND_TIME);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // countdown
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // handle input change
  const handleChange = (value: string, index: number) => {
    const digit = value.replace(/\D/g, '');

    const newOtp = [...otp];
    newOtp[index] = digit.slice(-1);
    setOtp(newOtp);

    // auto move next
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    setError('');
  };

  // backspace navigation
  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // VERIFY OTP
  const handleVerify = async (e: React.FormEvent) => {
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
const result = await verifyOtpService({
  email,
  otp: otpValue
});
 console.log('OTP VERIFY RESULT:', result);
    if (result?.message) {
  setSuccess(result.message);

  setTimeout(() => {
    navigate('/login');
  }, 1000);
      } else {
        setError(result.message || 'Invalid OTP');

        // 🔥 clear OTP on error
        setOtp(Array(OTP_LENGTH).fill(''));
        inputRefs.current[0]?.focus();
      }
   } catch (err: any) {
  const data = err.response?.data;

  // 🔥 extract backend error properly
  const backendError =
    data?.details?.otp ||
    data?.details?.email ||
    data?.error ||
    err.message ||
    'Something went wrong';

  setError(backendError);

  // clear OTP fields
  setOtp(Array(OTP_LENGTH).fill(''));

  // focus first input again
  inputRefs.current[0]?.focus();
} finally {
  setIsLoading(false);
}
  }

  // RESEND OTP
  const handleResend = async () => {
    setIsResending(true);
    setError('');
    setSuccess('');

    try {
      const result = await resendOtpService(email);

      if (result.success) {
        setTimer(RESEND_TIME);

        // 🔥 clear OTP on resend
        setOtp(Array(OTP_LENGTH).fill(''));
        inputRefs.current[0]?.focus();

        setSuccess('OTP resent successfully');
      } else {
        setError(result.message || 'Failed to resend OTP');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Something went wrong'
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