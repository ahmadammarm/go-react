import API from "@/services/api"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"

export interface UserCreateRequest {
    name: string
    username: string
    email: string
    password: string
}

export const useUserCreate = () => {
    useMutation({
        mutationFn: async (data: UserCreateRequest) => {
            const token = Cookies.get('token')

            const response = await API.post('/api/users', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status !== 201) {
                throw new Error('Failed to create user')
            }

            return response.data
        }
    })
}