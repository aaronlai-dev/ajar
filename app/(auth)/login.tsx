import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/src/lib/supabase";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const resetMessage = () => setMessage(null);

  const handleSignUp = async () => {
    resetMessage();
    if (!email || !password) {
      setMessage("Please provide email and password.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        "Signed up — check your email for a confirmation link if your project requires it.",
      );
    }
  };

  const handleSignIn = async () => {
    resetMessage();
    if (!email || !password) {
      setMessage("Please provide email and password.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      setMessage(error.message);
    } else if (data?.session) {
      // Navigate to authenticated area
      router.replace("/(tabs)");
    } else {
      setMessage("Unexpected response from auth provider.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      className="flex-1 bg-white dark:bg-black items-center justify-center p-6"
    >
      <View className="w-full max-w-md">
        <Text className="text-2xl font-bold text-center mb-4 text-black dark:text-white">
          {mode === "signin" ? "Sign in" : "Create account"}
        </Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="border border-gray-300 dark:border-gray-700 rounded p-3 mb-3 text-black dark:text-white bg-transparent"
          placeholderTextColor="#9CA3AF"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-300 dark:border-gray-700 rounded p-3 mb-3 text-black dark:text-white bg-transparent"
          placeholderTextColor="#9CA3AF"
        />

        {message ? (
          <Text
            className="text-sm text-center mb-2"
            style={{
              color: message.startsWith("Signed up") ? "#10B981" : "#EF4444",
            }}
          >
            {message}
          </Text>
        ) : null}

        <Pressable
          onPress={mode === "signin" ? handleSignIn : handleSignUp}
          className="bg-blue-600 rounded p-3 mb-2 items-center"
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white">
              {mode === "signin" ? "Sign in" : "Create account"}
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="items-center p-3"
        >
          <Text className="text-sm text-blue-600">
            {mode === "signin"
              ? "Don't have an account? Create one"
              : "Already have an account? Sign in"}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
