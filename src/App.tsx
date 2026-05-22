import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import OTPPage from './pages/auth/OTPPage';
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
            </Routes>
            
        </BrowserRouter>
    );
}

export default App;