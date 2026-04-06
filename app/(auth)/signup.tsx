import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { CampfireIcon } from "phosphor-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { z } from "zod";
import SubmitFormButton from "@/components/form/submit-form-button";
import { ThemedTextInput } from "@/components/form/themed-text-input";
import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { ThemedText } from "@/components/ui/themed-text";
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
		defaultValues: {
			username: "",
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
		mode: "onSubmit",
		resolver: zodResolver(signUpSchema),
	});

	const resetMessage = () => setMessage(null);

	const onSignUp = async (values: FormValues) => {
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
			setMessage("Signed up — check your email to confirm.");
		} catch (err: any) {
			setMessage(err?.message ?? "An unexpected error occurred.");
		}
	};

	return (
		<ContentSafeArea>
			<View className="flex-1 w-full justify-between px-4 pb-8">
				<View className="flex-1 justify-center gap-4">
					<CampfireIcon size={36} weight="regular" />
					<ThemedText variant="h1">sign up</ThemedText>
				</View>

				<View className="gap-3">
					<View className="flex-row gap-3">
						<View className="flex-1">
							<Controller
								control={control}
								name="firstName"
								render={({ field: { onChange, onBlur, value } }) => (
									<ThemedTextInput
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										placeholder="first name"
										autoCapitalize="words"
									/>
								)}
							/>
							{errors.firstName ? (
								<Text className="text-sm text-red-600 mt-1">
									{errors.firstName.message}
								</Text>
							) : null}
						</View>

						<View className="flex-1">
							<Controller
								control={control}
								name="lastName"
								render={({ field: { onChange, onBlur, value } }) => (
									<ThemedTextInput
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										placeholder="last name"
										autoCapitalize="words"
									/>
								)}
							/>
							{errors.lastName ? (
								<Text className="text-sm text-red-600 mt-1">
									{errors.lastName.message}
								</Text>
							) : null}
						</View>
					</View>

					<Controller
						control={control}
						name="username"
						render={({ field: { onChange, onBlur, value } }) => (
							<ThemedTextInput
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								placeholder="username"
								autoCapitalize="none"
							/>
						)}
					/>
					{errors.username ? (
						<Text className="text-sm text-red-600 mb-2">
							{errors.username.message}
						</Text>
					) : null}

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
						label="create account"
						handleSubmit={handleSubmit(onSignUp)}
						isPending={isSubmitting}
					/>

					<Pressable
						onPress={() => router.replace("/login")}
						className="items-center"
					>
						<ThemedText variant="bodySmall">
							already have an account? sign in
						</ThemedText>
					</Pressable>
				</View>
			</View>
		</ContentSafeArea>
	);
};

export default SignupScreen;
