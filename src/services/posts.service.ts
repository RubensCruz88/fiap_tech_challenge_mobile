import api from "@/src/api/axios";
import { AxiosResponse } from "axios";
import { PostDetailModel } from "../models/Post/postDetail.model";
import { PostListModel } from "../models/Post/postList.model";
import { PostDetailResponse, PostListResponse, SavePostBody } from "./types/PostsResponse";

class PostService {
	async getPosts() {
		try {

			const response: AxiosResponse<PostListResponse[]> = await api.get(`posts`);
	
			if(response.data) {
				const formattedData = response.data.map(post => new PostListModel(post));
	
				return formattedData
			}
	
			return []
		} catch (err: any) {
			if(err.response) {
				throw new Error(err.response.data.message.join("\n"))
			} 

			throw new Error("Erro de conexão com o servidor");
		}
	}

	async getPostsByUser() {
		try {
			const response: AxiosResponse<PostListResponse[]> = await api.get(`posts/meusPosts`);
	
			if(response.data) {
				const formattedData = response.data.map(post => new PostListModel(post));
	
				return formattedData
			}
	
			return []
		} catch (err: any) {
			if(err.response) {
				throw new Error(err.response.data.message.join("\n"))
			} 

			throw new Error("Erro de conexão com o servidor");
		}
	}

	async getPostDetail(postId: string) {
		try {
			const response: AxiosResponse<PostDetailResponse> = await api.get(`posts/${postId}`);
	
			if(response.data) {
				return new PostDetailModel(response.data)
			}
	
			return null
		} catch (err: any) {
			if(err.response) {
				throw new Error(err.response.data.message.join("\n"))
			} 

			throw new Error("Erro de conexão com o servidor");
		}
	}

	async savePost(postData: SavePostBody) {
		try {
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
		} catch (err: any) {
			if(err.response) {
				throw new Error(err.response.data.message.join("\n"))
			} 

			throw new Error("Erro de conexão com o servidor");
		}

	}

	async deletePost(postId: string) {
		try {
			await api.delete(`posts/${postId}`)
	
			return null
		} catch (err: any) {
			if(err.response) {
				throw new Error(err.response.data.message.join("\n"))
			} 

			throw new Error("Erro de conexão com o servidor");
		}
	}
}

export default new PostService();