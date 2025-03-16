import { StyleSheet } from 'react-native'
import React from 'react'
import { Modal, ModalBackdrop, ModalContent } from './ui/modal';
import EmojiModal from 'react-native-emoji-modal';
import { OverlayProvider } from '@gluestack-ui/overlay';

interface EmojiPickerModalProps {
  isEmojiModalVisible: boolean;
  setEmojiModalVisible: (value: boolean) => void;
  setSelectedEmoji: (value: string | null) => void;
}

export default function EmojiPickerModal({isEmojiModalVisible, setEmojiModalVisible, setSelectedEmoji}: EmojiPickerModalProps) {
  return (
    <OverlayProvider>
      <Modal isOpen={isEmojiModalVisible}>
        <ModalBackdrop 
          className='rounded-lg'
          onPress={() => setEmojiModalVisible(false)} 
        />
        <ModalContent className='w-auto h-80 border-1 p-0 rounded-xl'>
          <EmojiModal
            onEmojiSelected={(emoji) => {
              setSelectedEmoji(emoji);
              setEmojiModalVisible(false);
            }}
            onPressOutside={() => setEmojiModalVisible(false)}
            backgroundStyle={styles.container}
          />
        </ModalContent>
        
      </Modal>
    </OverlayProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  }
});