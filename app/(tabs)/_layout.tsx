import { Tabs } from "expo-router";
import { TabBar } from "@/components/tab-bar";

export default function TabLayout() {
	return (
		<Tabs
			tabBar={(props) => <TabBar {...props} />}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen name="index" options={{ title: "Home" }} />
			<Tabs.Screen name="doors" options={{ title: "Doors" }} />
			<Tabs.Screen name="friends" options={{ title: "Friends" }} />
		</Tabs>
	);
}
