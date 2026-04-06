import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { DoorOpenIcon } from "phosphor-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { z } from "zod";
import SubmitFormButton from "@/components/form/submit-form-button";
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
			<View className="flex-1 w-full justify-center px-4 pb-8 ">
				<View className="flex-1 justify-center gap-4">
					<DoorOpenIcon size={36} weight="regular" />
					<ThemedText variant="h1">ajar</ThemedText>
					<ThemedText variant="bodyLarge">
						in spirit of leaving doors {"\n"}a little open for others
					</ThemedText>
				</View>

				<View className="gap-3">
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

					<SubmitFormButton
						label="sign in"
						handleSubmit={handleSubmit(onSignIn)}
						isPending={isSubmitting}
					/>

					<Pressable
						onPress={() => {
							router.replace("/signup");
						}}
						className="items-center"
					>
						<ThemedText variant="bodySmall">
							first time here? sign up
						</ThemedText>
					</Pressable>
				</View>
			</View>
		</ContentSafeArea>
	);
};

export default LoginScreen;
