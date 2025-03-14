import AddDoorForm from "@/components/addDoorForm";
import SingleDatePicker from "@/components/datePicker";
import { Text, View } from "react-native";

export default function Explore() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}

    >
      <View className="mb-20">

      </View>
      <SingleDatePicker />
    </View>
  );
}
