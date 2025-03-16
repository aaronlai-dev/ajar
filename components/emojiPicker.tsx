import { Pressable, Text, View } from 'react-native'
import React, { useState } from 'react'
import { CustomInput } from './customInput';
import { FavouriteIcon } from './ui/icon';

interface EmojiPickerProps {
  setEmojiModalVisible: (value: boolean) => void;
  selectedEmoji: string | null;  
}

export default function EmojiPicker({setEmojiModalVisible, selectedEmoji}: EmojiPickerProps) {

  return (
    <>
      <Text className="text-typography-500">Emoji</Text>
      <Pressable onPress={() => setEmojiModalVisible(true)} className='-z-10'>
        <CustomInput
          value={selectedEmoji || null }
          placeholder="Select Emoji"
          iconName={FavouriteIcon}
        />
      </Pressable>
    </>
  )
}
