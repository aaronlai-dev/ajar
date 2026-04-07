import { Image, Pressable, View } from "react-native";
import { EventHostRow } from "../ui/event-host-row";
import { EventStatusLozenge } from "../ui/event-status-lozenge";
import { ThemedBorder } from "../ui/themed-border";
import { ThemedText } from "../ui/themed-text";

interface EventCardProps {
	eventName: string;
	hostName: string;
	hostAvatarUrl?: string;
	coverImageUrl?: string;
	startTime: Date;
	endTime: Date;
	onPress?: () => void;
}

const EventCard = ({
	eventName,
	hostName,
	hostAvatarUrl,
	coverImageUrl,
	startTime,
	endTime,
	onPress,
}: EventCardProps) => {
	const now = new Date();
	const isLive = now >= startTime && now <= endTime;

	const formattedStartTime = startTime
		? startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
		: undefined;
	const formattedEndTime = endTime
		? endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
		: undefined;

	return (
		<ThemedBorder className="w-full h-full bg-gray-50">
			<Pressable
				onPress={onPress}
				style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
			>
				{/* ── Cover image ───────────────────────────────────── */}
				<View className="h-44 w-full">
					{coverImageUrl ? (
						<Image
							source={{ uri: coverImageUrl }}
							className="w-9/10 h-full"
							resizeMode="cover"
						/>
					) : (
						<View className="w-full h-full  items-center justify-center">
							<ThemedText variant="h2">🚪</ThemedText>
						</View>
					)}

					{/* Status lozenge — absolute top-right */}
					<EventStatusLozenge isLive={isLive} />
				</View>

				{/* ── Details ───────────────────────────────────────── */}
				<View className="flex-col gap-2.5 px-3 py-3">
					{/* Host row */}
					<EventHostRow hostAvatarUrl={hostAvatarUrl} hostName={hostName} />

					{/* Event name */}
					<ThemedText
						variant="bodyLarge"
						numberOfLines={1}
						className="font-bold"
					>
						{eventName}
					</ThemedText>

					<ThemedText variant="caption">{formattedStartTime}</ThemedText>
					<ThemedText variant="caption">{formattedEndTime}</ThemedText>
				</View>
			</Pressable>
		</ThemedBorder>
	);
};

export { EventCard };
