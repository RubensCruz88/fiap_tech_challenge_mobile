import api from "./axios"

export default async function getPosts() {
    try {
        const response = await api.get(`posts`)

        const data = response.data
        
        return data
    } catch (error) {
        console.log('erro',error)
        return null
    }

}