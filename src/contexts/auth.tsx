import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import LoginModal from "../Module/Auth/Pages/Login";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  openLoginModal: (pendingAction?: () => void) => void;
  closeLoginModal: () => void;
  onLoginSuccess: (token: string) => void;
  logout: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  openLoginModal: () => {},
  closeLoginModal: () => {},
  onLoginSuccess: () => {},
  logout: () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(false);
  // Stores an action to execute right after a successful login
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const isLoggedIn = !!token;

  // Sync token if cleared externally (e.g. in another tab)
  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const openLoginModal = useCallback((action?: () => void) => {
    if (action) setPendingAction(() => action);
    setShowLogin(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setShowLogin(false);
    setPendingAction(null);
  }, []);

  // Called by LoginModal after a successful API response
  const onLoginSuccess = useCallback((newToken: string) => {
    setToken(newToken);
    setShowLogin(false);
    // Execute any pending cart action
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [pendingAction]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, openLoginModal, closeLoginModal, onLoginSuccess, logout }}>
      {children}
      {/* Global login modal — rendered here so any component can trigger it */}
      <LoginModal show={showLogin} setShow={setShowLogin} />
    </AuthContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAuth = () => useContext(AuthContext);
