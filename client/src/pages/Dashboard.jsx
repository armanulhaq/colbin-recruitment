import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User } from "lucide-react";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = async () => {
            try {
                const res = await fetch(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/api/auth/authenticate-me`,
                    { method: "GET", credentials: "include" }
                );
                if (!res.ok) throw new Error("Failed to authenticate");
                const data = await res.json();
                setUser(data.user);
            } catch (error) {
                console.log(error);
            }
        };
        authenticate();
    }, []);

    const logoutHandler = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
                { method: "POST", credentials: "include" }
            );
            if (!res.ok) throw new Error("Failed to logout");
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#fbfaff] p-4">
            <div className="bg-white border border-purple-200 rounded-2xl p-8 max-w-sm w-full text-center">
                {user ? (
                    <>
                        <div className="mb-6">
                            <img
                                src={`https://ui-avatars.com/api/?name=${user.name}&background=532b87&color=fff&size=128`}
                                alt="User Avatar"
                                className="w-24 h-24 mx-auto rounded-full border-4 border-purple-400"
                            />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Hello, {user.name} 👋
                        </h2>

                        <p className="text-gray-600 mb-4">
                            Your registered email:
                        </p>

                        <div className="space-y-4">
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                                <p className="text-gray-800 font-medium break-words">
                                    {user.email}
                                </p>
                            </div>

                            <button
                                onClick={logoutHandler}
                                className="w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center space-y-4">
                        <div className="p-6 bg-purple-50 border border-purple-200 rounded-full">
                            <User className="w-16 h-16 text-purple-400" />
                        </div>

                        <h2 className="text-xl font-semibold text-gray-700">
                            You are not logged in
                        </h2>
                        <p className="text-gray-500 text-sm">
                            Please login to view your profile and access your
                            dashboard.
                        </p>
                        <Link
                            to="/login"
                            className="w-full  bg-[#532b88] hover:bg-[#3c096c] text-white py-3 rounded-lg font-medium transition-colors duration-200 text-center"
                        >
                            Go to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
