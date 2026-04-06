import { z } from "zod";

const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(6),
});

const signUpSchema = z.object({
	username: z.string().min(3),
	firstName: z.string().min(3),
	lastName: z.string().min(3),
	email: z.email(),
	password: z.string().min(6),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type SignUpFormValues = z.infer<typeof signUpSchema>;

export {
	loginSchema,
	signUpSchema,
	type LoginFormValues,
	type SignUpFormValues,
};
