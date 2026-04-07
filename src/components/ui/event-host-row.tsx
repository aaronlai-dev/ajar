import { Image, View } from "react-native";
import { ThemedText } from "./themed-text";

interface EventHostRowProps {
	hostAvatarUrl: string | undefined;
	hostName: string;
}

const EventHostRow = ({ hostAvatarUrl, hostName }: EventHostRowProps) => {
	return (
		<View className="flex-row items-center gap-2">
			<View className="w-6 h-6 rounded-full overflow-hidden bg-stone-200 shrink-0">
				{hostAvatarUrl ? (
					<Image
						source={{ uri: hostAvatarUrl }}
						className="w-full h-full"
						resizeMode="cover"
					/>
				) : (
					<View className="w-full h-full items-center justify-center bg-stone-300">
						<ThemedText
							variant="caption"
							className="text-stone-600 font-semibold"
						>
							{hostName.charAt(0).toUpperCase()}
						</ThemedText>
					</View>
				)}
			</View>
			<ThemedText variant="caption" className="shrink" numberOfLines={1}>
				{hostName}
			</ThemedText>
		</View>
	);
};

export { EventHostRow };
