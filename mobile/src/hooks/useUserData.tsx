import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, getAuthHeader } from '../lib/api';

export interface UserProfile {
  id: string;
  user_id: string;
  name: string | null;
  avatar: string | null;
  theme: string | null;
}

export interface UserProgress {
  id: string;
  user_id: string;
  xp: number;
  level: number;
  streak: number;
  last_active: string;
}

export interface Badge {
  id: string;
  badge_id: string;
  earned_at: string;
}

export interface LessonCompletion {
  lesson_id: string;
  completed_at: string;
  score: number | null;
}

interface UserData {
  profile: UserProfile | null;
  progress: UserProgress | null;
  badges: Badge[];
  completedLessons: LessonCompletion[];
}

const GUEST_DATA_KEY = 'darija_guest_data';

const getDefaultGuestData = (): UserData => ({
  profile: {
    id: 'guest',
    user_id: 'guest',
    name: 'Invité',
    avatar: 'default',
    theme: 'purple'
  },
  progress: {
    id: 'guest',
    user_id: 'guest',
    xp: 0,
    level: 1,
    streak: 0,
    last_active: new Date().toISOString()
  },
  badges: [],
  completedLessons: []
});

const loadGuestData = async (): Promise<UserData> => {
  try {
    const saved = await AsyncStorage.getItem(GUEST_DATA_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading guest data:', e);
  }
  return getDefaultGuestData();
};

const saveGuestData = async (data: UserData) => {
  try {
    await AsyncStorage.setItem(GUEST_DATA_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving guest data:', e);
  }
};

export const useUserData = () => {
  const { user, isGuest } = useAuth();
  const [userData, setUserData] = useState<UserData>({
    profile: null,
    progress: null,
    badges: [],
    completedLessons: []
  });
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    if (isGuest) {
      const guestData = await loadGuestData();
      setUserData(guestData);
      setLoading(false);
      return;
    }

    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const authHeader = await getAuthHeader(AsyncStorage);
      const response = await fetch(`${API_URL}/users/me`, {
        headers: { ...authHeader }
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user, isGuest]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (isGuest) {
      const prev = userData;
      const newData = {
        ...prev,
        profile: prev.profile ? { ...prev.profile, ...updates } : null
      };
      await saveGuestData(newData);
      setUserData(newData);
      return;
    }

    try {
      const authHeader = await getAuthHeader(AsyncStorage);
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          ...authHeader 
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        setUserData(prev => ({
          ...prev,
          profile: prev.profile ? { ...prev.profile, ...updates } : null
        }));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const completeLesson = async (lessonId: string, xpEarned: number) => {
    if (isGuest) {
      if (userData.completedLessons.length >= 2 && !userData.completedLessons.some(l => l.lesson_id === lessonId)) {
        return;
      }
      const prev = userData;
      const today = new Date().toISOString();
      const newXp = (prev.progress?.xp || 0) + xpEarned;
      const newLevel = Math.floor(newXp / 100) + 1;

      const newData = {
        ...prev,
        progress: prev.progress ? {
          ...prev.progress,
          xp: newXp,
          level: newLevel,
          last_active: today
        } : null,
        completedLessons: prev.completedLessons.some(l => l.lesson_id === lessonId)
          ? prev.completedLessons
          : [{ lesson_id: lessonId, completed_at: today, score: xpEarned }, ...prev.completedLessons]
      };
      await saveGuestData(newData);
      setUserData(newData);
      return;
    }

    try {
      const authHeader = await getAuthHeader(AsyncStorage);
      const response = await fetch(`${API_URL}/lessons/complete`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...authHeader 
        },
        body: JSON.stringify({ lessonId, xpEarned }),
      });

      if (response.ok) {
        fetchUserData(); // Rafraîchir les données
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  const canAccessLesson = (lessonId: string): boolean => {
    if (!isGuest) return true;
    if (userData.completedLessons.some(l => l.lesson_id === lessonId)) return true;
    return userData.completedLessons.length < 2;
  };

  const guestLessonLimit = isGuest ? 2 - userData.completedLessons.length : null;

  return {
    userData,
    loading,
    updateProfile,
    completeLesson,
    refetch: fetchUserData,
    canAccessLesson,
    guestLessonLimit,
    isGuest
  };
};
