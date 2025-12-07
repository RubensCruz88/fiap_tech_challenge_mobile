import { PostDetailModel } from "@/src/models/Post/postDetail.model";
import postsService from "@/src/services/posts.service";
import { dateToString } from "@/src/utils/dateFnsUtils";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PostDetail() {
	const params = useLocalSearchParams<{postId: string}>();
	const [post, setPost] = useState<PostDetailModel | null>(null)

  useEffect(() => {
		fetchData()
	},[])

	async function fetchData() {
		try {
			const newPost = await postsService.getPostDetail(params.postId);
			if(newPost){
        setPost(newPost)
			}
		} catch(error) {
			console.log("erro",error)
		}
	}

return (
	<ScrollView style={styles.container} contentContainerStyle={styles.inner}>
		<Text style={styles.titulo}>{post?.titulo}</Text>

		<View style={styles.metaContainer}>
			<Text style={styles.metaAutor}>Por {post?.autor}</Text>
			<Text style={styles.metaData}>
			{post?.createdAt ? dateToString(post.createdAt,"dd 'de' MMMM 'de' yyyy 'as' HH:mm") : ''}
			</Text>
		</View>

		<Text style={styles.conteudo}>{post?.conteudo}</Text>

	</ScrollView>
	)
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
});
