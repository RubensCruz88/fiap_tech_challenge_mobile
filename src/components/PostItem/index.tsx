import { PostListModel } from "@/src/models/Post/postList.model";
import { dateToString } from "@/src/utils/dateFnsUtils";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PostProps {
    post: PostListModel
}

export default function PostItem({post}: PostProps) {
	return(
		<View style={styles.card}>
			<View style={styles.cabecalho}>
				<Text style={styles.cabecalhoTitulo}>{post.titulo}</Text>
			</View>
		
			<View style={styles.autorContainer}>
				<Text style={styles.autorIcone}>✍️</Text>
				<Text style={styles.autorNome}>{post.autor}</Text>
			</View>
		
			<View style={styles.criadoEmContainer}>
				<Text style={styles.criadoEmTitulo}>Criado em</Text>
				<Text style={styles.criadoEmData}>
					{dateToString(post.createdAt,"dd 'de' MMMM 'de' yyyy 'as' HH:mm")}
				</Text>
			</View>
			
			<Link href={{pathname: "/Post", params: {postId: post.id}}} asChild>
				<TouchableOpacity style={styles.botaoContainer}>
					<Text style={styles.botaoTexto}>Ler Post</Text>
				</TouchableOpacity>
			</Link>
		</View>
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
	autorContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	autorIcone: {
		fontSize: 18,
		marginRight: 6,
	},
	autorNome: {
		fontSize: 16,
		color: "#1E8449",
		fontWeight: "600",
	},
	criadoEmContainer: {
		borderLeftWidth: 3,
		borderLeftColor: "#2E7D32", // verde principal
		paddingLeft: 10,
		marginTop: 10,
		marginBottom: 8,
	},
	criadoEmTitulo: {
		fontSize: 12,
		fontWeight: "600",
		color: "#1B5E20", // verde mais escuro
		opacity: 0.9,
		marginBottom: 2,
	},
	criadoEmData: {
		fontSize: 15,
		fontWeight: "500",
		color: "#444",
		textTransform: "capitalize", // "nov" → "Nov"
	},
	botaoContainer: {
		marginTop: 14,
		borderWidth: 2,
		borderColor: "#1E8449",
		paddingVertical: 10,
		borderRadius: 10,
		alignItems: "center",
	},
	botaoTexto: {
		color: "#1E8449",
		fontWeight: "bold",
		fontSize: 16,
	},
})
