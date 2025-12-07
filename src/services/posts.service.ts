import api from "@/src/api/axios";
import { AxiosResponse } from "axios";
import { PostDetailModel } from "../models/Post/postDetail.model";
import { PostListModel } from "../models/Post/postList.model";
import { PostDetailResponse, PostListResponse, SavePostBody } from "./types/PostsResponse";

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

	async savePost(postData: SavePostBody) {
		let response: AxiosResponse<PostDetailResponse>

		const postBody = {
			titulo: postData.titulo,
			conteudo: postData.conteudo
		}

		if(postData.id) {
			response = await api.put(`posts/${postData.id}`,postBody)
		} else {
			response = await api.post(`posts`,postBody)
		}

		if(response.data) {
			return new PostDetailModel(response.data)
		}
	
		return null

	}

	async deletePost(postId: string) {
		await api.delete(`posts/${postId}`)

		return null
	}
}

export default new PostService();