import { View } from "react-native";
import { ThemedText } from "./themed-text";

interface EventStatusLozengeProps {
	isLive: boolean;
}
const EventStatusLozenge = ({ isLive }: EventStatusLozengeProps) => {
	return (
		<View className="absolute top-2.5 right-2.5">
			{isLive ? (
				<View className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500">
					{/* Pulsing dot — use Animated API in production for the pulse effect */}
					<View className="w-1.5 h-1.5 rounded-full bg-white opacity-90" />
					<ThemedText
						variant="caption"
						className="text-white font-semibold leading-none"
					>
						Live
					</ThemedText>
				</View>
			) : (
				<View className="flex-row items-center px-2.5 py-1 rounded-full bg-white border border-stone-200">
					<ThemedText
						variant="caption"
						className="text-stone-600 font-semibold leading-none"
					>
						Upcoming
					</ThemedText>
				</View>
			)}
		</View>
	);
};

export { EventStatusLozenge };
