import UserPostItem from "@/src/components/UserPostItem";
import { PostListModel } from "@/src/models/Post/postList.model";
import PostService from '@/src/services/posts.service';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function MeusPosts() {
	const [posts, setPosts] = useState<PostListModel[]>([])

	useEffect(() => {
		fetchData()
	},[])

	async function fetchData() {
		try {
			const postList = await PostService.getPostsByUser();
			if(postList){
				setPosts(postList)
			}
		} catch(error) {
			console.log("erro",error)
		}
	}

	return(
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<TouchableOpacity style={styles.fab}>
					<FontAwesome name="plus" size={22} color="#fff" />
				</TouchableOpacity>
				<FlatList 
					data={posts}
					keyExtractor={(post) => post.id}
					renderItem={({item}) => <UserPostItem post={item}></UserPostItem>}
					contentContainerStyle={styles.listContainer}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}


const styles = StyleSheet.create({
	fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#4CAF50",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        elevation: 6, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
	container: {
		flex: 1,
		padding: 20,
		gap: 20,
		backgroundColor: '#B5D195'
	},
	listContainer: {
		flex: 1,
		gap: 20,
	}
});