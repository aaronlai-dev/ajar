import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { z } from "zod";
import { ThemedTextInput } from "@/components/form/themed-text-input";
import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { ThemedText } from "@/components/ui/themed-text";
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
			<View className="flex w-full gap-4">
				<ThemedText variant="h1">ajar</ThemedText>
				<ThemedText variant="bodyLarge">
					an app about leaving doors a little open for others
				</ThemedText>

				<Controller
					control={control}
					name="email"
					render={({ field: { onChange, onBlur, value } }) => (
						<ThemedTextInput
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							placeholder="email"
							keyboardType="email-address"
							autoCapitalize="none"
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
						<ThemedTextInput
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							placeholder="password"
							secureTextEntry
							autoCapitalize="none"
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
