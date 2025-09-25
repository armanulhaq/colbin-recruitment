import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const IMAGE_URL =
        "https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    credentials: "include",
                }
            );
            if (!res.ok) {
                throw new Error("Failed to login");
            }
            await res.json();
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen  px-5 xl:px-0 ">
            <div className="flex flex-col md:flex-row w-full max-h-screen rounded-xl border border-gray-200">
                <div className="w-full md:w-1/2">
                    <img
                        className="w-full h-64 md:h-full object-cover rounded-t-xl xl:rounded-t-none"
                        src={IMAGE_URL}
                        alt="Login"
                    />
                </div>

                <div className="w-full md:w-1/2 bg-[#fbfaff] flex flex-col items-center justify-center p-8 md:p-12">
                    <div className="w-full max-w-sm">
                        <h1 className="text-3xl font-bold text-center mb-2">
                            Welcome Back 👋
                        </h1>
                        <h3 className="text-gray-500 text-center mb-8">
                            Log in to access your profile and discover new
                            opportunities.
                        </h3>

                        <form
                            className="space-y-4"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div>
                                <input
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email is required",
                                        },
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    type="email"
                                    placeholder="Email"
                                    className="w-full border border-gray-300 rounded-xl p-4"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs px-2">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <input
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Password is required",
                                        },
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password must be at least 6 characters",
                                        },
                                        maxLength: {
                                            value: 20,
                                            message:
                                                "Password must be less than 20 characters",
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                                            message:
                                                "Password must have uppercase, lowercase, number & special character",
                                        },
                                    })}
                                    type="password"
                                    placeholder="Password"
                                    className="w-full border border-gray-300 rounded-xl p-4 "
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs px-2">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#532b88] hover:bg-[#3c096c] text-white py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer"
                            >
                                {isLoading
                                    ? "Logging in..."
                                    : "Login to Dashboard"}
                            </button>
                        </form>
                        <p className="text-center text-sm py-2">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-[#532b88] font-bold"
                            >
                                Get Started
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
