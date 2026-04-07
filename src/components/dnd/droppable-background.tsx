import { ScrollView, StyleSheet, View } from "react-native";
import { Droppable } from "react-native-reanimated-dnd";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../ui/themed-text";

interface DraggableItemData {
	id: string;
	label: string;
	backgroundColor: string;
}

const DroppableBackground = () => {
	const insets = useSafeAreaInsets();

	return (
		<View className="absolute inset-0 -z-10" style={{ bottom: -insets.bottom }}>
			<ScrollView
				className="flex-1"
				contentContainerClassName="grow py-4"
				scrollEventThrottle={16}
			>
				<View className="flex-1 flex-row gap-20 ">
					<Droppable<DraggableItemData>
						droppableId="drop-zone-1"
						style={[styles.dropZone, styles.dropZoneBlue]}
						onDrop={() => {
							console.log("dropped into zone 1");
						}}
					>
						<ThemedText variant="body">Zone 1</ThemedText>
						<ThemedText variant="body">ID: drop-zone-1</ThemedText>
					</Droppable>

					<Droppable<DraggableItemData>
						droppableId="drop-zone-2"
						style={[styles.dropZone, styles.dropZoneGreen]}
						onDrop={() => {
							console.log("dropped into zone 2");
						}}
					>
						<ThemedText variant="body">Zone 2</ThemedText>
						<ThemedText variant="body">ID: drop-zone-2</ThemedText>
					</Droppable>
				</View>
			</ScrollView>
		</View>
	);
};

export { DroppableBackground };

const styles = StyleSheet.create({
	dropZone: {
		flex: 1,
		borderWidth: 1.5,
		borderStyle: "dashed",
		borderRadius: 14,
		justifyContent: "center",
		alignItems: "center",
		padding: 8,
	},
	dropZoneBlue: {
		borderColor: "#58a6ff",
		backgroundColor: "rgba(88, 166, 255, 0.08)",
	},
	dropZoneGreen: {
		borderColor: "#3fb950",
		backgroundColor: "rgba(63, 185, 80, 0.08)",
	},
});
