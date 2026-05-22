import AuthLayout from '../../layouts/AuthLayout';
import RegisterForm from '../../components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join and build your career journey"
    >
      <RegisterForm />
    </AuthLayout>
  );
}