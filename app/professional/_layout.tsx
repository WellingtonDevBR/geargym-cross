import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="bookForm" options={{ headerShown: false }} />
      <Stack.Screen name="creditCardForm" options={{ headerShown: false }} />
      <Stack.Screen name="creditCardBillingForm" options={{ headerShown: false }} />
    </Stack>
  );
}
