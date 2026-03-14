import { useRouter } from "expo-router";
import { PlusIcon } from "phosphor-react-native";
import { Pressable } from "react-native";

const CreateEventButton = () => {
	const router = useRouter();

	return (
		<Pressable
			className="bg-amber-200 rounded-4xl mx-4 mb-4 w-5/6 h-17.5 self-center justify-center items-center shadow-lg"
			onPress={() => {
				router.push("/modal");
			}}
		>
			<PlusIcon size={20} weight="bold" />
		</Pressable>
	);
};

export { CreateEventButton };
