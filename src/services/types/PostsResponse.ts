export interface PostListResponse {
	id: string;
	createdAt: string;
	updatedAt: string;
	autor: string;
	titulo: string;
}

export interface PostDetailResponse {
	id: string;
	autor: string;
	titulo: string;
	conteudo: string;
	createdAt: string;
	updatedAt: string;
}