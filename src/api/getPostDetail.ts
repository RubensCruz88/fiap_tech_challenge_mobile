import api from "./axios"

export default async function getPostDetail(postId: string) {
    try {
        const response = await api.get(`posts/${postId}`)

        const data = response.data
        
        return data
        
    } catch (error) {
        console.log(error)
    }
}