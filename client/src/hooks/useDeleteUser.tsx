import API from "@/services/api"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"

export const useDeleteUser = () => {
    return useMutation({
        mutationFn: async (userId: number) => {
            const token = Cookies.get('token')
            const response = await API.delete(`/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status !== 200) {
                throw new Error('Failed to delete user')
            }

            return response.data
        }
    })
}