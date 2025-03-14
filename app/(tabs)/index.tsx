import { auth } from "@/FirebaseConfig";
import { router } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { useAuth } from '../contexts/auth';
import React, { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import Door from "@/components/door";
import PersonalDoor from "@/components/personalDoor";

export default function Index() {
  const { user } = useAuth();
  
  // Animation values
  const doorProgress = useSharedValue(0);
  const contentOpacity = useSharedValue(1);
  const doorInsideOpacity = useSharedValue(0);

  // Door frame container
  const doorContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
      transform: [
        { scale: interpolate(doorProgress.value, [0, 0.5, 1], [1, 1.2, 1.5]) }
      ]
    };
  });

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.replace('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const openDoor = () => {
    // Open the doors
    doorProgress.value = withTiming(1, {
      duration: 800,
      easing: Easing.inOut(Easing.ease),
    });

    // Fade out main content
    contentOpacity.value = withDelay(500, withTiming(0, {
      duration: 400,
      easing: Easing.inOut(Easing.ease),
    }));

    doorInsideOpacity.value = withDelay(200, withTiming(1, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    }));
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Main content */}
      <View className="flex-1">
        {/* Header with greeting and sign out */}
        <View className="flex-row justify-between items-center px-4 pt-2">
          <Text className="text-3xl font-bold ">{`Hello, ${user?.name || 'User'}`}</Text>
          <TouchableOpacity 
            onPress={handleSignOut}
            className="bg-gray-700 px-4 py-2 rounded-full"
          >
            <Text className="font-semibold text-gray-200">Sign Out</Text>
          </TouchableOpacity>
        </View>
        
        {/* Door container */}
        <View className="flex-1 justify-center items-center">
          <Animated.View style={doorContainerStyle}>
            <Door 
              doorProgress={doorProgress} 
            />
          </Animated.View>
          {/* Text below door */}
          <Animated.Text 
              onPress={openDoor}
              className="mt-5 text-lg font-medium bg-gray-600 text-gray-300 rounded-lg text-center"
            >
              Open  Door
          </Animated.Text>
        </View>
      </View>

      <PersonalDoor 
        doorProgress={doorProgress} 
        doorInsideOpacity={doorInsideOpacity}
        contentOpacity={contentOpacity}
      />
    </SafeAreaView>
  );
}