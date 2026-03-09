import { Pressable, View } from "react-native";
import { useAcceptFollowRequest } from "@/hooks/use-accept-follow-request";
import { useFollow } from "@/hooks/use-follow";
import { useRejectFollowRequest } from "@/hooks/use-reject-follow-request";
import { useUnfollow } from "@/hooks/use-unfollow";
import type { UserProfile } from "@/schemas/relationship.schema";
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
		<View className="flex-row items-center px-4 py-3 border-b border-gray-100">
			{/* Avatar */}
			<View className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
				<View className="w-full h-full items-center justify-center bg-blue-100">
					<ThemedText variant="body">
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
					<Pressable
						className="bg-blue-500 px-4 py-2 rounded-lg"
						onPress={() => HandleAccept(user.id)}
					>
						<ThemedText variant="body">Accept</ThemedText>
					</Pressable>
					<Pressable
						className="bg-gray-200 px-4 py-2 rounded-lg"
						onPress={() => HandleReject(user.id)}
					>
						<ThemedText variant="body">Reject</ThemedText>
					</Pressable>
				</View>
			) : isPendingOutgoing || isAcceptedOutgoing ? (
				// User sent follow request - show cancel request
				<Pressable
					className="border border-gray-300 px-4 py-2 rounded-lg"
					onPress={() => HandleUnfollow(user.id)}
				>
					<ThemedText variant="body">Cancel</ThemedText>
				</Pressable>
			) : isAcceptedOutgoing ? (
				// User already follows this person - show Unfollow button
				<Pressable
					className="border border-gray-300 px-4 py-2 rounded-lg"
					onPress={() => HandleUnfollow(user.id)}
				>
					<ThemedText variant="body">Unfollow</ThemedText>
				</Pressable>
			) : isSearching ? (
				<Pressable
					className="bg-blue-500 px-4 py-2 rounded-lg"
					onPress={() => HandleAdd(user.id)}
				>
					<ThemedText variant="body">Add</ThemedText>
				</Pressable>
			) : null}
		</View>
	);
};

export { RelationshipRow };
