import PostItem from '@/src/components/PostItem';
import { PostListModel } from '@/src/models/Post/postList.model';
import PostsService from '@/src/services/posts.service';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';

export default function Home() {
    const [posts, setPosts] = useState<PostListModel[]>([])
    const [busca, setBusca] = useState('')
	const [buscaComDebounce] = useDebounce(busca,1000)

	const postsFiltrados = useMemo(() => {
		return posts.filter( post => {
			return post.titulo.toLowerCase().includes(buscaComDebounce)
		})
	},[buscaComDebounce,posts])

	useEffect(() => {
        fetchData()
    },[])

    async function fetchData() {
        try {
            const postList = await PostsService.getPosts();
            if(postList){
                setPosts(postList)
            }
        } catch(error) {
            console.log("erro",error)
        }
    }

    return (
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
				<FlatList 
                    data={postsFiltrados}
                    keyExtractor={(post) => post.id}
                    renderItem={({item}) => <PostItem post={item}></PostItem>}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.listContainer}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		gap: 20,
		backgroundColor: '#B5D195'
	},
	listContainer: {
		gap: 20,
		paddingBottom: 20
	},
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
});
