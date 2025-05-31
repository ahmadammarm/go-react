import { useMutation } from '@tanstack/react-query';

import Api from '../../services/api';

interface RegisterRequest {
    name: string;
    username: string;
    email: string;
    password: string;
}

export const useRegister = () => {

    return useMutation({

        mutationFn: async (data: RegisterRequest) => {

            const response = await Api.post('/api/register', data);

            return response.data;
        }
    });
};