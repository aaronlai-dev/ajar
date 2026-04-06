import { XIcon } from "phosphor-react-native";
import GooglePlacesTextInput, {
	type Place,
} from "react-native-google-places-textinput";
import { textStyles } from "../ui/themed-text";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;

interface GooglePlacesInputProps {
	onPlaceSelect: (place: Place) => void;
}

const GooglePlacesInput = ({ onPlaceSelect }: GooglePlacesInputProps) => {
	return (
		<GooglePlacesTextInput
			apiKey=""
			proxyUrl={`${SUPABASE_URL}/functions/v1/place-prediction`}
			onPlaceSelect={onPlaceSelect}
			languageCode="en"
			includedRegionCodes={["au"]}
			autoCapitalize="words"
			autoCorrect={false}
			keyboardType="default"
			returnKeyType="search"
			textContentType="location"
			suggestionTextProps={{
				mainTextNumberOfLines: 1,
				secondaryTextNumberOfLines: 1,
				ellipsizeMode: "tail",
			}}
			placeHolderText="somewhere cool! (optional)"
			clearElement={<XIcon size={20} weight="regular" />}
			style={styles}
		/>
	);
};

const styles = {
	container: {
		marginTop: 2,
	},
	inputContainer: {
		borderColor: "#000000",
		borderRadius: 8,
		borderWidth: 2,
		height: 46,
	},
	input: textStyles.bodySmall,
	suggestionsContainer: {
		maxHeight: 250, // Set the maximum height
		backgroundColor: "#FFFFFF",
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
		borderWidth: 1,
		borderColor: "#EEEEEE",
		borderTopWidth: 0,
	},
	// Make individual items stand out with dividers
	suggestionItem: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#F0F0F0",
	},
	suggestionText: {
		main: textStyles.bodySmall,
		secondary: textStyles.caption,
	},
	placeholder: {
		color: "#BBBBBB",
	},
};

export { GooglePlacesInput };
