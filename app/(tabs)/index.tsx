import { useState } from "react";
import { Pressable, Text } from "react-native";
import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { SearchBar } from "@/components/ui/search-bar";
import { ThemedText } from "@/components/ui/themed-text";
import { useAuthenticatedUser } from "@/contexts/auth-context";
import { useFollowers } from "@/hooks/use-followers";
import { useFollowing } from "@/hooks/use-following";
import { supabase } from "@/lib/supabase";

export default function HomeScreen() {
	const [search, setSearch] = useState("");
	const { userId } = useAuthenticatedUser();

	const { data: followers, isLoading } = useFollowers(userId);
	const { data: following } = useFollowing(userId);

	return (
		<ContentSafeArea>
			<ThemedText variant="h1">Home</ThemedText>
			<Pressable onPress={async () => await supabase.auth.signOut()}>
				<Text>Sign Out</Text>
			</Pressable>
			<SearchBar value={search} onChangeText={setSearch} />
			{followers && followers.length > 0 && (
				<>
					<ThemedText variant="body">Hello</ThemedText>
					<ThemedText variant="body">Followers: {followers.length}</ThemedText>
					{followers.map((follower) => (
						<Text key={follower.id}>{JSON.stringify(follower)}</Text>
					))}
				</>
			)}
		</ContentSafeArea>
	);
}
