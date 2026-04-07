import { View } from "react-native";
import { ThemedText } from "./themed-text";

interface EventCardDetailRowProps {
	label: string;
	icon: React.ReactNode;
}

const EventCardDetailRow = ({ label, icon }: EventCardDetailRowProps) => {
	return (
		<View className="flex flex-row gap-2">
			{icon}
			<ThemedText variant="bodySmall">{label}</ThemedText>
		</View>
	);
};

export { EventCardDetailRow };
