import type { Dispatch, SetStateAction } from "react";
import { Pressable, View } from "react-native";
import type { TabType } from "../layout/relationship-tabs";
import { ThemedText } from "./themed-text";

interface RelationshipListHeaderProps {
	activeTab: TabType;
	setActiveTab: Dispatch<SetStateAction<TabType>>;
	followersHasPending: boolean;
	followingHasPending: boolean;
}

const RelationshipListHeaderTab = ({
	tab,
	label,
	activeTab,
	setActiveTab,
	hasPending,
}: {
	tab: TabType;
	label: string;
	activeTab: TabType;
	setActiveTab: Dispatch<SetStateAction<TabType>>;
	hasPending: boolean;
}) => {
	const isActive = activeTab === tab;

	return (
		<Pressable
			className={`flex-1 py-3 items-center ${isActive ? "border-b-2 border-blue-500" : ""}`}
			onPress={() => setActiveTab(tab)}
			accessibilityRole="button"
			accessibilityState={{ selected: isActive }}
		>
			<ThemedText variant="body">{label}</ThemedText>
			{hasPending && (
				<View className="absolute top-2 right-3 bg-red-500 rounded-full w-3 h-3 items-center justify-center" />
			)}
		</Pressable>
	);
};

const RelationshipListHeader = ({
	activeTab,
	setActiveTab,
	followersHasPending,
	followingHasPending,
}: RelationshipListHeaderProps) => {
	return (
		<View className="flex-row border-b border-gray-200">
			<RelationshipListHeaderTab
				tab="followers"
				label="Followers"
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				hasPending={followersHasPending}
			/>
			<RelationshipListHeaderTab
				tab="following"
				label="Following"
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				hasPending={followingHasPending}
			/>
		</View>
	);
};

export { RelationshipListHeader };
