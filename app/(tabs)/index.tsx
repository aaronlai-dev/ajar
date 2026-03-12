import { Pressable, Text } from "react-native";
import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { ThemedText } from "@/components/ui/themed-text";
import { supabase } from "@/lib/supabase";

export default function HomeScreen() {
	return (
		<ContentSafeArea>
			<ThemedText variant="h1">Home</ThemedText>
			<Pressable onPress={async () => await supabase.auth.signOut()}>
				<Text>Sign Out</Text>
			</Pressable>
		</ContentSafeArea>
	);
}
