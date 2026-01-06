import { Stack } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function Layout() {
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: "#FFF",
				},
				headerTintColor: "#1E8449",
			}}
		>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen
				name="[userId]"
				options={({ navigation }) => ({
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={{ paddingHorizontal: 16 }}
						>
							<Text style={{ color: "#1E8449" }}>Voltar</Text>
						</TouchableOpacity>
					),
				})}
			/>
			<Stack.Screen
				name="Novo"
				options={({ navigation }) => ({
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={{ paddingHorizontal: 16 }}
						>
							<Text style={{ color: "#1E8449" }}>Voltar</Text>
						</TouchableOpacity>
					),
				})}
			/>
		</Stack>
	);
}
