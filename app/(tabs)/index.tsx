import { Pressable, Text } from "react-native";

import { supabase } from "@/lib/supabase";

export default function HomeScreen() {
	return (
		<Pressable onPress={async () => await supabase.auth.signOut()}>
			<Text>Sign Out</Text>
		</Pressable>
	);
}
