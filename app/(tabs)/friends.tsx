import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { FriendSearch } from "@/components/ui/friend-search";
import { ThemedText } from "@/components/ui/themed-text";

const FriendsScreen = () => {
	return (
		<ContentSafeArea>
			<ThemedText variant="h1">Friends</ThemedText>
			<FriendSearch />
		</ContentSafeArea>
	);
};

export default FriendsScreen;
