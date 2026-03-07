import { SafeAreaView } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

const StyledSafeAreaView = withUniwind(SafeAreaView);

interface ContentSafeAreaProps {
	children: React.ReactNode;
}

const ContentSafeArea = ({ children }: ContentSafeAreaProps) => {
	return <StyledSafeAreaView className="px-lg">{children}</StyledSafeAreaView>;
};

export { ContentSafeArea };
