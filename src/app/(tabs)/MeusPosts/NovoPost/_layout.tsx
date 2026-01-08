import { Stack } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function Layout() {
	return (
		<Stack
			screenOptions={({ navigation }) => ({
				headerTitle: "",
				headerLeft: () => (
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={{ paddingHorizontal: 16 }}
					>
						<Text style={{ color: "#1E8449" }}>Voltar</Text>
					</TouchableOpacity>
				),
				headerStyle: {
					backgroundColor: "#FFF",
				},
				headerTintColor: "#1E8449",
			})}
		/>
	);
}
