import { type StyleProp, View, type ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

interface ThemedBorderProps {
	children: React.ReactNode;
	className?: string;
	style?: StyleProp<ViewStyle>;
}

const ThemedBorder = ({ children, className, style }: ThemedBorderProps) => {
	return (
		<View
			className={`border-2 border-black rounded-md p-2 ${className}`}
			style={style}
		>
			{children}
		</View>
	);
};

const AnimatedThemedBorder = Animated.createAnimatedComponent(ThemedBorder);

export { AnimatedThemedBorder, ThemedBorder };
