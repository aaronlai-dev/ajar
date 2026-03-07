// src/theme/colors.ts
export const colors = {
	// Brand colors
	primary: {
		50: "#e3f2fd",
		100: "#bbdefb",
		200: "#90caf9",
		300: "#64b5f6",
		400: "#42a5f5",
		500: "#2196f3", // Main primary
		600: "#1e88e5",
		700: "#1976d2",
		800: "#1565c0",
		900: "#0d47a1",
	},
	accent: {
		50: "#fce4ec",
		100: "#f8bbd0",
		500: "#e91e63", // Main accent
		900: "#880e4f",
	},

	// Semantic colors
	background: {
		primary: "#FFFFFF",
		secondary: "#F5F5F5",
		tertiary: "#E0E0E0",
	},
	text: {
		primary: "#212121",
		secondary: "#757575",
		tertiary: "#9E9E9E",
		inverse: "#FFFFFF",
	},
	border: {
		light: "#E0E0E0",
		medium: "#BDBDBD",
		dark: "#757575",
	},

	// Status colors
	success: "#4caf50",
	warning: "#ff9800",
	error: "#f44336",
	info: "#2196f3",

	// Utility
	white: "#FFFFFF",
	black: "#000000",
	transparent: "transparent",
} as const;

// Export type for TypeScript autocomplete
export type ColorKey = keyof typeof colors;
