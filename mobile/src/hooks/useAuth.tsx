import React, { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../lib/api';

const GUEST_MODE_KEY = 'darija_guest_mode';
const TOKEN_KEY = 'darija_token';
const USER_KEY = 'darija_user';

export interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  loading: boolean;
  isGuest: boolean;
  enterGuestMode: () => void;
  exitGuestMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const guestVal = await AsyncStorage.getItem(GUEST_MODE_KEY);
        setIsGuest(guestVal === 'true');

        const savedUser = await AsyncStorage.getItem(USER_KEY);
        const token = await AsyncStorage.getItem(TOKEN_KEY);

        if (savedUser && token) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error('Erreur chargement session:', e);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: { message: data.error || 'Erreur lors de l\'inscription' } };
      }

      await AsyncStorage.setItem(TOKEN_KEY, data.token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setUser(data.user);
      setIsGuest(false);
      await AsyncStorage.removeItem(GUEST_MODE_KEY);

      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: { message: data.error || 'Erreur lors de la connexion' } };
      }

      await AsyncStorage.setItem(TOKEN_KEY, data.token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setUser(data.user);
      setIsGuest(false);
      await AsyncStorage.removeItem(GUEST_MODE_KEY);

      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
      await AsyncStorage.removeItem(GUEST_MODE_KEY);
      setUser(null);
      setIsGuest(false);
      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  };

  const enterGuestMode = async () => {
    setIsGuest(true);
    await AsyncStorage.setItem(GUEST_MODE_KEY, 'true');
  };

  const exitGuestMode = async () => {
    setIsGuest(false);
    await AsyncStorage.removeItem(GUEST_MODE_KEY);
    await AsyncStorage.removeItem('darija_guest_data');
  };

  const value = {
    user,
    signUp,
    signIn,
    signOut,
    loading,
    isGuest,
    enterGuestMode,
    exitGuestMode
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
