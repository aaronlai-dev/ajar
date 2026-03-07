import "../global.css";

import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "react-native-reanimated";

import { supabase } from "@/lib/supabase";

export const unstable_settings = {
	anchor: "(tabs)",
};

export default function RootLayout() {
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
