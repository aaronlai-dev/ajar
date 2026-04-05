import DateTimePicker from "@react-native-community/datetimepicker";
import { Text, View } from "react-native";
import { ThemedText } from "../ui/themed-text";

interface DateTimeFieldProps {
	label: string;
	value: Date;
	minimumDate?: Date;
	onChange: (date: Date) => void;
	error?: string;
}

const DateTimeField = ({
	label,
	value,
	minimumDate,
	onChange,
	error,
}: DateTimeFieldProps) => {
	const handleChange = (_event: unknown, selected?: Date) => {
		if (selected) onChange(selected);
	};

	return (
		<View className="flex-row items-center justify-around">
			<ThemedText variant="body">{label}</ThemedText>
			<DateTimePicker
				value={value}
				mode="datetime"
				display="compact"
				minimumDate={minimumDate}
				onValueChange={handleChange}
			/>
			{error && <Text className="text-red-500 text-xs mt-1 ml-1">{error}</Text>}
		</View>
	);
};

export { DateTimeField };
