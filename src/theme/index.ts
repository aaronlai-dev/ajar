import { borderRadius } from "./borderRadius";
import { colors } from "./colors";
import { spacing } from "./spacing";
import {
	fontFamily,
	fontSize,
	fontWeight,
	lineHeight,
	textVariants,
} from "./typography";

export * from "./borderRadius";
export * from "./colors";
export * from "./spacing";
export * from "./typography";

export const theme = {
	colors,
	fontFamily,
	fontSize,
	lineHeight,
	fontWeight,
	textVariants,
	spacing,
	borderRadius,
} as const;

export type Theme = typeof theme;
