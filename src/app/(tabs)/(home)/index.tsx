import getPosts from "@/src/api/getPosts";
import PostItem from "@/src/components/PostItem";
import { useAuth } from "@/src/providers/authProvider";
import { useEffect, useState } from "react";
import { Button, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface PostList {
    id: string;
	titulo: string;
	autor: string;
    createdAt: string;
    updatedAt: string;
}

export default function Home() {
    const { logOut } = useAuth();
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

    async function logout() {
        logOut()
    }
    
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Button title="Logout" onPress={logout}></Button>
                <FlatList 
                    data={posts}
                    keyExtractor={(post) => post.id}
                    renderItem={({item}) => <PostItem post={item}></PostItem>}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}