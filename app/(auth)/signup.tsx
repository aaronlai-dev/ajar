import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
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
import { supabase } from "@/lib/supabase";

const signUpSchema = z.object({
	username: z.string().min(3),
	firstName: z.string().min(3),
	lastName: z.string().min(3),
	email: z.email(),
	password: z.string().min(6),
});

type FormValues = z.infer<typeof signUpSchema>;

const SignupScreen = () => {
	const router = useRouter();
	const [message, setMessage] = useState<string | null>(null);

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		mode: "onSubmit",
		resolver: zodResolver(signUpSchema),
	});

	const resetMessage = () => setMessage(null);

	const onSignUp = async (values: FormValues) => {
		console.log(values);
		resetMessage();
		try {
			const { error } = await supabase.auth.signUp({
				email: values.email,
				password: values.password,
				options: {
					data: {
						username: values.username,
						first_name: values.firstName,
						last_name: values.lastName,
					},
				},
			});
			if (error) {
				setMessage(error.message);
				return;
			}
			setMessage(
				"Signed up — check your email for a confirmation link if your project requires it.",
			);
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
					Sign Up
				</Text>

				<Controller
					control={control}
					name="firstName"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							placeholder="First Name"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholderTextColor="#9CA3AF"
							className="border border-gray-300 dark:border-gray-700 rounded p-3 mb-1 text-black dark:text-white bg-transparent"
						/>
					)}
				/>

				<Controller
					control={control}
					name="lastName"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							placeholder="Last Name"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholderTextColor="#9CA3AF"
							className="border border-gray-300 dark:border-gray-700 rounded p-3 mb-1 text-black dark:text-white bg-transparent"
						/>
					)}
				/>

				<Controller
					control={control}
					name="username"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							placeholder="Username"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholderTextColor="#9CA3AF"
							className="border border-gray-300 dark:border-gray-700 rounded p-3 mb-1 text-black dark:text-white bg-transparent"
						/>
					)}
				/>

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
					onPress={handleSubmit(onSignUp)}
					className="bg-blue-600 rounded p-3 mb-2 items-center"
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text className="text-white">Create account</Text>
					)}
				</Pressable>

				<Pressable
					onPress={() => {
						router.replace("/login");
					}}
					className="items-center p-3"
				>
					<Text className="text-sm text-blue-600">
						Already have an account?
					</Text>
				</Pressable>
			</View>
		</KeyboardAvoidingView>
	);
};

export default SignupScreen;
