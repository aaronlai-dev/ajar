import { useRouter } from "expo-router";
import { PlusIcon } from "phosphor-react-native";
import { Pressable } from "react-native";

const CreateEventButton = () => {
	const router = useRouter();

	return (
		<Pressable
			className="w-full h-full"
			hitSlop={20}
			onPress={() => {
				router.push("/modal");
			}}
		>
			<PlusIcon size={20} weight="bold" />
		</Pressable>
	);
};

export { CreateEventButton };
