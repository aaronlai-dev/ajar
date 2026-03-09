import { useState } from "react";
import { Pressable, SectionList, View } from "react-native";
import type { UserProfile } from "@/schemas/relationship.schema";
import { RelationshipRow } from "../ui/relationship-row";
import { ThemedText } from "../ui/themed-text";

type TabType = "followers" | "following";

interface RelationshipTabsProps {
	followers: { pending: UserProfile[]; accepted: UserProfile[] };
	following: { pending: UserProfile[]; accepted: UserProfile[] };
}

const RelationshipTabs = ({ followers, following }: RelationshipTabsProps) => {
	const [activeTab, setActiveTab] = useState<TabType>("followers");

	const currentData = activeTab === "followers" ? followers : following;

	return (
		<View className="flex-1 bg-white">
			{/* Tab Header */}
			<View className="flex-row border-b border-gray-200">
				<Pressable
					className={`flex-1 py-3 items-center ${
						activeTab === "followers" ? "border-b-2 border-blue-500" : ""
					}`}
					onPress={() => setActiveTab("followers")}
				>
					<ThemedText variant="body">Followers</ThemedText>
					{followers.pending.length > 0 && (
						<View className="absolute top-2 right-4 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
							<ThemedText variant="body">{followers.pending.length}</ThemedText>
						</View>
					)}
				</Pressable>

				<Pressable
					className={`flex-1 py-3 items-center ${
						activeTab === "following" ? "border-b-2 border-blue-500" : ""
					}`}
					onPress={() => setActiveTab("following")}
				>
					<ThemedText variant="body">Following</ThemedText>
					{following.pending.length > 0 && (
						<View className="absolute top-2 right-4 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
							<ThemedText variant="body">{following.pending.length}</ThemedText>
						</View>
					)}
				</Pressable>
			</View>

			{/*Relationship list */}
			<SectionList
				style={{ flex: 1 }}
				sections={[
					{
						title: "Pending Requests",
						data: currentData.pending,
						isPending: true,
					},
					{
						title: activeTab === "followers" ? "Friends" : "Following",
						data: currentData.accepted,
						isPending: false,
					},
				].filter((section) => section.data.length > 0)}
				keyExtractor={(item) => item.id}
				contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
				renderSectionHeader={({ section }) => (
					<View className="bg-gray-50 px-4 py-2 border-b border-gray-200">
						<ThemedText variant="body">{section.title}</ThemedText>
					</View>
				)}
				renderItem={({ item, section }) => (
					<RelationshipRow
						user={item}
						isPending={section.isPending}
						isFollower={activeTab === "followers"}
					/>
				)}
				ListEmptyComponent={
					<View className="flex-1 items-center justify-center py-20">
						<ThemedText variant="body">No {activeTab} yet</ThemedText>
					</View>
				}
			/>
		</View>
	);
};

export { RelationshipTabs };
