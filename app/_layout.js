// app/_layout.js (root layout)
import { Stack } from 'expo-router';
import '../global.css';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" /> 
        <Stack.Screen name="profile" /> {/* Separate profile screen outside tab structure */}
        <Stack.Screen name="filter" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="product/[id]" />
      </Stack>
    </AuthProvider>
  );
}