import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Path } from "react-native-svg";

// ── Tuning knobs ──────────────────────────────────────────────
const DURATION = 450; // ms per half-cycle
const ARM_ANGLE = 8; // degrees of swing
const BOB = 2; // px of body bob
// ─────────────────────────────────────────────────────────────

const easing = Easing.inOut(Easing.sin);

const oscillate = (toValue: number) =>
	withRepeat(withTiming(toValue, { duration: DURATION, easing }), -1, true);

interface AvatarProps {
	size?: number;
	walking?: boolean;
}

// Path data
const RIGHT_ARM_D =
	"M150.548 195.519 C161.401 191.842 158.325 169.219 152.412 153.001 L125.599 160.202 C131.564 188.251 137.933 200.422 150.548 195.519Z";
const LEFT_ARM_D =
	"M28.332 201.903C9.25649 198.889 18.789 168.591 26.6623 149.057L56.1409 156.653C47.4586 193.506 44.3177 204.967 28.332 201.903Z";
const BODY_D =
	"M58.2398 226.111H58.1327C19.1389 226.903 38.2622 163.236 40.053 154.814L137.397 158.542C141.871 183.223 147.331 225.382 121.808 225.382C95.5432 225.382 92.4515 215.885 93.5323 206.911H84.9174C89.6379 226.112 69.6214 226.111 58.2398 226.111Z";
const HEAD_D =
	"M26.6622 149.057C41.0139 157.866 63.911 156.57 100.764 159.951C121.22 161.828 136.375 159.917 147.476 155.174C178.626 141.864 177.859 106.257 172.717 69.4667C165.742 19.5653 154.998 17.1203 137.806 9.43874C120.614 1.75716 100.764 1.21811 50.2821 6.39691C10.564 10.4715 2.31969 45.6968 3.0423 61.7851C5.30575 116.95 10.6956 139.256 26.6622 149.057";

const ARM_OFFSET = 5;

const Avatar = ({ size = 60, walking = true }: AvatarProps) => {
	const armRightRot = useSharedValue(0);
	const armLeftRot = useSharedValue(0);
	const bodyBob = useSharedValue(0);

	useEffect(() => {
		if (walking) {
			armRightRot.value = oscillate(ARM_ANGLE);
			armLeftRot.value = oscillate(-ARM_ANGLE);
			bodyBob.value = oscillate(BOB);
		} else {
			[armRightRot, armLeftRot, bodyBob].forEach((v) => {
				v.value = withTiming(0, { duration: 500 });
			});
		}
	}, [armLeftRot, armRightRot, bodyBob, walking]);

	const armRightStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateY: -ARM_OFFSET },
			{ rotate: `${armRightRot.value}deg` },
		],
	}));

	const armLeftStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateY: -ARM_OFFSET },
			{ rotate: `${armLeftRot.value}deg` },
		],
	}));

	const bodyStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: bodyBob.value }],
	}));

	const w = size;
	const h = Math.round(size * (230 / 179));

	// Animated.View wrappers must be absolutely positioned over the SVG
	// so each limb sits at the correct position within the canvas.
	const canvas = StyleSheet.create({
		root: { width: w, height: h },
		layer: { position: "absolute", top: 0, left: 0, width: w, height: h },
	});

	const LimbSvg = ({ children }: { children: React.ReactNode }) => (
		<Svg width={w} height={h} viewBox="0 0 179 230" fill="none">
			{children}
		</Svg>
	);

	return (
		<Animated.View style={[canvas.root, bodyStyle]}>
			{/* ── Layer 2: Right arm ── */}
			<Animated.View style={[canvas.layer, armRightStyle]}>
				<LimbSvg>
					<Path
						d={RIGHT_ARM_D}
						fill="white"
						stroke="black"
						strokeWidth={6}
						strokeLinecap="round"
					/>
				</LimbSvg>
			</Animated.View>

			{/* ── Layer 3: Body + HEAD (static) ── */}
			<Animated.View style={canvas.layer}>
				<LimbSvg>
					<Path
						d={BODY_D}
						fill="white"
						stroke="black"
						strokeWidth={6}
						strokeLinecap="round"
					/>
				</LimbSvg>
			</Animated.View>

			{/* ── Layer 4 (bottom): Left arm ── */}
			<Animated.View style={[canvas.layer, armLeftStyle]}>
				<LimbSvg>
					<Path
						d={LEFT_ARM_D}
						fill="white"
						stroke="black"
						strokeWidth={6}
						strokeLinecap="round"
					/>
				</LimbSvg>
			</Animated.View>

			{/* ── Layer 1 (top): Head / face — no animation ── */}
			<Animated.View style={canvas.layer}>
				<LimbSvg>
					<Path
						d={HEAD_D}
						fill="white"
						stroke="black"
						strokeWidth={6}
						strokeLinecap="round"
					/>
					{/* Left and Right Eye */}
					<Circle cx={80.279} cy={108.721} r={6.02654} fill="black" />
					<Circle cx={147.279} cy={108.721} r={6.02654} fill="black" />
					{/* Mouth */}
					<Path
						d="M101.876 129.406C106.845 132.18 118.633 136.065 126.033 129.406"
						stroke="black"
						strokeWidth={6}
						strokeLinecap="round"
					/>
				</LimbSvg>
			</Animated.View>
		</Animated.View>
	);
};

export { Avatar };
