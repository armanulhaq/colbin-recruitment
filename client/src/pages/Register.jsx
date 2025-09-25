import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
    const IMAGE_URL =
        "https://images.pexels.com/photos/1251862/pexels-photo-1251862.jpeg";

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
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (!res.ok) {
                throw new Error("Failed to register");
            }
            await res.json();
            navigate("/login");
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
                        className="w-full h-64 md:h-full object-cover rounded-t-xl md:rounded-t-none"
                        src={IMAGE_URL}
                        alt="Login"
                    />
                </div>

                <div className="w-full bg-[#fbfaff] md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12">
                    <div className="w-full max-w-sm">
                        <h1 className="text-3xl font-bold text-center mb-2">
                            Welcome to Colbin 👋
                        </h1>
                        <p className="text-gray-500 text-center mb-6">
                            Join thousands of job seekers and recruiters.
                        </p>

                        <form
                            className="space-y-4"
                            //onSubmit is a function provided by react-hook-form that takes the onSubmit function as an argument
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div>
                                <input
                                    //spreads the register function to the input element
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: "Name is required",
                                        },
                                        minLength: {
                                            value: 3,
                                            message:
                                                "Name must be at least 3 characters",
                                        },
                                        maxLength: {
                                            value: 20,
                                            message:
                                                "Name must be less than 20 characters",
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z ]+$/,
                                            message:
                                                "Name must contain only letters",
                                        },
                                    })}
                                    type="text"
                                    placeholder="Name"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 "
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs px-2">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

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
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 "
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
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
                                            message:
                                                "Password must have uppercase, lowercase, number & special character",
                                        },
                                    })}
                                    type="password"
                                    placeholder="Password"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 "
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
                                {isLoading ? "Registering..." : "Get Started"}
                            </button>
                        </form>
                        <p className="text-center text-sm py-2">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-[#532b88] font-bold"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
