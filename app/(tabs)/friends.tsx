// FriendsScreen.tsx
import { useRef, useState } from "react";
import { type TextInput, View } from "react-native";
import Animated from "react-native-reanimated";
import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { FriendSearchHeader } from "@/components/layout/friend-search-header";
import { RelationshipTabs } from "@/components/layout/relationship-tabs";
import { FriendSearchResults } from "@/components/ui/friend-search-results";
import { useAuthenticatedUser } from "@/contexts/auth-context";
import { useRelationships } from "@/hooks/use-relationships";
import { useSearchAnimation } from "@/hooks/use-search-animation";

const FriendsScreen = () => {
	const { userId } = useAuthenticatedUser();
	const [searchTerm, setSearchTerm] = useState("");
	const { followers, following } = useRelationships(userId);
	const { isOpen, toggle, listStyle, searchStyle, titleContainerStyle } =
		useSearchAnimation();

	const searchBarRef = useRef<TextInput>(null);

	const handleToggle = () => {
		const opening = !isOpen.current;
		if (opening) {
			searchBarRef.current?.clear();
			searchBarRef.current?.focus();
		} else {
			searchBarRef.current?.blur();
		}
		toggle();
	};

	return (
		<ContentSafeArea>
			<FriendSearchHeader
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
				onToggle={handleToggle}
				listStyle={listStyle}
				searchStyle={searchStyle}
				titleContainerStyle={titleContainerStyle}
				searchBarRef={searchBarRef}
			/>
			<View className="flex-1 mt-4">
				<Animated.View style={[listStyle, { flex: 1 }]}>
					<RelationshipTabs followers={followers} following={following} />
				</Animated.View>
				<Animated.View
					style={[searchStyle, { position: "absolute", inset: 0 }]}
				>
					<FriendSearchResults searchTerm={searchTerm} />
				</Animated.View>
			</View>
		</ContentSafeArea>
	);
};

export default FriendsScreen;
