import { Stack } from 'expo-router';
import { AuthProvider } from '../utils/context/authContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="editProfile" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
