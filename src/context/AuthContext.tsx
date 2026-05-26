import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { ReactNode } from "react";

import {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  clearSession,
} from "../utils/tokenStorage";

interface User {
  user_id: string;
  email: string;
  role: "CANDIDATE" | "EMPLOYER" | "ADMIN";
  first_name: string;
  last_name: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (data: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!accessToken;

  // 🔥 LOAD ON START
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = getAccessToken();

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setAccessTokenState(token);
    }

    setIsLoading(false);
  }, []);

  // 🔥 LOGIN
  const login = (data: any) => {
    const userData: User = {
      user_id: data.user_id,
      email: data.email,
      role: data.role,
      first_name: data.first_name,
      last_name: data.last_name,
    };

    setUser(userData);

    setAccessToken(data.access);
    setRefreshToken(data.refresh);

    setAccessTokenState(data.access);

    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 🔥 LOGOUT
  const logout = () => {
    setUser(null);
    setAccessTokenState(null);
    clearSession();
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};