import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder } from "@react-navigation/native";
import { DoorOpenIcon, HouseIcon, UsersIcon } from "phosphor-react-native";
import { View } from "react-native";
import { ThemedText } from "./ui/themed-text";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
	const { buildHref } = useLinkBuilder();

	// Icon mapping based on route name
	const getIcon = (routeName: string, isFocused: boolean, color: string) => {
		const size = 24;
		const weight = isFocused ? "fill" : "regular";

		switch (routeName) {
			case "index":
				return <HouseIcon weight={weight} color={color} size={size} />;
			case "doors":
				return <DoorOpenIcon weight={weight} color={color} size={size} />;
			case "friends":
				return <UsersIcon weight={weight} color={color} size={size} />;
			default:
				return null;
		}
	};

	return (
		<View className="flex-row bg-background-secondary rounded-4xl mx-4 mb-6 w-5/6 h-17.5 self-center justify-around shadow-lg">
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label = options.title ?? route.name;

				const isFocused = state.index === index;
				const color = isFocused ? "#212121" : "#757575"; // text-primary : text-secondary

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				return (
					<PlatformPressable
						key={route.key}
						href={buildHref(route.name, route.params)}
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarButtonTestID}
						onPress={onPress}
						className="flex-1 items-center justify-center"
					>
						<View
							pointerEvents="none"
							className={`flex-row items-center gap-2 rounded-xl px-3 py-2 ${
								isFocused ? "bg-[#c8e6c9]" : "bg-transparent"
							}`}
						>
							{getIcon(route.name, isFocused, color)}
							{isFocused && <ThemedText variant="label">{label}</ThemedText>}
						</View>
					</PlatformPressable>
				);
			})}
		</View>
	);
};

export { TabBar };
