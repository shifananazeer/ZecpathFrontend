import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import AuthLayout from '../../layouts/AuthLayout';
export default function ForgotPasswordPage() {
  return (
    <AuthLayout
         title="Welcome Back"
         subtitle="Login to continue your journey"
       >
      <ForgotPasswordForm />
      </AuthLayout>
  );
}