import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import OTPPage from './pages/auth/OTPPage';
import VerifyIdentity from './components/auth/VerifyIdentity';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import { CandidateDashboard } from './pages/Candidate/CandidateDashboard';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Default route */}
                <Route
                    path="/"
                    element={<Navigate to="/signup" replace />}
                />

                {/* Register */}
                <Route
                    path="/signup"
                    element={<RegisterForm />}
                />
                 <Route
                    path="/login"
                    element={<LoginPage />}
                />
                 <Route
                    path="/verify-otp"
                    element={<OTPPage />}
                />

                {/* <Route path="*" element={<Navigate to="/signup" replace />} /> */}

                <Route path="/verifyIdentity" element={<VerifyIdentity />} />

                <Route path="/forgot-password" element={<ForgotPasswordPage />} />


                <Route path="/reset-password" element={<ResetPasswordPage />} />

                <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            </Routes>
            
        </BrowserRouter>
    );
}

export default App;