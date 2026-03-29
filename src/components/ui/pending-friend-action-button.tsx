import { Pressable } from "react-native";

interface PendingFriendActionButtonProps {
	bgColor?: string;
	onPress: () => void;
	icon: React.ReactNode;
}

const PendingFriendActionButton = ({
	bgColor = "",
	onPress,
	icon,
}: PendingFriendActionButtonProps) => {
	return (
		<Pressable
			className={`px-2 py-1.5 justify-center rounded-lg ${`${bgColor}`}`}
			onPress={onPress}
		>
			{icon}
		</Pressable>
	);
};

export default PendingFriendActionButton;
