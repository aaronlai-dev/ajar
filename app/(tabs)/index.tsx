import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { RelationshipTabs } from "@/components/layout/relationship-tabs";
import { SearchBar } from "@/components/ui/search-bar";
import { ThemedText } from "@/components/ui/themed-text";
import { useAuthenticatedUser } from "@/contexts/auth-context";
import { useRelationships } from "@/hooks/use-relationships";
import { supabase } from "@/lib/supabase";

export default function HomeScreen() {
	const [search, setSearch] = useState("");
	const { userId } = useAuthenticatedUser();

	const { followers, following, isLoading } = useRelationships(userId);

	return (
		<ContentSafeArea>
			<ThemedText variant="h1">Home</ThemedText>
			<Pressable onPress={async () => await supabase.auth.signOut()}>
				<Text>Sign Out</Text>
			</Pressable>
			<SearchBar value={search} onChangeText={setSearch} />
			{isLoading ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size="large" color="#3b82f6" />
				</View>
			) : (
				<RelationshipTabs followers={followers} following={following} />
			)}
		</ContentSafeArea>
	);
}
