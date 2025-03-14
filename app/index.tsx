import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../FirebaseConfig'
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { router } from 'expo-router'
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { Button } from '@/components/ui/button'

const db = getFirestore();

const index = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = () => {
    if (isLogin) {
      // Call login function
      signIn();
    } else {
      // Call signup function
      signUp();
    }
  };

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      handleSignIn(user.user)
    } catch (error: any) {
      console.log(error)
      alert('Sign in failed: ' + error.message);
    }
  }

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      handleSignIn(user.user)
    } catch (error: any) {
      console.log(error)
      alert('Sign in failed: ' + error.message);
    }
  }

  const handleSignIn = async (user: User) => {
    try {
      // Save user to Firestore
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          name: name,
          email: user.email,
          photoURL: null,
          friends: [],
          pendingRequests: [],
          isOpen: false,
        });
      }

      router.replace('/(tabs)');
    } catch (error: any) {
      console.error("Sign in failed", error);
      alert('Sign in failed: ' + error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center p-6">
      <View className="w-4/5 max-w-sm bg-white p-6 rounded-2xl shadow-md">
        <Text className="text-2xl font-semibold text-center text-gray-800 mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </Text>

        {!isLogin && (
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
            className="w-full p-3 bg-gray-200 rounded-lg mb-3 text-gray-800"
          />
        )}

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          textContentType="emailAddress"
          className="w-full p-3 bg-gray-200 rounded-lg mb-3 text-gray-800"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          className="w-full p-3 bg-gray-200 rounded-lg mb-4 text-gray-800"
        />

        <Button onPress={handleAuth} className="w-full rounded-lg bg-indigo-500">
          <Text className="text-white text-lg font-medium">
            {isLogin ? "Login" : "Create Account"}
          </Text>
        </Button>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)} className="mt-4">
          <Text className="text-indigo-500 text-center">
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default index
