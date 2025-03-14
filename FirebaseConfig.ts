import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdxOGq75f0EZpQFmMD0AapmlLnLUlIWrI",
  authDomain: "welcome-c9060.firebaseapp.com",
  projectId: "welcome-c9060",
  storageBucket: "welcome-c9060.firebasestorage.app",
  messagingSenderId: "217936275598",
  appId: "1:217936275598:web:554a140f674ddef402c1df",
  measurementId: "G-YCYRBB0FPB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});