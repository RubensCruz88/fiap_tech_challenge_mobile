import { PostListResponse } from "@/src/services/types/PostsResponse";
import { jsonToDate } from "@/src/utils/dateFnsUtils";

export class PostListModel {
    id: string;
	autor: string;
	titulo: string;
	createdAt: Date;
	updatedAt: Date;

    constructor(data: PostListResponse) {
        this.id = data.id;
        this.autor = data.autor;
        this.titulo = data.titulo;
        this.createdAt = jsonToDate(data.createdAt);
        this.updatedAt = jsonToDate(data.updatedAt);
    }
}