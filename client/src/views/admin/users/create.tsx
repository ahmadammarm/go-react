/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC, useState, type FormEvent } from "react";
import SidebarMenu from '../../../components/SidebarMenu';
import { useNavigate, Link } from 'react-router';
import { useUserCreate } from "@/hooks/useUserCreate";

interface ValidationErrors {
    [key: string]: string;
}

const UserCreate: FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<ValidationErrors>({});
    const { mutate, isPending } = useUserCreate();

    const storeUser = async (e: FormEvent) => {
        e.preventDefault();
        mutate(
            { name, username, email, password },
            {
                onSuccess: () => navigate('/admin/users'),
                onError: (error: any) => setErrors(error.response.data.errors),
            }
        );
    };

    return (
        <div className="container mx-auto mt-5 mb-5">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3">
                    <SidebarMenu />
                </div>
                <div className="col-span-9">
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="bg-gray-100 px-4 py-3 rounded-t-lg font-bold">
                            ADD USER
                        </div>
                        <div className="p-4">
                            <form onSubmit={storeUser}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Full Name"
                                    />
                                    {errors.Name && (
                                        <div className="mt-2 text-sm text-red-600">
                                            {errors.Name}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Username"
                                    />
                                    {errors.Username && (
                                        <div className="mt-2 text-sm text-red-600">
                                            {errors.Username}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Email Address"
                                    />
                                    {errors.Email && (
                                        <div className="mt-2 text-sm text-red-600">
                                            {errors.Email}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Password"
                                    />
                                    {errors.Password && (
                                        <div className="mt-2 text-sm text-red-600">
                                            {errors.Password}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <button
                                        type="submit"
                                        className={`px-4 py-2 rounded-lg text-white ${
                                            isPending
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-blue-500 hover:bg-blue-600'
                                        }`}
                                        disabled={isPending}
                                    >
                                        {isPending ? 'Saving...' : 'Save'}
                                    </button>
                                    <Link
                                        to="/admin/users"
                                        className="ml-2 px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCreate;