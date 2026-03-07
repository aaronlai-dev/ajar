import { useState } from "react";
import { Pressable, TextInput } from "react-native";
import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { ThemedText } from "@/components/ui/themed-text";

const FriendsScreen = () => {
	const [searchFriend, setSearchFriend] = useState("");

	return (
		<ContentSafeArea>
			<ThemedText variant="h1">Friends</ThemedText>
			<TextInput
				placeholder="Search"
				value={searchFriend}
				onChangeText={setSearchFriend}
			/>
			<Pressable>
				<ThemedText variant="body">Request Friend</ThemedText>
			</Pressable>
		</ContentSafeArea>
	);
};

export default FriendsScreen;
