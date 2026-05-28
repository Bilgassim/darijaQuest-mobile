import { useEffect } from 'react';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { toast } from 'sonner';
import { useAuth } from './useAuth';

export const usePushNotifications = () => {
  const { user } = useAuth();

  const requestPermissions = async () => {
    if (!Capacitor.isNativePlatform()) {
      return false;
    }

    try {
      const result = await PushNotifications.requestPermissions();
      if (result.receive === 'granted') {
        await PushNotifications.register();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error requesting push notification permissions:', error);
      return false;
    }
  };

  const scheduleReminderNotification = async () => {
    if (!Capacitor.isNativePlatform() || !user) return;

    try {
      // Programmer une notification de rappel pour demain à 19h
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(19, 0, 0, 0);

      // Note: Pour les vraies notifications programmées, vous devrez utiliser
      // @capacitor/local-notifications et configurer un service backend
      console.log('Notification programmée pour:', tomorrow);
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  const celebrateStreak = async (streakCount: number) => {
    if (!Capacitor.isNativePlatform()) {
      toast.success(`🎉 Félicitations ! ${streakCount} jours d'affilée !`);
      return;
    }

    try {
      // Afficher une notification de célébration
      const message = streakCount >= 7 
        ? `🔥 Incroyable ! ${streakCount} jours d'affilée !`
        : `👏 Bravo pour ${streakCount} jours d'affilée !`;
      
      toast.success(message);
    } catch (error) {
      console.error('Error showing celebration:', error);
    }
  };

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const initPushNotifications = async () => {
      // Écouter l'enregistrement des notifications push
      await PushNotifications.addListener('registration', token => {
        console.log('Push registration success, token: ' + token.value);
        // Sauvegarder le token dans Supabase si nécessaire
      });

      // Écouter les erreurs d'enregistrement
      await PushNotifications.addListener('registrationError', err => {
        console.error('Registration error: ', err.error);
      });

      // Écouter les notifications reçues
      await PushNotifications.addListener('pushNotificationReceived', notification => {
        console.log('Push notification received: ', notification);
        toast.info(notification.body || 'Nouvelle notification');
      });

      // Écouter les actions sur les notifications
      await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
        console.log('Push notification action performed', notification.actionId, notification.inputValue);
      });
    };

    initPushNotifications();

    return () => {
      PushNotifications.removeAllListeners();
    };
  }, []);

  return {
    requestPermissions,
    scheduleReminderNotification,
    celebrateStreak
  };
};