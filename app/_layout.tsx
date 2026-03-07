import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider } from "@/contexts/auth-context";

function RootLayoutNav() {
	const [fontsLoaded] = useFonts({
		"Manrope-Regular": require("@/assets/fonts/Manrope-Regular.ttf"),
		"Manrope-Medium": require("@/assets/fonts/Manrope-Medium.ttf"),
		"Manrope-SemiBold": require("@/assets/fonts/Manrope-SemiBold.ttf"),
		"Manrope-Bold": require("@/assets/fonts/Manrope-Bold.ttf"),
	});

	// While fonts are loading, render a simple loading indicator
	if (!fontsLoaded) {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="login" options={{ headerShown: false }} />
				<Stack.Screen name="signup" options={{ headerShown: false }} />
				<Stack.Screen
					name="modal"
					options={{ presentation: "modal", title: "Modal" }}
				/>
			</Stack>
			<StatusBar style="auto" />
		</>
	);
}

export default function RootLayout() {
	return (
		<AuthProvider>
			<RootLayoutNav />
		</AuthProvider>
	);
}
