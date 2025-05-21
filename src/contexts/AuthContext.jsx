import { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/token/check-auth', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = async () => {
    await fetch('http://localhost:8080/client/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user,
      loading,
      logout,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}