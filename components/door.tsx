import { Text, View } from 'react-native'
import React from 'react'
import Animated, { 
  useAnimatedStyle, 
  interpolate,
  Extrapolation,
  SharedValue
} from 'react-native-reanimated';

interface DoorProps {
  doorProgress: SharedValue<number>,
}

export default function Door({ doorProgress}: DoorProps) {
  // Door animation
  const DoorStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      doorProgress.value,
      [0, 1],
      [0, -110],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { perspective: 1000 },
        { translateX: -86 },
        { rotateY: `${rotate}deg` },
        { translateX: 86 }
      ],
      width: '100%',
      height: '100%',
      backgroundColor: '#606060',
      borderRightWidth: 1,
      borderRightColor: '#303030',
      overflow: 'hidden'
    };
  });

  return (
    <View style={{ width: 180, height: 380, backgroundColor: '#404040', borderWidth: 4, borderColor: '#303030' }}>
      {/* Door Window patterns - left door */}
      <Animated.View style={DoorStyle}>
        <View style={{ padding: 20, flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1, borderWidth: 2, borderColor: '#505050', marginBottom: 20 }} />
            <View style={{ flex: 1, borderWidth: 2, borderColor: '#505050', marginBottom: 20 }} />
            <View style={{ flex: 1, borderWidth: 2, borderColor: '#505050' }} />
          </View>
        </View>
      </Animated.View>
    </View>
  )
}