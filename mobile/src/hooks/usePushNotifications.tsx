import { useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './useAuth';
import { API_URL, getAuthHeader } from '../lib/api';

export const usePushNotifications = () => {
  const { user } = useAuth();

  const registerTokenWithBackend = async (token: string) => {
    try {
      const authHeader = await getAuthHeader(AsyncStorage);
      await fetch(`${API_URL}/users/register-fcm`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...authHeader 
        },
        body: JSON.stringify({ 
          token, 
          deviceType: Platform.OS 
        }),
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du token FCM:', error);
    }
  };

  const requestPermissions = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Statut d\'autorisation:', authStatus);
        const token = await messaging().getToken();
        if (token) {
          console.log('FCM Token:', token);
          if (user) await registerTokenWithBackend(token);
        }
      }
      return enabled;
    } catch (error) {
      console.error('Erreur demande permissions notification:', error);
      return false;
    }
  };

  useEffect(() => {
    if (!user) return;

    // Demander les permissions au démarrage
    requestPermissions();

    // Écouter le rafraîchissement du token
    const unsubscribeTokenRefresh = messaging().onTokenRefresh(token => {
      registerTokenWithBackend(token);
    });

    // Écouter les messages au premier plan
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification?.title || 'Nouvelle notification',
        remoteMessage.notification?.body || ''
      );
    });

    return () => {
      unsubscribeTokenRefresh();
      unsubscribeForeground();
    };
  }, [user]);

  return {
    requestPermissions,
  };
};
