import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { queryClient } from "@/lib/query-client";

function RootLayoutNav() {
	const [fontsLoaded] = useFonts({
		"GT-Maru-Medium": require("@/assets/fonts/GT-Maru-Medium-Trial.otf"),
		"Manrope-Regular": require("@/assets/fonts/Manrope-Regular.ttf"),
		"Manrope-Medium": require("@/assets/fonts/Manrope-Medium.ttf"),
		"Manrope-SemiBold": require("@/assets/fonts/Manrope-SemiBold.ttf"),
		"Manrope-Bold": require("@/assets/fonts/Manrope-Bold.ttf"),
	});

	const { isAuthenticated, isLoading } = useAuth();

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
				{/* Unauthenticated routes */}
				<Stack.Protected guard={!isAuthenticated}>
					<Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
					<Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
				</Stack.Protected>

				{/* Authenticated routes */}
				<Stack.Protected guard={isAuthenticated}>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen
						name="modal"
						options={{
							presentation: "modal",
							headerShown: false,
						}}
					/>
				</Stack.Protected>
			</Stack>
			<StatusBar style="auto" />
		</>
	);
}

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView>
				<BottomSheetModalProvider>
					<AuthProvider>
						<RootLayoutNav />
					</AuthProvider>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</QueryClientProvider>
	);
}
