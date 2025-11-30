import { Stack } from "expo-router";

export default function Layout() {
	return (
		<Stack screenOptions={{
			headerStyle: {
				backgroundColor: '#FFF'
			},
			headerTintColor: '#1E8449',
			
		}}>
			<Stack.Screen name="index" options={{headerShown: false}}/>
			<Stack.Screen name="[userId]" options={{ headerTitle: "Voltar"}}/>
			<Stack.Screen name="Novo" options={{
				headerTitle: "Voltar"
			}}/>
		</Stack>
	)
}