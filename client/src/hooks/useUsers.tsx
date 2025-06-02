import API from "@/services/api"
import { useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"

export interface User {
    id: number
    name: string
    username: string
    email: string
}

export const useUsers = () => {
    return useQuery<User[], Error>({

        queryKey: ['users'],

        queryFn: async () => {
            const token = Cookies.get('token')

            const response = await API.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status !== 200) {
                throw new Error('Failed to fetch users')
            }

            return response.data as User[]
        }


    })
}