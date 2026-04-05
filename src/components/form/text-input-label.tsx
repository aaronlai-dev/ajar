import { View } from "react-native";
import { ThemedText } from "../ui/themed-text";

interface TextInputLabelProps {
	label: string;
	errorMsg?: string;
}

const TextInputLabel = ({ label, errorMsg }: TextInputLabelProps) => {
	return (
		<View className="flex flex-row justify-between">
			<ThemedText variant="body">{label}</ThemedText>
			<ThemedText variant="bodySmall" className="text-red-500">
				{errorMsg?.toLocaleLowerCase()}
			</ThemedText>
		</View>
	);
};

export { TextInputLabel };
