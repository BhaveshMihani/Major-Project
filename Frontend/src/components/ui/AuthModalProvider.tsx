import React, { createContext, useContext, useState } from 'react';

interface AuthModalContextType {
  showAuthModal: boolean;
  toggleAuthModal: () => void;
  authMode: string;
  setAuthModeSignIn: () => void;
  setAuthModeSignUp: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const useAuthModal = (): AuthModalContextType => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
};

export const AuthModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("signin"); // 'signin' or 'signup'

  const toggleAuthModal = () => setShowAuthModal(prev => !prev);
  const setAuthModeSignIn = () => setAuthMode("signin");
  const setAuthModeSignUp = () => setAuthMode("signup");

  return (
    <AuthModalContext.Provider
      value={{
        showAuthModal,
        toggleAuthModal,
        authMode,
        setAuthModeSignIn,
        setAuthModeSignUp
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};
