import api from "@/src/api/axios";
import { AxiosResponse } from "axios";
import { UserModel } from "../models/Usuario/user.model";
import { CreateUserBody, UserDetailResponse, UserListResponse } from "./types/Users.type";

class UserService {
    async getUsers() {
        const response: AxiosResponse<UserListResponse[]> = await api.get(`usuarios`)

        if(response.data) {
            const formattedData = response.data.map(user => new UserModel(user))

            return formattedData
        }

        return []
    }

    async getUserData(userId: string) {
        const response: AxiosResponse<UserListResponse> = await api.get(`usuarios/${userId}`)

        if(response.data) {
            const formattedData = new UserModel(response.data)

            return formattedData
        }

        return null
    }

    async createUser(userData: CreateUserBody) {
            const response: AxiosResponse<UserDetailResponse> = await api.post('usuarios',userData)

            if(response.data) {
                return new UserModel(response.data)
            }

            return null
    }
}

export default new UserService();
