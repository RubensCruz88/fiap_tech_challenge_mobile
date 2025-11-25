export interface UserListResponse {
  id: string;
  nome: string;
  email: string;
  tipo: "admin" | "professor" | "aluno";
  createdAt: string;
  updatedAt: string;
}