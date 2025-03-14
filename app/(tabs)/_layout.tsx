import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text } from 'react-native';
import { Icon } from "@/components/ui/icon";
import { Users, DoorOpen, House } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Hide default labels for a cleaner look
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 90,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: -5 },
          },
          android: {
            backgroundColor: "white",
            elevation: 5,
            height: 90,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center flex-col w-full min-w-20 mt-5">
              <Icon as={House} color={focused ? "#4F46E5" : "#A1A1AA"} />
              <Text className={`text-xs mt-1 ${focused ? "text-indigo-600 font-semibold" : "text-gray-400"}`}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center flex-col w-full min-w-20 mt-5">
              <Icon as={DoorOpen} color={focused ? "#4F46E5" : "#A1A1AA"} />
              <Text className={`text-xs mt-1 ${focused ? "text-indigo-600 font-semibold" : "text-gray-400"}`}>
                Explore
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center flex-col w-full min-w-20 mt-5">
              <Icon as={Users} color={focused ? "#4F46E5" : "#A1A1AA"} />
              <Text className={`text-xs mt-1 ${focused ? "text-indigo-600 font-semibold" : "text-gray-400"}`}>
                Friends
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
