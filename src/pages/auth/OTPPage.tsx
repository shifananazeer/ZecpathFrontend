import AuthLayout from '../../layouts/AuthLayout';
import OTPForm from '../../components/auth/OTPForm';

export default function OTPPage() {
     
  return (
    <AuthLayout
      title="Verify OTP"
      subtitle="Enter the code sent to your email or phone"
    >
      <OTPForm />
    </AuthLayout>
  );
}