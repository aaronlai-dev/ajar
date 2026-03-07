import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ui/themed-text";
import { supabase } from "@/lib/supabase";

export default function HomeScreen() {
	return (
		<SafeAreaView>
			<ThemedText variant="h1">Home</ThemedText>
			<Pressable onPress={async () => await supabase.auth.signOut()}>
				<Text>Sign Out</Text>
			</Pressable>
		</SafeAreaView>
	);
}
