import { useRouter } from "expo-router";
import { SignOutIcon } from "phosphor-react-native";
import { Pressable } from "react-native";
import { useAuth } from "@/contexts/auth-context";

const SignOutButton = () => {
	const { signOut } = useAuth();
	const router = useRouter();

	const handleSignOut = async () => {
		router.replace("/");
		await signOut();
	};

	return (
		<Pressable className="w-full h-full" hitSlop={20} onPress={handleSignOut}>
			<SignOutIcon size={20} weight="bold" />
		</Pressable>
	);
};

export { SignOutButton };
