import { PostListModel } from "@/src/models/Post/postList.model";
import { dateToString } from "@/src/utils/dateFnsUtils";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PostProps {
    post: PostListModel
}

export default function PostItem({post}: PostProps) {
    return(
        <Link href={{pathname: "/Post", params: {postId: post.id}}} asChild>
            <TouchableOpacity style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.titulo}>{post.titulo}</Text>
                    <Text style={styles.autor}>Autor: {post.autor}</Text>
                    <Text style={styles.createdAt}>
                        Criado em: {dateToString(post.createdAt,"dd/MM/yyyy HH:mm")}
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },

  item: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  titulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },

  autor: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginBottom: 6,
  },

  createdAt: {
    fontSize: 12,
    color: "#999",
  }
});
