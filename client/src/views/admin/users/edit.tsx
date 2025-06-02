/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC, useState, useEffect, type FormEvent } from "react";
import SidebarMenu from '../../../components/SidebarMenu';
import { useNavigate, useParams, Link } from 'react-router';
import { useUserById } from "@/hooks/useUserById";
import { useEditUser } from "@/hooks/useEditUser";

interface ValidationErrors {
    [key: string]: string;
}

const UserEdit: FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<ValidationErrors>({});
    const { data: user } = useUserById(Number(id));

    useEffect(() => {
        if (user) {
            setName(user.name);
            setUsername(user.username);
            setEmail(user.email);
        }
    }, [user]);

    const { mutate, isPending } = useEditUser();

    const updateUser = async (e: FormEvent) => {
        e.preventDefault();
        mutate({
            id: Number(id),
            data: {
                name,
                username,
                email,
                password
            }
        }, {
            onSuccess: () => {
                navigate('/admin/users');
            },
            onError: (error: any) => {
                setErrors(error.response.data.errors);
            }
        });
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
                            EDIT USER
                        </div>
                        <div className="p-4">
                            <form onSubmit={updateUser}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Full Name"
                                    />
                                    {errors.Name && <div className="mt-2 text-sm text-red-500">{errors.Name}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Username</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Username"
                                    />
                                    {errors.Username && <div className="mt-2 text-sm text-red-500">{errors.Username}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Email address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Email Address"
                                    />
                                    {errors.Email && <div className="mt-2 text-sm text-red-500">{errors.Email}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Password"
                                    />
                                    {errors.Password && <div className="mt-2 text-sm text-red-500">{errors.Password}</div>}
                                </div>

                                <div className="flex items-center">
                                    <button
                                        type="submit"
                                        className={`px-4 py-2 rounded-md text-white ${isPending ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} focus:outline-none`}
                                        disabled={isPending}
                                    >
                                        {isPending ? 'Updating...' : 'Update'}
                                    </button>
                                    <Link
                                        to="/admin/users"
                                        className="ml-2 px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 focus:outline-none"
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

export default UserEdit;
