// FriendsScreen.tsx
import { useState } from "react";
import { View } from "react-native";
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
	const { toggle, listStyle, searchStyle, titleContainerStyle } =
		useSearchAnimation();

	return (
		<ContentSafeArea>
			<FriendSearchHeader
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
				onToggle={toggle}
				listStyle={listStyle}
				searchStyle={searchStyle}
				titleContainerStyle={titleContainerStyle}
			/>
			<View className="flex-1 mt-2">
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
