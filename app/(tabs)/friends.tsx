import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

const FriendsScreen = () => {
	const [searchFriend, setSearchFriend] = useState("");

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
			headerImage={
				<IconSymbol
					size={310}
					color="#808080"
					name="chevron.left.forwardslash.chevron.right"
					style={styles.headerImage}
				/>
			}
		>
			<ThemedView style={styles.titleContainer}>
				<ThemedText
					type="title"
					style={{
						fontFamily: Fonts.rounded,
					}}
				>
					Friends
				</ThemedText>
			</ThemedView>
			<ThemedText>Friends page</ThemedText>
			<TextInput
				placeholder="Search"
				value={searchFriend}
				onChangeText={setSearchFriend}
			/>
			<Pressable>
				<Text>Request Friend</Text>
			</Pressable>
		</ParallaxScrollView>
	);
};

const styles = StyleSheet.create({
	headerImage: {
		color: "#808080",
		bottom: -90,
		left: -35,
		position: "absolute",
	},
	titleContainer: {
		flexDirection: "row",
		gap: 8,
	},
});

export default FriendsScreen;
