import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './src/hooks/useAuth';
import { AppNavigator } from './src/navigation/AppNavigator';
import { usePushNotifications } from './src/hooks/usePushNotifications';

const queryClient = new QueryClient();

const NotificationHandler = ({ children }: { children: React.ReactNode }) => {
  usePushNotifications();
  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NotificationHandler>
          <PaperProvider>
            <SafeAreaProvider>
              <AppNavigator />
            </SafeAreaProvider>
          </PaperProvider>
        </NotificationHandler>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
