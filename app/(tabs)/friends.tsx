import { useState } from "react";
import { Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ui/themed-text";

const FriendsScreen = () => {
	const [searchFriend, setSearchFriend] = useState("");

	return (
		<SafeAreaView>
			<ThemedText variant="h1">Friends</ThemedText>
			<TextInput
				placeholder="Search"
				value={searchFriend}
				onChangeText={setSearchFriend}
			/>
			<Pressable>
				<ThemedText variant="body">Request Friend</ThemedText>
			</Pressable>
		</SafeAreaView>
	);
};

export default FriendsScreen;
