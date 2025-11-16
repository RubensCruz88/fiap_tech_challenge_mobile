import getPostDetail from "@/src/api/getPostDetail";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

interface Post {
    id: string;
    createdAt: string;
    updatedAt: string;
    autor: string;
    titulo: string;
    conteudo: string;
}

export default function PostDetail() {
    const params = useLocalSearchParams<{postId: string}>();
    const [post, setPost] = useState<Post | null>(null)

    useEffect(() => {
        fetchData()

        console.log(post)
    },[])

    async function fetchData() {
            try {
                const newPost = await getPostDetail(params.postId);
                if(newPost){
                    setPost(newPost)
                }
            } catch(error) {
                console.log("erro",error)
            }
        }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.autor}>Autor: {post?.autor}</Text>
            <Text style={styles.content}>Conteudo: {post?.conteudo}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingVertical: 24,
    },
    autor: {
        color: "#2563EB", // blue-600
        fontWeight: "500",
    },
    titulo: {
        fontSize: 26,
        fontWeight: "700",
        color: "#1F2937", // gray-800
        marginBottom: 8,
    },
    content: {
        fontSize: 16,
        lineHeight: 26,
        color: "#374151", // gray-700
        marginBottom: 12,
    },
})