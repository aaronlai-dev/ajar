import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from "expo-router";
import { NAV_THEME } from '../theme';
import './global.css';
import { useColorScheme } from '../lib/useColorScheme';
import { useState } from 'react';
import { AuthProvider } from './contexts/auth';

export default function RootLayout() {
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [user, setUser] = useState(null);

  return (
    <AuthProvider>
      <NavThemeProvider value={NAV_THEME[colorScheme]}>
        <Stack>
          {/* Main App Screens */}
          <Stack.Screen 
            name="index" 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="(tabs)" 
            options={{ headerShown: false }} 
          />

          {/* Full-Screen Pending Requests Screen (No Nav Bar) */}
          <Stack.Screen 
            name="pendingRequestsModal" 
            options={{ 
              headerShown: false, 
              presentation: 'modal' // Makes it full-screen 
            }} 
          />
        </Stack>
      </NavThemeProvider>
    </AuthProvider>
  )
}
