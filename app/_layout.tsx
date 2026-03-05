import "../global.css";

import React, { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { supabase } from "@/src/lib/supabase";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    // Check current session on mount and redirect to login if missing.
    supabase.auth.getSession().then(({ data }) => {
      const session = (data as any)?.session;
      if (!mounted) return;
      if (!session) {
        router.replace("/login");
      }
    });

    // Subscribe to auth state changes to keep routing in sync.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.replace("/login");
        } else {
          router.replace("/(tabs)");
        }
      },
    );

    return () => {
      mounted = false;
      // Unsubscribe if available
      (authListener as any)?.subscription?.unsubscribe?.();
    };
  }, [router]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
