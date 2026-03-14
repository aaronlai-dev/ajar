import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { Pressable, View } from "react-native";
import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { ThemedText } from "@/components/ui/themed-text";

export default function HomeScreen() {
	const router = useRouter();
	return (
		<ContentSafeArea>
			<View className="flex-row justify-start mb-4">
				<Pressable
					onPress={() => {
						router.back();
					}}
				>
					<ArrowLeftIcon size={20} weight="bold" />
				</Pressable>
			</View>
			<ThemedText variant="h1">Modal</ThemedText>
		</ContentSafeArea>
	);
}
