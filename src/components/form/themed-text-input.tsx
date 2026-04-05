import { TextInput } from "react-native";
import { ThemedBorder } from "../ui/themed-border";

interface ThemedTextInputProps {
	onChange: (text: string) => void;
	onBlur: () => void;
	value: string;
	maxLength?: number;
	placeholder: string;
	multiline?: boolean;
}

const ThemedTextInput = ({
	onChange,
	onBlur,
	value,
	maxLength,
	placeholder,
	multiline = false,
}: ThemedTextInputProps) => {
	return (
		<ThemedBorder className="text-base text-gray-900 bg-gray-50">
			<TextInput
				className="px-4 py-3 leading-4.5"
				placeholder={placeholder}
				onChangeText={onChange}
				onBlur={onBlur}
				value={value}
				maxLength={maxLength}
				multiline={multiline}
			/>
		</ThemedBorder>
	);
};

export { ThemedTextInput };
