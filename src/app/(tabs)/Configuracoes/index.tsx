import { useAuth } from "@/src/providers/authProvider";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Configuracoes() {
	const { logOut } = useAuth();

	return(
		<SafeAreaProvider style={{marginTop: 50}}>
			<SafeAreaView style={styles.container}>
				<TouchableOpacity style={styles.button} onPress={() => logOut()}>
					<Text style={styles.buttonText}>Sair</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		width: '100%',
		backgroundColor: '#B5D195',
		gap: 50
	},
	button: {
		backgroundColor: "#1E8449",
		paddingVertical: 14,
		borderRadius: 10,
		marginTop: 24,
		width: '90%',
		alignItems: "center",
	},
	buttonText: {
		color: "#FFF",
		fontSize: 16,
		fontWeight: "700",
	}
})