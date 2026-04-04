import type { Dispatch, SetStateAction } from "react";
import { Pressable, View } from "react-native";
import type { TabType } from "../layout/relationship-tabs";
import { ThemedBorder } from "./themed-border";
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
		<ThemedBorder
			className={`flex-1 h-8 ${isActive ? "bg-white" : "bg-transparent"}`}
		>
			<Pressable
				className="w-full h-full items-center justify-center"
				onPress={() => setActiveTab(tab)}
				accessibilityRole="button"
				accessibilityState={{ selected: isActive }}
			>
				<ThemedText
					variant="body"
					className={`font-semibold ${isActive ? "text-black-500" : "text-black-100"}`}
				>
					{label}
				</ThemedText>
			</Pressable>
		</ThemedBorder>
	);
};

const RelationshipListHeader = ({
	activeTab,
	setActiveTab,
	followersHasPending,
	followingHasPending,
}: RelationshipListHeaderProps) => {
	return (
		<View className="flex-row gap-2">
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
