import { useState } from "react";
import { Pressable } from "react-native";
import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { SearchBar } from "@/components/ui/search-bar";
import { ThemedText } from "@/components/ui/themed-text";

const FriendsScreen = () => {
	const [search, setSearch] = useState("");

	return (
		<ContentSafeArea>
			<ThemedText variant="h1">Friends</ThemedText>
			<SearchBar value={search} onChangeText={setSearch} />
			<Pressable>
				<ThemedText variant="body">Request Friend</ThemedText>
			</Pressable>
		</ContentSafeArea>
	);
};

export default FriendsScreen;
