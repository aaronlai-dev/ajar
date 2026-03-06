import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	Text,
	TextInput,
	View,
} from "react-native";
import { z } from "zod";
import { supabase } from "@/src/lib/supabase";

const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(6),
});

type FormValues = z.infer<typeof loginSchema>;

const LoginScreen = () => {
	const router = useRouter();
	const [mode, setMode] = useState<"signin" | "signup">("signin");
	const [message, setMessage] = useState<string | null>(null);

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		defaultValues: { email: "", password: "" },
		mode: "onSubmit",
		resolver: zodResolver(loginSchema),
	});

	const resetMessage = () => setMessage(null);

	const onSignIn = async (values: FormValues) => {
		resetMessage();
		try {
			const { data, error } = await supabase.auth.signInWithPassword(values);
			if (error) {
				setMessage(error.message);
				return;
			}
			if (data?.session) {
				router.replace("/(tabs)");
			} else {
				setMessage("Signed in, but no session returned.");
			}
		} catch (err: any) {
			setMessage(err?.message ?? "An unexpected error occurred.");
		}
	};

	const onSignUp = async (values: FormValues) => {
		resetMessage();
		try {
			const { error } = await supabase.auth.signUp(values);
			if (error) {
				setMessage(error.message);
				return;
			}
			setMessage(
				"Signed up — check your email for a confirmation link if your project requires it.",
			);
			// Optionally switch to sign-in mode after signup
			setMode("signin");
		} catch (err: any) {
			setMessage(err?.message ?? "An unexpected error occurred.");
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

				<Controller
					control={control}
					name="email"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							placeholder="Email"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							keyboardType="email-address"
							autoCapitalize="none"
							placeholderTextColor="#9CA3AF"
							className="border border-gray-300 dark:border-gray-700 rounded p-3 mb-1 text-black dark:text-white bg-transparent"
						/>
					)}
				/>
				{errors.email ? (
					<Text className="text-sm text-red-600 mb-2">
						{errors.email.message}
					</Text>
				) : null}

				<Controller
					control={control}
					name="password"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							placeholder="Password"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							secureTextEntry
							placeholderTextColor="#9CA3AF"
							className="border border-gray-300 dark:border-gray-700 rounded p-3 mb-1 text-black dark:text-white bg-transparent"
						/>
					)}
				/>
				{errors.password ? (
					<Text className="text-sm text-red-600 mb-2">
						{errors.password.message}
					</Text>
				) : null}

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
					onPress={handleSubmit(mode === "signin" ? onSignIn : onSignUp)}
					className="bg-blue-600 rounded p-3 mb-2 items-center"
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text className="text-white">
							{mode === "signin" ? "Sign in" : "Create account"}
						</Text>
					)}
				</Pressable>

				<Pressable
					onPress={() => {
						setMode((m) => (m === "signin" ? "signup" : "signin"));
						resetMessage();
					}}
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
};

export { LoginScreen };
