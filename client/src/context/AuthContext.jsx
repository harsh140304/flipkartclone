import React, { createContext, useState, useEffect } from 'react';
import { fetchCurrentUser } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('fk_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      if (token) {
        try {
          const { data } = await fetchCurrentUser();
          setUser(data);
        } catch (error) {
          console.error("Failed to restore user", error);
          logout();
        }
      }
      setLoading(false);
    };
    restoreUser();
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem('fk_token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('fk_token');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
