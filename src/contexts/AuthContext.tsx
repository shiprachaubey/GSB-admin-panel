import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

// Mock data for demonstration
const mockUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@wellness.com',
  role: 'admin',
  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking if user is already logged in
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem('wellness-admin-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to authenticate
      // For now, we'll just simulate authentication
      await new Promise(resolve => setTimeout(resolve, 800)); // simulate network delay
      
      // Mock successful login
      setUser(mockUser);
      localStorage.setItem('wellness-admin-user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed', error);
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wellness-admin-user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      login,
      logout,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};