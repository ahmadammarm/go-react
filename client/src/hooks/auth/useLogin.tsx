import { useMutation } from '@tanstack/react-query';

import Api from '../../services/api';

interface LoginRequest {
    email: string;
    password: string;
}

export const useLogin = () => {

    return useMutation({

        mutationFn: async (data: LoginRequest) => {

            const response = await Api.post('/api/login', data);

            return response.data;
        }
    });
};