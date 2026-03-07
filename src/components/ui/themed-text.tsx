import { Text as RNText, type TextProps } from "react-native";

interface CustomTextProps extends TextProps {
	variant:
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "h5"
		| "body"
		| "bodyLarge"
		| "bodySmall"
		| "caption"
		| "label";
}

const variantClasses = {
	h1: "text-4xl leading-4xl font-bold text-text-primary",
	h2: "text-3xl leading-3xl font-bold text-text-primary",
	h3: "text-2xl leading-2xl font-semibold text-text-primary",
	h4: "text-xl leading-xl font-semibold text-text-primary",
	h5: "text-lg leading-lg font-semibold text-text-primary",
	bodyLarge: "text-lg leading-lg font-regular text-text-primary",
	body: "text-base leading-base font-regular text-text-primary",
	bodySmall: "text-sm leading-sm font-regular text-text-secondary",
	caption: "text-xs leading-xs font-regular text-text-tertiary",
	label: "text-sm leading-sm font-medium text-text-primary",
};

export function ThemedText({
	variant = "body",
	className,
	...props
}: CustomTextProps) {
	return (
		<RNText
			className={`${variantClasses[variant]} ${className || ""}`}
			{...props}
		/>
	);
}
