import "../global.css";

import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import { supabase } from "@/lib/supabase";

export const unstable_settings = {
	anchor: "(tabs)",
};

export default function RootLayout() {
	const router = useRouter();

	const [fontsLoaded] = useFonts({
		"Manrope-Regular": require("@/assets/fonts/Manrope-Regular.ttf"),
		"Manrope-Medium": require("@/assets/fonts/Manrope-Medium.ttf"),
		"Manrope-SemiBold": require("@/assets/fonts/Manrope-SemiBold.ttf"),
		"Manrope-Bold": require("@/assets/fonts/Manrope-Bold.ttf"),
	});

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

	// While fonts are loading, render a simple loading indicator so text components use the loaded fonts when mounted.
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
				<Stack.Screen
					name="modal"
					options={{ presentation: "modal", title: "Modal" }}
				/>
			</Stack>
			<StatusBar style="auto" />
		</>
	);
}
