export interface UserListResponse {
  id: string;
  nome: string;
  email: string;
  tipo: "admin" | "professor" | "aluno";
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserBody {
  nome: string;
	email: string;
	tipo: "admin" | "professor" | "aluno";
	senha: string;
}

export interface UserDetailResponse {
  id: string;
  nome: string;
  email: string;
  tipo: "admin" | "professor" | "aluno";
  createdAt: string;
  updatedAt: string;
}