import api from "./axios";

export interface LoginResponse {
    token: string;
    usuario: {
        email: string;
        id: string;
        nome: string;
        tipo: string;
    };
}

export default async function setLogin(email: string, password: string) {
    try {
        const response = await api.post<LoginResponse>(`login`,{
            email,
            senha: password
        })

        return response.data
    } catch (error) {
        return null
    }

}