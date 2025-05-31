import { Link } from "react-router";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
            <p className="text-lg text-gray-700">This is a simple home page built with React and Tailwind CSS.</p>

            <Link to="/login" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Go to Login
            </Link>
            <Link to="/register" className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Go to Register
            </Link>
        </div>
    )
}