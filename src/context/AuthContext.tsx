import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface User {
  user_id: string;
  email: string;
  role: "CANDIDATE" | "EMPLOYER";
  first_name: string;
  last_name: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (data: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const isAuthenticated = !!accessToken;

  // 🔥 load from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("access");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setAccessToken(token);
    }
  }, []);

  // 🔥 LOGIN
  const login = (data: any) => {
    const userData = {
      user_id: data.user_id,
      email: data.email,
      role: data.role,
      first_name: data.first_name,
      last_name: data.last_name,
    };

    setUser(userData);
    setAccessToken(data.access);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
  };

  // 🔥 LOGOUT (UPDATED)
  const logout = () => {
    setUser(null);
    setAccessToken(null);

    // remove only auth-related data
    localStorage.removeItem("user");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};