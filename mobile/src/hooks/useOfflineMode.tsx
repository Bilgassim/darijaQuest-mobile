import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lesson } from '../data/lessons';
import { API_URL, getAuthHeader } from '../lib/api';

interface OfflineLesson extends Lesson {
  cachedAt: string;
}

interface OfflineProgress {
  lessonId: string;
  xpEarned: number;
  completedAt: string;
  synced: boolean;
}

export const useOfflineMode = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [cachedLessons, setCachedLessons] = useState<OfflineLesson[]>([]);
  const [pendingProgress, setPendingProgress] = useState<OfflineProgress[]>([]);

  const checkNetworkStatus = async () => {
    const state = await NetInfo.fetch();
    setIsOnline(!!state.isConnected);
  };

  const cacheLesson = async (lesson: Lesson) => {
    try {
      const cachedLesson: OfflineLesson = {
        ...lesson,
        cachedAt: new Date().toISOString()
      };
      await AsyncStorage.setItem(`lesson_${lesson.id}`, JSON.stringify(cachedLesson));
      setCachedLessons(prev => {
        const filtered = prev.filter(l => l.id !== lesson.id);
        return [...filtered, cachedLesson];
      });
    } catch (error) {
      console.error('Error caching lesson:', error);
    }
  };

  const getCachedLessons = async () => {
    try {
      const lessons: OfflineLesson[] = [];
      const keys = await AsyncStorage.getAllKeys();
      const lessonKeys = keys.filter(key => key.startsWith('lesson_'));
      const results = await AsyncStorage.multiGet(lessonKeys);
      results.forEach(([key, value]) => {
        if (value) lessons.push(JSON.parse(value));
      });
      setCachedLessons(lessons);
      return lessons;
    } catch (error) {
      console.error('Error getting cached lessons:', error);
      return [];
    }
  };

  const saveOfflineProgress = async (lessonId: string, xpEarned: number) => {
    try {
      const progress: OfflineProgress = {
        lessonId,
        xpEarned,
        completedAt: new Date().toISOString(),
        synced: false
      };
      const key = 'offline_progress';
      const stored = await AsyncStorage.getItem(key);
      let currentProgress: OfflineProgress[] = stored ? JSON.parse(stored) : [];
      currentProgress.push(progress);
      await AsyncStorage.setItem(key, JSON.stringify(currentProgress));
      setPendingProgress(currentProgress);
    } catch (error) {
      console.error('Error saving offline progress:', error);
    }
  };

  const syncWithBackend = async () => {
    if (!isOnline || pendingProgress.length === 0) return;
    try {
      const authHeader = await getAuthHeader(AsyncStorage);
      const unsyncedProgress = pendingProgress.filter(p => !p.synced);
      
      for (const progress of unsyncedProgress) {
        const response = await fetch(`${API_URL}/lessons/complete`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            ...authHeader 
          },
          body: JSON.stringify({ 
            lessonId: progress.lessonId, 
            xpEarned: progress.xpEarned 
          }),
        });

        if (response.ok) {
          progress.synced = true;
        }
      }

      const key = 'offline_progress';
      await AsyncStorage.setItem(key, JSON.stringify(pendingProgress));
      setPendingProgress([...pendingProgress]);
    } catch (error) {
      console.error('Error syncing with backend:', error);
    }
  };

  const loadPendingProgress = async () => {
    try {
      const key = 'offline_progress';
      const stored = await AsyncStorage.getItem(key);
      if (stored) setPendingProgress(JSON.parse(stored));
    } catch (error) {
      console.error('Error loading pending progress:', error);
    }
  };

  useEffect(() => {
    const initOfflineMode = async () => {
      await checkNetworkStatus();
      await getCachedLessons();
      await loadPendingProgress();
    };
    initOfflineMode();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(!!state.isConnected);
      if (state.isConnected) syncWithBackend();
    });

    return () => unsubscribe();
  }, []);

  return {
    isOnline,
    cachedLessons,
    pendingProgress: pendingProgress.filter(p => !p.synced),
    cacheLesson,
    getCachedLessons,
    saveOfflineProgress,
    syncWithBackend,
    checkNetworkStatus
  };
};
