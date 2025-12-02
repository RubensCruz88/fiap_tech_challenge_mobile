import { PostListModel } from "@/src/models/Post/postList.model";
import { dateToString } from "@/src/utils/dateFnsUtils";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PostProps {
    post: PostListModel
}

export default function UserPostItem({post}: PostProps) {
	return(
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
				<Link href={{pathname: "./(home)/[postId]", params: {postId: post.id}}} asChild>
					<TouchableOpacity style={styles.botaoContainerLer}>
						<FontAwesome name="book" size={28} color="#FFF" />
					</TouchableOpacity>
				</Link>
				<Link href={{pathname: "./(home)/[postId]", params: {postId: post.id}}} asChild>
					<TouchableOpacity style={styles.botaoContainerEditar}>
						<FontAwesome name="edit" size={28} color="#FFF" />
					</TouchableOpacity>
				</Link>
				<Link href={{pathname: "./(home)/[postId]", params: {postId: post.id}}} asChild>
					<TouchableOpacity style={styles.botaoContainerExcluir}>
						<FontAwesome name="trash" size={28} color="#FFF" />
					</TouchableOpacity>
				</Link>
			</View>
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
		marginTop: 14,
		gap: 10
	},
	botaoContainerLer: {
		flex: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#2E7D32", // verde médio sólido
},
	botaoContainerEditar: {
		flex: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#1B5E20", // verde escuro sólido
},
	botaoContainerExcluir: {
		flex: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#C62828", // vermelho forte sólido
},
	botaoContainer: {
		flex: 1,
		borderWidth: 2,
		borderColor: "#1E8449",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: 'center',
		height: 48
	},
	botaoTexto: {
		color: "#1E8449",
		fontWeight: "bold",
		fontSize: 16,
	},
})
