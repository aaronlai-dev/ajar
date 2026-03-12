import { ActivityIndicator, View } from "react-native";
import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { RelationshipTabs } from "@/components/layout/relationship-tabs";
import { FriendSearch } from "@/components/ui/friend-search";
import { ThemedText } from "@/components/ui/themed-text";
import { useAuthenticatedUser } from "@/contexts/auth-context";
import { useRelationships } from "@/hooks/use-relationships";

const FriendsScreen = () => {
	const { userId } = useAuthenticatedUser();

	const { followers, following, isLoading } = useRelationships(userId);

	return (
		<ContentSafeArea>
			<ThemedText variant="h1">Friends</ThemedText>
			<FriendSearch />
			{isLoading ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size="large" color="#3b82f6" />
				</View>
			) : (
				<RelationshipTabs followers={followers} following={following} />
			)}
		</ContentSafeArea>
	);
};

export default FriendsScreen;
