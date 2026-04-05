import { View } from "react-native";
import { ThemedBorder } from "@/components/ui/themed-border";
import { ThemedText } from "@/components/ui/themed-text";
import { CreateEventButton } from "../ui/create-event-button";

const EventScreenHeader = () => (
	<View className="flex flex-row justify-between h-10">
		<View className="flex-1">
			<ThemedText variant="h1">doors</ThemedText>
		</View>
		<ThemedBorder className="w-10 p-2">
			<CreateEventButton />
		</ThemedBorder>
	</View>
);

export { EventScreenHeader };
