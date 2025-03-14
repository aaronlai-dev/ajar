import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Animated, { Easing, SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Icon } from './ui/icon'
import { ArrowLeft } from 'lucide-react-native'
import AddDoorForm from './addDoorForm'

interface PersonalDoorProps {
  doorProgress: SharedValue<number>,
  doorInsideOpacity: SharedValue<number>,
  contentOpacity: SharedValue<number>
}

export default function PersonalDoor({doorProgress, doorInsideOpacity, contentOpacity}: PersonalDoorProps) {
  // Inside door content
  const doorInsideStyle = useAnimatedStyle(() => {
    return {
      opacity: doorInsideOpacity.value,
      flex: 1,
      backgroundColor: '#F5F5F5',
    };
  });

  const closeDoor = () => {
    // First fade out the inside door content
    doorInsideOpacity.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });

    // Fade main content back in
    contentOpacity.value = withTiming(1, {
      duration: 400,
      easing: Easing.inOut(Easing.ease),
    });

    // Close the doors
    doorProgress.value = withTiming(0, {
      duration: 800,
      easing: Easing.inOut(Easing.ease),
    });
  };

  return (
    <Animated.View 
      style={[doorInsideStyle, { position: 'absolute', top: 20, left: 0, right: 0, bottom: 0 }]}
    >
      <View className="flex-row items-center mt-10 ml-4 px-4 py-2">
        <TouchableOpacity 
          onPress={closeDoor} 
          className="p-3 bg-gray-200 rounded-full"
        >
          <Icon as={ArrowLeft} className="text-gray-700 w-5 h-5" />
        </TouchableOpacity>

        <Text className="text-xl font-semibold ml-4 text-gray-900">
          Create an Event
        </Text>
      </View>
      
      <View className="px-8 py-4">
        <AddDoorForm />
      </View>
    </Animated.View>
  )
}
