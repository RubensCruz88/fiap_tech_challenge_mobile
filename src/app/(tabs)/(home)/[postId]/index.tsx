import { PostDetailModel } from "@/src/models/Post/postDetail.model";
import postsService from "@/src/services/posts.service";
import { dateToString } from "@/src/utils/dateFnsUtils";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import { useAuth } from "@/src/providers/authProvider";
import DeleteModal from "@/src/components/DeleteModal";
import PostForm from "@/src/components/PostForm";
import Toast from "react-native-toast-message";

export default function PostDetail() {
	const params = useLocalSearchParams<{ postId: string }>();
	const [post, setPost] = useState<PostDetailModel | null>(null);
	const [showConfirm, setShowConfirm] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const { authState } = useAuth();

	const fetchData = useCallback(async () => {
		try {
			const newPost = await postsService.getPostDetail(params.postId);
			if (newPost) {
				setPost(newPost);
			}
		} catch (error) {
			console.log("erro", error);
		}
	}, [params.postId]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	async function onDelete() {
		try {
			if (!post) return;
			await postsService.deletePost(post.id);

			Toast.show({ type: "success", text1: "Post excluído com sucesso" });
			router.back();
		} catch (err) {
			console.log(err);
		}
	}

	function onEdit() {
		if (!post) return;
		setIsEditing(true);
	}

	return (
		<>
			<DeleteModal
				message="Tem certeza que deseja excluir este Post?"
				visible={showConfirm}
				onCancel={() => setShowConfirm(false)}
				onConfirm={onDelete}
			/>
			<ScrollView style={styles.container} contentContainerStyle={styles.inner}>
				<Text style={styles.titulo}>{post?.titulo}</Text>

				<View style={styles.metaContainer}>
					<Text style={styles.metaAutor}>Por {post?.autor}</Text>
					<Text style={styles.metaData}>
						{post?.createdAt
							? dateToString(
									post.createdAt,
									"dd 'de' MMMM 'de' yyyy 'as' HH:mm"
							  )
							: ""}
					</Text>
				</View>

				<Text style={styles.conteudo}>{post?.conteudo}</Text>

				{authState.tipo === "admin" && !isEditing && (
					<View style={styles.actions}>
						<TouchableOpacity style={styles.editButton} onPress={onEdit}>
							<Text style={styles.actionText}>Editar</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.deleteButton}
							onPress={() => setShowConfirm(true)}
						>
							<Text style={styles.actionText}>Deletar</Text>
						</TouchableOpacity>
					</View>
				)}

				{isEditing && post && (
					<PostForm
						postId={post.id}
						onSaved={() => {
							setIsEditing(false);
							fetchData();
						}}
					/>
				)}
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F2F7F2",
	},
	inner: {
		padding: 22,
	},
	titulo: {
		fontSize: 30,
		fontWeight: "800",
		color: "#1B5E20", // verde escuro
		marginBottom: 10,
	},
	metaContainer: {
		marginBottom: 20,
	},
	metaAutor: {
		fontSize: 15,
		color: "#2E7D32",
		fontWeight: "600",
	},
	metaData: {
		fontSize: 14,
		color: "#33691E",
	},
	conteudo: {
		fontSize: 17,
		lineHeight: 26,
		color: "#203520", // verde muito escuro para leitura
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 12,
		marginTop: 20,
	},
	editButton: {
		flex: 1,
		backgroundColor: "#1E8449",
		paddingVertical: 12,
		borderRadius: 10,
		alignItems: "center",
	},
	deleteButton: {
		flex: 1,
		backgroundColor: "#B91C1C",
		paddingVertical: 12,
		borderRadius: 10,
		alignItems: "center",
	},
	actionText: {
		color: "#fff",
		fontWeight: "700",
	},
});
