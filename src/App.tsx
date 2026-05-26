import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import RegisterForm from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import OTPPage from './pages/auth/OTPPage';
import VerifyIdentity from './components/auth/VerifyIdentity';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

import { CandidateDashboard } from './pages/Candidate/CandidateDashboard';
import { Profile } from './pages/Candidate/Profile';

import ProtectedRoute from './ProtectedRoute';
import { Employer } from './pages/Candidate/Employer';
import { PostPage } from './pages/Candidate/PostPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={   <Navigate to="/signup"replace/> } />

        {/* Public Routes */}
        <Route path="/signup" element={<RegisterForm />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/verify-otp" element={<OTPPage />} />

        <Route path="/verifyIdentity"  element={<VerifyIdentity />}/>

        <Route path="/forgot-password" element={   <ForgotPasswordPage /> } />

        <Route path="/reset-password" element={   <ResetPasswordPage /> } />

        {/* Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['CANDIDATE']} />}>
  <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
  <Route path="/candidate/profile" element={<Profile />} />
  <Route path="/candidate/employers" element={<Employer />} />
  <Route path='/candidate/post' element={<PostPage/>}/>
</Route>

        {/* Fallback */}
        {/* <Route
          path="*"
          element={
            <Navigate
              to="/signup"
              replace
            />
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;