import getPosts from "@/src/api/getPosts";
import PostItem from "@/src/components/PostItem";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface PostList {
    id: string;
	titulo: string;
	autor: string;
    createdAt: string;
    updatedAt: string;
}

export default function Home() {
    const [posts, setPosts] = useState<PostList[]>([])

    useEffect(() => {
        fetchData()
    },[])

    async function fetchData() {
        try {
            const postList = await getPosts();
            if(postList){
                setPosts(postList)
            }
        } catch(error) {
            console.log("erro",error)
        }
    }
    
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <FlatList 
                    data={posts}
                    keyExtractor={(post) => post.id}
                    renderItem={({item}) => <PostItem post={item}></PostItem>}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}