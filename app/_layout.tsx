import "../global.css";

import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { queryClient } from "@/lib/query-client";

function RootLayoutNav() {
	const [fontsLoaded] = useFonts({
		"Manrope-Regular": require("@/assets/fonts/Manrope-Regular.ttf"),
		"Manrope-Medium": require("@/assets/fonts/Manrope-Medium.ttf"),
		"Manrope-SemiBold": require("@/assets/fonts/Manrope-SemiBold.ttf"),
		"Manrope-Bold": require("@/assets/fonts/Manrope-Bold.ttf"),
	});

	const { isAuthenticated, isLoading } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		if (isLoading || !fontsLoaded) return;

		const inAuthGroup = segments[0] === "(auth)";
		const inTabsGroup = segments[0] === "(tabs)";

		if (!isAuthenticated && inTabsGroup) {
			// Redirect to signin if not authenticated and trying to access protected routes
			router.replace("/(auth)/login");
		} else if (isAuthenticated && inAuthGroup) {
			// Redirect to tabs if authenticated and on auth screens
			router.replace("/(tabs)");
		}
	}, [isAuthenticated, segments, isLoading, fontsLoaded, router]);

	// Show loading while fonts or auth is loading
	if (!fontsLoaded || isLoading) {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<>
			<Stack>
				<Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
				<Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
			<StatusBar style="auto" />
		</>
	);
}

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RootLayoutNav />
			</AuthProvider>
		</QueryClientProvider>
	);
}
