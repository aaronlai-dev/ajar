import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	Pressable,
	Text,
	TextInput,
	View,
} from "react-native";
import { z } from "zod";
import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { supabase } from "@/lib/supabase";

const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(6),
});

type FormValues = z.infer<typeof loginSchema>;

const LoginScreen = () => {
	const router = useRouter();
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
			const { error } = await supabase.auth.signInWithPassword(values);
			if (error) {
				setMessage(error.message);
				return;
			}
			router.replace("/(tabs)");
		} catch (err: any) {
			setMessage(err?.message ?? "An unexpected error occurred.");
		}
	};

	return (
		<ContentSafeArea>
			<View className="w-full">
				<Text className="text-2xl font-bold text-center mb-4 text-black dark:text-white">
					Sign in
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
					onPress={handleSubmit(onSignIn)}
					className="bg-blue-600 rounded p-3 mb-2 items-center"
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text className="text-white">Sign in</Text>
					)}
				</Pressable>

				<Pressable
					onPress={() => {
						router.replace("/signup");
					}}
					className="items-center p-3"
				>
					<Text className="text-sm text-blue-600">
						Dont have an account? Create one
					</Text>
				</Pressable>
			</View>
		</ContentSafeArea>
	);
};

export default LoginScreen;
