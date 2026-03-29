import { useState } from "react";
import { SectionList, View } from "react-native";
import type { UserProfile } from "@/schemas/relationship.schema";
import { RelationshipRow } from "../ui/relationship-row";
import { RelationshipListHeader } from "../ui/relationship-tab-header";
import { ThemedText } from "../ui/themed-text";

export type TabType = "followers" | "following";

interface RelationshipTabsProps {
	followers: { pending: UserProfile[]; accepted: UserProfile[] };
	following: { pending: UserProfile[]; accepted: UserProfile[] };
}

const RelationshipTabs = ({ followers, following }: RelationshipTabsProps) => {
	const [activeTab, setActiveTab] = useState<TabType>("followers");

	const currentData = activeTab === "followers" ? followers : following;

	return (
		<View className="flex-1">
			{/* Tab Header */}
			<RelationshipListHeader
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				followersHasPending={followers.pending.length > 0}
				followingHasPending={following.pending.length > 0}
			/>

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
				contentContainerStyle={{ flexGrow: 1 }}
				renderSectionHeader={({ section }) => (
					<View className="px-2 py-2">
						<ThemedText variant="body">{section.title}</ThemedText>
					</View>
				)}
				renderItem={({ item, section }) => (
					<RelationshipRow
						user={item}
						isPending={section.isPending}
						isIncoming={activeTab === "followers"}
						isSearching={false}
					/>
				)}
				ListEmptyComponent={
					<View className="flex-1 items-center justify-center py-20">
						<ThemedText variant="body">No {activeTab} yet</ThemedText>
					</View>
				}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

export { RelationshipTabs };
