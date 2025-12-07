import UserPostItem from "@/src/components/UserPostItem";
import { PostListModel } from "@/src/models/Post/postList.model";
import PostService from '@/src/services/posts.service';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useDebounce } from "use-debounce";

export default function MeusPosts() {
	const [posts, setPosts] = useState<PostListModel[]>([])
	const [busca, setBusca] = useState('')
	const [buscaComDebounce] = useDebounce(busca,1000)

	const postsFiltrados = useMemo(() => {
		return posts.filter( post => {
			return post.titulo.toLowerCase().includes(buscaComDebounce)
		})
	},[buscaComDebounce,posts])


	useFocusEffect(
		useCallback(() => {
			fetchData();
		}, [])
	);

	async function fetchData() {
		try {
			const postList = await PostService.getPostsByUser();
			if(postList){
				setPosts(postList)
			}
		} catch(err) {
			console.log("erro",err)
		}
	}

	async function onAddPost() {
		router.push('/(tabs)/MeusPosts/NovoPost')
	}

	async function onDeletePost() {
		fetchData()
	}

	return(
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<View style={styles.searchContainer}>
					<FontAwesome name="search" size={18} color="#4F6737" />
					<TextInput
						placeholder="Buscar post..."
						value={busca}
						onChangeText={setBusca}
						style={styles.searchInput}
						placeholderTextColor="#4F6737"
					/>
				</View>
				<TouchableOpacity style={styles.fab} onPress={onAddPost}>
					<FontAwesome name="plus" size={22} color="#fff" />
				</TouchableOpacity>
				<FlatList 
					data={postsFiltrados}
					keyExtractor={(post) => post.id}
					renderItem={({item}) => <UserPostItem post={item} onDelete={onDeletePost}></UserPostItem>}
					contentContainerStyle={styles.listContainer}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#DCE9C9',
		borderRadius: 12,
		paddingHorizontal: 14,
		height: 46,
		gap: 10,
	},
	searchInput: {
		flex: 1,
		color: '#2F4F2F',
		fontSize: 16,
	},
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
		zIndex: 999,
		elevation: 6, 
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