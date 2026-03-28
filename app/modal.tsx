import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { Pressable, View } from "react-native";
import { CreateEventForm } from "@/components/form/create-event-form";
import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { ThemedText } from "@/components/ui/themed-text";

export default function Modal() {
	const router = useRouter();

	return (
		<ContentSafeArea>
			<View className="mt-4 h-full">
				{/* Modal Header */}
				<View className="flex-row justify-start items-center gap-2 mb-4">
					<Pressable
						onPress={() => {
							router.back();
						}}
					>
						<ArrowLeftIcon size={20} weight="bold" />
					</Pressable>
					<ThemedText variant="h4">Create new event</ThemedText>
				</View>

				{/* Modal Content */}
				<CreateEventForm />
			</View>
		</ContentSafeArea>
	);
}
