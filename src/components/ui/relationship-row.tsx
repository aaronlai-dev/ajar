import { TouchableOpacity, View } from "react-native";
import type { UserProfile } from "@/schemas/relationship.schema";
import { ThemedText } from "./themed-text";

interface RelationshipRowProps {
	user: UserProfile;
	isPending: boolean;
	isFollower: boolean;
}

const RelationshipRow = ({
	user,
	isPending,
	isFollower,
}: RelationshipRowProps) => {
	const handleAccept = () => {
		// TODO: Implement accept logic
		console.log("Accept:", user.id);
	};

	const handleReject = () => {
		// TODO: Implement reject logic
		console.log("Reject:", user.id);
	};

	const handleUnfollow = () => {
		// TODO: Implement unfollow logic
		console.log("Unfollow:", user.id);
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
			{isPending && isFollower ? (
				// Pending follower requests - show Accept/Reject
				<View className="flex-row gap-2">
					<TouchableOpacity
						className="bg-blue-500 px-4 py-2 rounded-lg"
						onPress={handleAccept}
					>
						<ThemedText variant="body">Accept</ThemedText>
					</TouchableOpacity>
					<TouchableOpacity
						className="bg-gray-200 px-4 py-2 rounded-lg"
						onPress={handleReject}
					>
						<ThemedText variant="body">Reject</ThemedText>
					</TouchableOpacity>
				</View>
			) : isPending && !isFollower ? (
				// Pending following requests - show Pending badge
				<View className="bg-gray-100 px-4 py-2 rounded-lg">
					<ThemedText variant="caption">Pending</ThemedText>
				</View>
			) : !isFollower ? (
				// Accepted following - show Unfollow button
				<TouchableOpacity
					className="border border-gray-300 px-4 py-2 rounded-lg"
					onPress={handleUnfollow}
				>
					<ThemedText variant="body">Unfollow</ThemedText>
				</TouchableOpacity>
			) : null}
		</View>
	);
};

export { RelationshipRow };
