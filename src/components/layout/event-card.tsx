import { ClockIcon } from "phosphor-react-native";
import { Image, Pressable, View } from "react-native";
import { formatDateRangeLabel } from "../../utils/date-utils";
import { EventCardDetailRow } from "../ui/event-card-detail-row";
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

	return (
		<ThemedBorder className="w-full h-full bg-gray-50">
			<Pressable
				className="flex-1"
				onPress={onPress}
				style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
			>
				{/* ── Cover image ───────────────────────────────────── */}
				<View className="flex-1 w-full">
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
				<View className="flex-1 flex-col gap-2.5 px-3 py-3">
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

					<EventCardDetailRow
						label={formatDateRangeLabel(startTime, endTime)}
						icon={<ClockIcon size={14} weight="regular" />}
					/>
				</View>
			</Pressable>
		</ThemedBorder>
	);
};

export { EventCard };
