import api from "@/src/api/axios";
import { AxiosResponse } from "axios";
import { PostListModel } from "../models/Post/postList.model";
import { PostListResponse } from "./types/PostsResponse";

class PostService {
    async getPosts() {
        const response: AxiosResponse<PostListResponse[]> = await api.get(`posts`);

        if(response.data) {
            const formattedData = response.data.map(post => new PostListModel(post));

            return formattedData
        }

        return []
    }
}

export default new PostService();