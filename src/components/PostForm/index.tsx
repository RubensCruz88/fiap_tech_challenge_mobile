import postsService from "@/src/services/posts.service";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

type PostFormProps = {
  postId?: string;
};

export default function PostForm({ postId }: PostFormProps) {
	const [titulo, setTitulo] = useState('')
	const [conteudo, setConteudo] = useState('')
	const novoPost = !postId;

	useEffect(() => {
		if (!novoPost) {
			loadPost();
		}
	}, []);

	async function loadPost() {
		try {
			const response = await postsService.getPostDetail(postId!);

			if(response) {
				setTitulo(response.titulo)
				setConteudo(response.conteudo)
			}

		} catch (err) {

		}
	}

	async function onSavePost() {
		try {
			const response = await postsService.savePost({id: postId,titulo, conteudo})
	
			if(response) {
				Toast.show({
					type: "success",
					text1: `Post ${novoPost ? 'criado' : 'atualizado'} com sucesso`
				})
	
				router.back()
			}
		} catch (err: any) {
			Toast.show({
				type: "error",
				text1: `Erro ao ${novoPost ? 'criar' : 'atualizar'} post`,
				text2: err.message,
			})
		}
	}

	return (
		<View style={styles.container}>
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

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
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