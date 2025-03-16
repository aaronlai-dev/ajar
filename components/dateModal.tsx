import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Modal, ModalBackdrop, ModalContent } from './ui/modal';
import { OverlayProvider } from '@gluestack-ui/overlay';
import { Calendar, DateType } from './calendar';

interface DateModalProps {
  isDateModalVisible: boolean;
  setDateModalVisible: (value: boolean) => void;
  date: DateType;
  setDate: (value: DateType) => void;
}

export default function DateModal({ isDateModalVisible, setDateModalVisible, date, setDate }: DateModalProps) {
  return (
    <OverlayProvider>
      <Modal isOpen={isDateModalVisible}>
        <ModalBackdrop 
          className='rounded-lg'
          onPress={() => setDateModalVisible(false)} 
        />
        <ModalContent className='w-auto h-auto border-0 p-0 rounded-xl'>
          <View className="bg-white rounded-xl">
            <Calendar
              mode="single"
              date={date}
              onChange={({ date }) => {
                setDate(date);
              }}
              timePicker={true}
            />
          </View>
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