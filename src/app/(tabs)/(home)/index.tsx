import PostItem from "@/src/components/PostItem";
import { PostListModel } from '@/src/models/Post/postList.model';
import PostsSercice from '@/src/services/posts.service';
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    const [posts, setPosts] = useState<PostListModel[]>([])

    useEffect(() => {
        fetchData()
    },[])

    async function fetchData() {
        try {
            const postList = await PostsSercice.getPosts();
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