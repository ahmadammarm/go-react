import { type FC } from "react";
import SidebarMenu from "../../../components/SidebarMenu";
import { Link } from "react-router";
import { useUsers, type User } from "@/hooks/useUsers";


const UsersIndex: FC = () => {
    const { data: users, isLoading, isError, error } = useUsers();

    return (
        <div className="container mx-auto mt-5 mb-5">
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/4">
                    <SidebarMenu />
                </div>
                <div className="w-full md:w-3/4">
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="px-4 py-3 flex justify-between items-center border-b">
                            <span className="text-lg font-semibold">USERS</span>
                            <Link
                                to="/admin/users/create"
                                className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md"
                            >
                                ADD USER
                            </Link>
                        </div>
                        <div className="p-4">
                            {isLoading && (
                                <div className="text-center text-blue-500">Loading...</div>
                            )}

                            {isError && (
                                <div className="text-center text-red-500">
                                    Error: {error.message}
                                </div>
                            )}

                            <table className="w-full border-collapse border border-gray-300">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Full Name</th>
                                        <th className="border border-gray-300 px-4 py-2">Username</th>
                                        <th className="border border-gray-300 px-4 py-2">Email Address</th>
                                        <th className="border border-gray-300 px-4 py-2 w-1/5">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.map((user: User) => (
                                        <tr key={user.id} className="hover:bg-gray-100">
                                            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                            <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                <Link
                                                    to={`/admin/users/edit/${user.id}`}
                                                    className="px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md mr-2"
                                                >
                                                    EDIT
                                                </Link>
                                                <button className="px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md">
                                                    DELETE
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersIndex;
