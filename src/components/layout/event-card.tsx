import { Image, Pressable, View } from "react-native";
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
		<Pressable
			onPress={onPress}
			className="w-44 rounded-2xl overflow-hidden bg-white border border-stone-200"
			style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
		>
			{/* ── Cover image ───────────────────────────────────── */}
			<View className="h-44 w-full bg-stone-100">
				{coverImageUrl ? (
					<Image
						source={{ uri: coverImageUrl }}
						className="w-full h-full"
						resizeMode="cover"
					/>
				) : (
					<View className="w-full h-full bg-stone-100 items-center justify-center">
						<ThemedText variant="h2">🚪</ThemedText>
					</View>
				)}

				{/* Status lozenge — absolute top-right */}
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
			</View>

			{/* ── Details ───────────────────────────────────────── */}
			<View className="flex-col gap-2.5 px-3 py-3">
				{/* Host row */}
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

				{/* Event name */}
				<ThemedText variant="label" numberOfLines={2}>
					{eventName}
				</ThemedText>

				<ThemedText variant="caption">{formattedStartTime}</ThemedText>
				<ThemedText variant="caption">{formattedEndTime}</ThemedText>
			</View>
		</Pressable>
	);
};

export { EventCard };
