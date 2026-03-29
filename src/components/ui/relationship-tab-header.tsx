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
			className={`flex-1 py-1.5 items-center justify-center rounded-full ${
				isActive ? "bg-white" : "bg-transparent"
			}`}
			onPress={() => setActiveTab(tab)}
			accessibilityRole="button"
			accessibilityState={{ selected: isActive }}
		>
			<ThemedText
				variant="body"
				className={`font-semibold ${isActive ? "text-orange-500" : "text-white"}`}
			>
				{label}
			</ThemedText>
			{hasPending && (
				<View className="absolute top-1 right-5 bg-red-500 rounded-full w-3 h-3 items-center justify-center" />
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
		<View className="flex-row bg-orange-500 rounded-full my-2 p-1">
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
