import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { useEffect } from 'react';
import { useNotifications } from '../hooks/useNotifications';

export default function RootLayout() {
  const { requestPermissions } = useNotifications();

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}