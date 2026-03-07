import { useState } from "react";
import { Pressable, TextInput } from "react-native";
import { ThemedText } from "@/components/ui/themedText";

const FriendsScreen = () => {
	const [searchFriend, setSearchFriend] = useState("");

	return (
		<>
			<ThemedText variant="h1">Friends page</ThemedText>
			<TextInput
				placeholder="Search"
				value={searchFriend}
				onChangeText={setSearchFriend}
			/>
			<Pressable>
				<ThemedText variant="body">Request Friend</ThemedText>
			</Pressable>
		</>
	);
};

export default FriendsScreen;
