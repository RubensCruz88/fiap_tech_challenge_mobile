import postsService from "@/src/services/posts.service";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function NovoPost() {
	const [titulo, setTitulo] = useState('')
	const [conteudo, setConteudo] = useState('')

	async function onSavePost() {
		const response = await postsService.addPost({titulo, conteudo})

		if(response) {
			Toast.show({
				type: "success",
				text1: `Post criado com sucesso`,
				text1Style: {
					fontSize: 15
				}
			})

			router.back()
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scroll}>
				<Text style={styles.label}>Título</Text>
				<TextInput
					value={titulo}
					onChangeText={setTitulo}
					placeholder="Digite o título..."
					style={styles.input}
				/>

				<Text style={styles.label}>Conteúdo</Text>
				<TextInput
					value={conteudo}
					onChangeText={setConteudo}
					placeholder="Digite o conteúdo..."
					style={[styles.input, styles.textArea]}
					multiline
				/>

				<TouchableOpacity style={styles.button} onPress={onSavePost}>
					<Text style={styles.buttonText}>Salvar Post</Text>
				</TouchableOpacity>

			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#B5D195",
		paddingHorizontal: 20,
	},
	scroll: {
		gap: 20,
	},
	label: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1A2E05",
	},
	input: {
		backgroundColor: "#fff",
		padding: 14,
		borderRadius: 10,
		fontSize: 16,
		borderWidth: 1,
		borderColor: "#A5C48A",
	},
	textArea: {
		height: 150,
		textAlignVertical: "top",
	},
	button: {
		marginTop: 20,
		backgroundColor: "#4CAF50",
		paddingVertical: 16,
		borderRadius: 12,
		alignItems: "center",
		elevation: 3,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "700",
		fontSize: 17,
	},
});