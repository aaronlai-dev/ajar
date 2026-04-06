import { RocketLaunchIcon } from "phosphor-react-native";
import { ActivityIndicator, Pressable } from "react-native";
import { ThemedBorder } from "../ui/themed-border";
import { ThemedText } from "../ui/themed-text";

interface SubmitFormButtonProps {
	label: string;
	isPending?: boolean;
	handleSubmit: () => void;
}

const SubmitFormButton = ({
	label,
	isPending,
	handleSubmit,
}: SubmitFormButtonProps) => {
	return (
		<ThemedBorder
			className={`w-full h-16 justify-center items-center mt-2 ${
				isPending ? "bg-indigo-300" : "bg-white"
			}`}
		>
			<Pressable
				className="flex-row w-full h-full justify-center items-center py-4 gap-2"
				onPress={handleSubmit}
				disabled={isPending}
			>
				{isPending ? (
					<ActivityIndicator color="#000000" />
				) : (
					<>
						<ThemedText variant="body" className="font-semibold">
							{label}
						</ThemedText>
						<RocketLaunchIcon size={20} weight="bold" />
					</>
				)}
			</Pressable>
		</ThemedBorder>
	);
};

export default SubmitFormButton;
