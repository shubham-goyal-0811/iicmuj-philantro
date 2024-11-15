import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    const storedUsername = localStorage.getItem('username');
    setIsAuthenticated(storedAuthStatus === 'true');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const login = (user) => {
    setIsAuthenticated(true);
    setUsername(user.username);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', user.username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}