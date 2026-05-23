import AuthLayout from '../../layouts/AuthLayout';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
     
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your new password"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
   
    
 