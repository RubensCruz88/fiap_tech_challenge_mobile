import { UserListResponse } from "@/src//services/types/UsersResponse";
import { jsonToDate } from "@/src/utils/dateFnsUtils";

export class UserListModel {
    id: string;
    nome: string;
    email: string;
    tipo: 'admin' | 'professor' | 'aluno';
    createdAt: Date;
    updatedAt: Date;

    constructor(data: UserListResponse) {
        this.id = data.id;
        this.nome = data.nome;
        this.email = data.email;
        this.tipo = data.tipo;
        this.createdAt = jsonToDate(data.createdAt);
        this.updatedAt = jsonToDate(data.updatedAt);
    }
}