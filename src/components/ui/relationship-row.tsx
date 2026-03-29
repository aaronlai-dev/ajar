import { View } from "react-native";
import { useAcceptFollowRequest } from "@/hooks/use-accept-follow-request";
import { useFollow } from "@/hooks/use-follow";
import { useRejectFollowRequest } from "@/hooks/use-reject-follow-request";
import { useUnfollow } from "@/hooks/use-unfollow";
import type { UserProfile } from "@/schemas/relationship.schema";
import PendingFriendActionButton from "./pending-friend-action-button";
import { ThemedText } from "./themed-text";

interface RelationshipRowProps {
	user: UserProfile;
	isPending: boolean;
	isIncoming: boolean;
	isSearching: boolean;
}

const RelationshipRow = ({
	user,
	isPending,
	isIncoming,
	isSearching,
}: RelationshipRowProps) => {
	const isPendingIncoming = isPending && isIncoming;
	const isPendingOutgoing = isPending && !isIncoming;
	const isAcceptedIncoming = !isPending && isIncoming;
	const isAcceptedOutgoing = !isPending && !isIncoming;

	const rejectMutation = useRejectFollowRequest();
	const unfollowMutation = useUnfollow();
	const acceptMutation = useAcceptFollowRequest();
	const followMutation = useFollow();

	const HandleAccept = (pendingId: string) => {
		acceptMutation.mutate(pendingId);
	};

	const HandleReject = (followRequestId: string) => {
		rejectMutation.mutate(followRequestId);
	};

	const HandleUnfollow = (unfollowId: string) => {
		unfollowMutation.mutate(unfollowId);
	};

	const HandleAdd = (userId: string) => {
		followMutation.mutate(userId);
	};

	return (
		<View className="flex-row items-center my-1 px-2 py-2 rounded-xl bg-gray-200">
			{/* Avatar */}
			<View className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
				<View className="w-full h-full items-center justify-center bg-blue-100">
					<ThemedText variant="bodySmall">
						{user.first_name[0]}
						{user.last_name[0]}
					</ThemedText>
				</View>
			</View>

			{/* User Info */}
			<View className="flex-1 ml-3">
				<ThemedText variant="body">
					{user.first_name} {user.last_name}
				</ThemedText>
				<ThemedText variant="caption">@{user.username}</ThemedText>
			</View>

			{/* Action Buttons */}
			{isPendingIncoming ? (
				// Pending follower requests - show Accept/Reject
				<View className="flex-row gap-2">
					<PendingFriendActionButton
						bgColor="bg-blue-200"
						onPress={() => HandleAccept(user.id)}
						text="Accept"
					/>
					<PendingFriendActionButton
						bgColor="bg-gray-200"
						onPress={() => HandleReject(user.id)}
						text="Reject"
					/>
				</View>
			) : isPendingOutgoing || isAcceptedOutgoing ? (
				// User sent follow request - show cancel request
				<PendingFriendActionButton
					bgColor="border-gray-300"
					onPress={() => HandleUnfollow(user.id)}
					text="Cancel"
				/>
			) : isAcceptedOutgoing ? (
				// User already follows this person - show Unfollow button
				<PendingFriendActionButton
					bgColor="border-gray-300"
					onPress={() => HandleUnfollow(user.id)}
					text="Unfollow"
				/>
			) : isSearching ? (
				<PendingFriendActionButton
					bgColor="bg-blue-500"
					onPress={() => HandleAdd(user.id)}
					text="Add"
				/>
			) : null}
		</View>
	);
};

export { RelationshipRow };
