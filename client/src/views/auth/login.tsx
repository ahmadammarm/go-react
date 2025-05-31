export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Login Page</h1>
            <p className="text-lg text-gray-700">This is a simple login page built with React and Tailwind CSS.</p>

            <form className="mt-6 w-full max-w-sm">
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 mb-4 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mb-4 border rounded"
                />
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    )
}