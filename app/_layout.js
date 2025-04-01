import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
// import { AuthProvider } from '../context/auth';
import '../global.css';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      {/* <StatusBar style="auto" /> */}
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)/home"  options={{ headerShown: false }} />
        <Stack.Screen name="filter"  options={{ headerShown: false }} />
        <Stack.Screen name="search"  options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]"  options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}