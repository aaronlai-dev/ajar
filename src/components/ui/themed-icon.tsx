import { View } from "react-native";

interface ThemedIconProps {
	children: React.ReactNode;
}

const ThemedIcon = ({ children }: ThemedIconProps) => {
	return <View className="border-2 border-black p-1">{children}</View>;
};

export { ThemedIcon };
