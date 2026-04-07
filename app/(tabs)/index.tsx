import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { ScreenHeader } from "@/components/layout/screen-header";
import { SignOutButton } from "@/components/ui/sign-out-button";

export default function HomeScreen() {
	return (
		<ContentSafeArea>
			<ScreenHeader title="home">
				<SignOutButton />
			</ScreenHeader>
		</ContentSafeArea>
	);
}
