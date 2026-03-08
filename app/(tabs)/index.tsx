import { useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { ContentSafeArea } from "@/components/layout/content-safe-area";
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
			{userId && <ThemedText variant="body">{userId}</ThemedText>}
			{isLoading && <Text>Loading...</Text>}
			<ScrollView>
				{followers && (
					<>
						<ThemedText variant="body">
							Pending : {followers.pending.length}
						</ThemedText>
						{followers.pending.map((follower) => (
							<Text key={follower.id}>{JSON.stringify(follower)}</Text>
						))}
						<ThemedText variant="body">
							Accepted : {followers.accepted.length}
						</ThemedText>
						{followers.accepted.map((follower) => (
							<Text key={follower.id}>{JSON.stringify(follower)}</Text>
						))}
					</>
				)}
				{following && (
					<>
						<ThemedText variant="body">
							Pending: {following.pending.length}
						</ThemedText>
						{following.pending.map((following) => (
							<Text key={following.id}>{JSON.stringify(following)}</Text>
						))}
						<ThemedText variant="body">
							Accepted : {following.accepted.length}
						</ThemedText>
						{following.accepted.map((following) => (
							<Text key={following.id}>{JSON.stringify(following)}</Text>
						))}
					</>
				)}
			</ScrollView>
		</ContentSafeArea>
	);
}
