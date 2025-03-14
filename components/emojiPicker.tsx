import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { VStack } from './ui/vstack';
import { Input } from './ui/input';
import EmojiModal from 'react-native-emoji-modal';
import { CustomInput } from './customInput';
import { FavouriteIcon } from './ui/icon';

export default function EmojiPicker() {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  
  return (
    <>
      <Text className="text-typography-500">Emoji</Text>
      <Pressable onPress={() => setModalVisible(true)} className='-z-10'>
        <CustomInput
          value={selectedEmoji || null }
          placeholder="Select Emoji"
          iconName={FavouriteIcon}
        />
      </Pressable>

      {isModalVisible && (
        <EmojiModal
          onEmojiSelected={(emoji) => {
            setSelectedEmoji(emoji);
            setModalVisible(false);
          }}
          onPressOutside={() => setModalVisible(false)}
        />
      )}
    </>
  )
}
