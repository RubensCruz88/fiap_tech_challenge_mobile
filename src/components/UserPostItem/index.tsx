import { PostListModel } from "@/src/models/Post/postList.model";
import postsService from "@/src/services/posts.service";
import { dateToString } from "@/src/utils/dateFnsUtils";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import DeleteModal from "../DeleteModal";

interface PostProps {
    post: PostListModel;
	onDelete: () => void;
}

export default function UserPostItem({post, onDelete}: PostProps) {
	const [showConfirm, setShowConfirm] = useState(false);

	function onShowPost() {
		router.push(`/(tabs)/(home)/${post.id}`)
	}

	async function onDeletePost() {
		try {
			await postsService.deletePost(post.id)

			setShowConfirm(false)
			onDelete()

			Toast.show({
				type: "success",
				text1: `Post excluído com sucesso`,
				text1Style: {
					fontSize: 15
				}
			})


		} catch (err) {
			console.log(err)
		}
	}

	function onEditPost() {
		router.push({
			pathname: '/(tabs)/MeusPosts/[postId]',
			params: {postId: post.id}
		})
	}

	return(
		<>
			<DeleteModal
				message="Tem certeza que deseja excluir este Post?"
				visible={showConfirm}
				onCancel={() => setShowConfirm(false)}
				onConfirm={onDeletePost}
			/>
			<View style={styles.card}>
				<View style={styles.cabecalho}>
					<Text style={styles.cabecalhoTitulo}>{post.titulo}</Text>
				</View>
			
				<View style={styles.criadoEmContainer}>
					<Text style={styles.criadoEmTitulo}>Criado em</Text>
					<Text style={styles.criadoEmData}>
						{dateToString(post.createdAt,"dd 'de' MMMM 'de' yyyy 'as' HH:mm")}
					</Text>
				</View>
				
				<View style={styles.grupoBotoes}>
					<TouchableOpacity style={styles.botaoContainerLer} onPress={onShowPost}>
						<FontAwesome name="book" size={22} color="#FFF" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.botaoContainerEditar} onPress={onEditPost}>
						<FontAwesome name="edit" size={22} color="#FFF" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.botaoContainerExcluir} onPress={() => setShowConfirm(true)}>
						<FontAwesome name="trash" size={22} color="#FFF" />
					</TouchableOpacity>
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		padding: 18,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "#C8E6C9",
		elevation: 3,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 2 },
	},
	cabecalho: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	cabecalhoTitulo: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#145A32",
		flex: 1,
		paddingRight: 12,
	},
	autorNome: {
		fontSize: 16,
		color: "#1E8449",
		fontWeight: "600",
	},
	criadoEmContainer: {
		borderLeftWidth: 3,
		borderLeftColor: "#2E7D32",
		paddingLeft: 10,
		marginTop: 10,
		marginBottom: 8,
	},
	criadoEmTitulo: {
		fontSize: 12,
		fontWeight: "600",
		color: "#1B5E20",
		opacity: 0.9,
		marginBottom: 2,
	},
	criadoEmData: {
		fontSize: 15,
		fontWeight: "500",
		color: "#444",
		textTransform: "capitalize",
	},
	grupoBotoes: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginTop: 14,
		height: 30
	},
	botaoContainerLer: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
		backgroundColor: "#2E7D32",
		width: 70
},
	botaoContainerEditar: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
		backgroundColor: "#1B5E20",
		width: 70
	},
	botaoContainerExcluir: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
		backgroundColor: "#C62828",
		width: 70
	},
	botaoTexto: {
		color: "#1E8449",
		fontWeight: "bold",
		fontSize: 16,
	},
})
