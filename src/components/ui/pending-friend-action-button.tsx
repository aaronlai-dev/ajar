import { Pressable } from "react-native";
import { ThemedText } from "./themed-text";

interface PendingFriendActionButtonProps {
	bgColor?: string;
	onPress: () => void;
	text: string;
}

const PendingFriendActionButton = ({
	bgColor = "",
	onPress,
	text,
}: PendingFriendActionButtonProps) => {
	return (
		<Pressable
			className={`px-2 py-1.5 justify-center rounded-lg ${`${bgColor}`}`}
			onPress={onPress}
		>
			<ThemedText variant="bodySmall">{text}</ThemedText>
		</Pressable>
	);
};

export default PendingFriendActionButton;
