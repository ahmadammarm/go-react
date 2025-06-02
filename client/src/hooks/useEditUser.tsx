import API from "@/services/api"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"

export interface UserRequest {
    name: string
    username: string
    email: string
    password?: string
}

export const useEditUser = () => {
    return useMutation({
        mutationFn: async ({ id, data }: { id: number, data: UserRequest }) => {
            const token = Cookies.get('token')
            const response = await API.put(`/api/user/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status !== 200) {
                throw new Error('Failed to edit user')
            }

            return response.data;
        }
    })
}