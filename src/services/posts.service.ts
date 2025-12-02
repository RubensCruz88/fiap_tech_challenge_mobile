import api from "@/src/api/axios";
import { AxiosResponse } from "axios";
import { PostDetailModel } from "../models/Post/postDetail.model";
import { PostListModel } from "../models/Post/postList.model";
import { PostDetailResponse, PostListResponse } from "./types/PostsResponse";


class PostService {
	async getPosts() {
		const response: AxiosResponse<PostListResponse[]> = await api.get(`posts`);

		if(response.data) {
			const formattedData = response.data.map(post => new PostListModel(post));

			return formattedData
		}

		return []
	}

	async getPostsByUser() {
		const response: AxiosResponse<PostListResponse[]> = await api.get(`posts/meusPosts`);

		if(response.data) {
			const formattedData = response.data.map(post => new PostListModel(post));

			return formattedData
		}

		return []
	}

	async getPostDetail(postId: string) {
		const response: AxiosResponse<PostDetailResponse> = await api.get(`posts/${postId}`);

		if(response.data) {
			return new PostDetailModel(response.data)
		}

		return null
	}
}

export default new PostService();