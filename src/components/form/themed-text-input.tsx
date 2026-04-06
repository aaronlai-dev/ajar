import { type KeyboardType, TextInput } from "react-native";
import { ThemedBorder } from "../ui/themed-border";
import { ThemedText, textStyles } from "../ui/themed-text";

interface ThemedTextInputProps {
	onChange: (text: string) => void;
	onBlur: () => void;
	value: string;
	maxLength?: number;
	placeholder: string;
	multiline?: boolean;
	keyboardType?: KeyboardType;
	autoCapitalize?: "none" | "sentences" | "words" | "characters";
	secureTextEntry?: boolean;
}

const MAX_NUM_LINES = 5;

const ThemedTextInput = ({
	onChange,
	onBlur,
	value,
	maxLength,
	placeholder,
	multiline = false,
	keyboardType = "default",
	autoCapitalize = "none",
	secureTextEntry = false,
}: ThemedTextInputProps) => {
	return (
		<ThemedBorder className="flex flex-row items-center justify-between mt-0.5 text-gray-900 bg-gray-50">
			<TextInput
				className="flex-1 pl-3 py-3 leading-4.5"
				placeholder={placeholder}
				onChangeText={onChange}
				onBlur={onBlur}
				value={value}
				maxLength={maxLength}
				multiline={multiline}
				numberOfLines={multiline ? MAX_NUM_LINES : 1}
				style={[textStyles.bodySmall]}
				keyboardType={keyboardType}
				autoCapitalize={autoCapitalize}
				secureTextEntry={secureTextEntry}
			/>
			{maxLength && (
				<ThemedText variant="caption" className="text-center w-1/7 mx-2">
					{value.length}/{maxLength}
				</ThemedText>
			)}
		</ThemedBorder>
	);
};

export { ThemedTextInput };
