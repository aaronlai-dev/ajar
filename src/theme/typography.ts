export const fontFamily = {
	regular: "Manrope-Regular",
	medium: "Manrope-Medium",
	semiBold: "Manrope-SemiBold",
	bold: "Manrope-Bold",
} as const;

export const fontSize = {
	xs: 12,
	sm: 14,
	base: 16,
	lg: 18,
	xl: 20,
	"2xl": 24,
	"3xl": 30,
	"4xl": 36,
	"5xl": 48,
} as const;

export const lineHeight = {
	xs: 16,
	sm: 20,
	base: 24,
	lg: 28,
	xl: 28,
	"2xl": 32,
	"3xl": 36,
	"4xl": 40,
	"5xl": 56,
} as const;

export const fontWeight = {
	regular: "400",
	medium: "500",
	semiBold: "600",
	bold: "700",
} as const;

export const textVariants = {
	// Headers
	h1: {
		fontFamily: fontFamily.bold,
		fontSize: fontSize["4xl"],
		lineHeight: lineHeight["4xl"],
	},
	h2: {
		fontFamily: fontFamily.bold,
		fontSize: fontSize["3xl"],
		lineHeight: lineHeight["3xl"],
	},
	h3: {
		fontFamily: fontFamily.semiBold,
		fontSize: fontSize["2xl"],
		lineHeight: lineHeight["2xl"],
	},

	// Body text
	bodyLarge: {
		fontFamily: fontFamily.regular,
		fontSize: fontSize.lg,
		lineHeight: lineHeight.lg,
	},
	body: {
		fontFamily: fontFamily.regular,
		fontSize: fontSize.base,
		lineHeight: lineHeight.base,
	},
	bodySmall: {
		fontFamily: fontFamily.regular,
		fontSize: fontSize.sm,
		lineHeight: lineHeight.sm,
	},

	// Special
	caption: {
		fontFamily: fontFamily.regular,
		fontSize: fontSize.xs,
		lineHeight: lineHeight.xs,
	},
	button: {
		fontFamily: fontFamily.semiBold,
		fontSize: fontSize.base,
		lineHeight: lineHeight.base,
	},
	label: {
		fontFamily: fontFamily.medium,
		fontSize: fontSize.sm,
		lineHeight: lineHeight.sm,
	},
} as const;

export type TextVariant = keyof typeof textVariants;
