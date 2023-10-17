import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // 로그인 처리 로직
    window.sessionStorage.setItem('userId', userData.userId);
    window.sessionStorage.setItem('username', userData.username);
    setUser(userData);
  };

  const logout = () => {
    window.sessionStorage.removeItem('userId');
    window.sessionStorage.removeItem('username');
    setUser(null);
  };

  const value = {
    user,
    setUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
