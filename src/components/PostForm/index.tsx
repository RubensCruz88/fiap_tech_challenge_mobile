import postsService from "@/src/services/posts.service";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "@/src/providers/authProvider";
import { jsonToDate } from "@/src/utils/dateFnsUtils";
import { format } from "date-fns";

type PostFormProps = {
	postId?: string;
	onSaved?: () => void;
};

export default function PostForm({ postId, onSaved }: PostFormProps) {
	const [titulo, setTitulo] = useState("");
	const [conteudo, setConteudo] = useState("");
	const [dateInput, setDateInput] = useState("");
	const [timeInput, setTimeInput] = useState("");
	const novoPost = !postId;

	const { authState } = useAuth();

	const loadPost = useCallback(async () => {
		try {
			const response = await postsService.getPostDetail(postId!);

			if (response) {
				setTitulo(response.titulo);
				setConteudo(response.conteudo);
				if (response.createdAt) {
					const d = jsonToDate(response.createdAt);
					setDateInput(format(d, "yyyy-MM-dd"));
					setTimeInput(format(d, "HH:mm"));
				}
			}
		} catch {}
	}, [postId]);

	useEffect(() => {
		if (!novoPost) {
			loadPost();
		}
	}, [loadPost, novoPost]);

	async function onSavePost() {
		try {
			let payload: any = { titulo, conteudo };

			// Only include id when updating (not creating)
			if (!novoPost) {
				payload.id = postId;
			}

			// Only allow admins to set custom createdAt on NEW posts
			if (authState.tipo === "admin" && novoPost && dateInput && timeInput) {
				const combined = new Date(`${dateInput}T${timeInput}:00`);
				payload.createdAt = combined.toISOString();
			}

			const response = await postsService.savePost(payload);

			if (response) {
				Toast.show({
					type: "success",
					text1: `Post ${novoPost ? "criado" : "atualizado"} com sucesso`,
				});

				if (onSaved) {
					onSaved();
				} else {
					router.back();
				}
			}
		} catch (err: any) {
			Toast.show({
				type: "error",
				text1: `Erro ao ${novoPost ? "criar" : "atualizar"} post`,
				text2: err.message,
			});
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

			{authState.tipo === "admin" && (
				<>
					<Text style={styles.label}>Data (YYYY-MM-DD)</Text>
					<TextInput
						value={dateInput}
						onChangeText={setDateInput}
						placeholder="2026-01-06"
						style={styles.input}
					/>
					<Text style={styles.label}>Hora (HH:mm)</Text>
					<TextInput
						value={timeInput}
						onChangeText={setTimeInput}
						placeholder="14:30"
						style={styles.input}
					/>
				</>
			)}

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
