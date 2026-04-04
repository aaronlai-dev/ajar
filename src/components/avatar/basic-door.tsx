import Svg, { Path } from "react-native-svg";

interface BasicDoorProps {
	size?: number;
}

const BasicDoor = ({ size = 120 }: BasicDoorProps) => {
	const aspectRatio = 211 / 184;
	const width = size;
	const height = size * aspectRatio;

	return (
		<Svg width={width} height={height} viewBox="0 0 184 211" fill="none">
			<Path
				d="M37 11.697V187.697H46.4363V22.8044H137.515V187.697H147V11.697H37Z"
				fill="white"
				stroke="black"
				strokeWidth={4}
				strokeLinecap="round"
			/>
			<Path
				d="M2 187.697H182"
				stroke="black"
				strokeWidth={4}
				strokeLinecap="round"
			/>
			<Path
				d="M137 21.8133V186.683L74 207.697V2.69702L137 21.8133Z"
				fill="white"
				stroke="black"
				strokeWidth={4}
				strokeLinecap="round"
			/>
		</Svg>
	);
};

export { BasicDoor };
