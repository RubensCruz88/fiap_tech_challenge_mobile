import api from "@/src/api/axios";
import { AxiosResponse } from "axios";
import { UserListModel } from "../models/Usuario/user.model";
import { UserListResponse } from "./types/UsersResponse";

class UserService {
    async getUsers() {
        const response: AxiosResponse<UserListResponse[]> = await api.get(`usuarios`)

        if(response.data) {
            const formattedData = response.data.map(user => new UserListModel(user))

            return formattedData
        }

        return []
    }
}

export default new UserService();
