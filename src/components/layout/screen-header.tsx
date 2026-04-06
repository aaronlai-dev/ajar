import { View } from "react-native";
import { ThemedBorder } from "@/components/ui/themed-border";
import { ThemedText } from "@/components/ui/themed-text";

interface ScreenHeaderProps {
	title: string;
	children: React.ReactNode;
}

const ScreenHeader = ({ title, children }: ScreenHeaderProps) => (
	<View className="flex flex-row justify-between h-10">
		<View className="flex-1">
			<ThemedText variant="h1">{title}</ThemedText>
		</View>
		<ThemedBorder className="w-10 p-2">{children}</ThemedBorder>
	</View>
);

export { ScreenHeader };
