import { View } from "react-native";

interface ThemedBorderProps {
	children: React.ReactNode;
	className?: string;
}

const ThemedBorder = ({ children, className }: ThemedBorderProps) => {
	return (
		<View className={`border-2 border-black rounded-md p-2 ${className}`}>
			{children}
		</View>
	);
};

export { ThemedBorder };
