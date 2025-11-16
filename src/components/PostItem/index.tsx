import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface PostItem {
    id: string;
	titulo: string;
	autor: string;
}

interface PostProps {
    post: PostItem
}


export default function PostItem({post}: PostProps) {
    return(
        <Link href={{pathname: "/Post", params: {postId: post.id}}} asChild>
            <TouchableOpacity style={styles.container}>
                <Text style={styles.autor}>{post.autor}</Text>
                <Text style={styles.titulo}>{post.titulo}</Text>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 0,
        margin: 4,
        padding: 2,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#e5e7eb',
        backgroundColor: '#f9fafb'
    },
    autor: {
        fontSize: 14,
        color: '#6b7280'
    },
    titulo: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4
    }
})