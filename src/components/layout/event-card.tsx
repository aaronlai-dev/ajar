import { Image, Pressable, View } from "react-native";
import { ThemedText } from "../ui/themed-text";

type EventStatus = "live" | "upcoming";

interface EventCardProps {
	eventName: string;
	hostName: string;
	hostAvatarUrl?: string;
	coverImageUrl?: string;
	tags: string[];
	status: EventStatus;
	scheduledTime?: string;
	onPress?: () => void;
}

export function EventCard({
	eventName,
	hostName,
	hostAvatarUrl,
	coverImageUrl,
	tags,
	status,
	scheduledTime,
	onPress,
}: EventCardProps) {
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
					{status === "live" ? (
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

				{/* Scheduled time (upcoming only) */}
				{status === "upcoming" && scheduledTime && (
					<ThemedText variant="caption">{scheduledTime}</ThemedText>
				)}

				{/* Tags */}
				{tags.length > 0 && (
					<View className="flex-row flex-wrap gap-1.5">
						{tags.map((tag) => (
							<View key={tag} className="px-2 py-0.5 rounded-full bg-stone-100">
								<ThemedText
									variant="caption"
									className="text-stone-500 font-medium"
								>
									{tag}
								</ThemedText>
							</View>
						))}
					</View>
				)}
			</View>
		</Pressable>
	);
}
