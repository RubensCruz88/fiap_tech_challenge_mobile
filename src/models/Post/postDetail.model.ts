import { PostDetailResponse } from "@/src/services/types/PostsResponse";
import { jsonToDate } from "@/src/utils/dateFnsUtils";

export class PostDetailModel {
    id: string;
    autor: string;
    titulo: string;
    conteudo: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: PostDetailResponse) {
        this.id = data.id;
        this.autor = data.autor;
        this.titulo = data.titulo;
        this.conteudo = data.conteudo;
        this.createdAt = jsonToDate(data.createdAt);
        this.updatedAt = jsonToDate(data.updatedAt);
    }
}