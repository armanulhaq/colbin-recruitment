import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
    const IMAGE_URL =
        "https://images.pexels.com/photos/4467687/pexels-photo-4467687.jpeg";

    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        try {
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
            const result = await res.json();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen px-6 md:px-0">
            <div className="flex flex-col md:flex-row w-full max-h-screen rounded-xl border border-gray-200 ">
                <div className="w-full md:w-1/2">
                    <img
                        className="w-full h-64 md:h-full rounded-t-xl md:rounded-t-none object-cover"
                        src={IMAGE_URL}
                        alt="Login"
                    />
                </div>

                <div className="w-full bg-[#fbfaff] md:w-1/2 flex flex-col items-center  justify-center p-8 md:p-12">
                    <div className="w-full max-w-sm">
                        <h1 className="text-3xl font-bold text-center mb-2">
                            Welcome to Colbin 👋
                        </h1>
                        <p className="text-gray-500 text-center mb-6">
                            Join thousands of job seekers and recruiters.
                        </p>

                        <form
                            className="space-y-4"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <input
                                {...register("name")}
                                type="text"
                                placeholder="Name"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 "
                            />
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="Email"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 "
                            />
                            <input
                                {...register("password")}
                                type="password"
                                placeholder="Password"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 "
                            />
                            <button
                                type="submit"
                                className="w-full bg-[#532b88] hover:bg-[#2f184b] text-white py-3 rounded-md font-medium transition-colors duration-200 cursor-pointer"
                            >
                                Get Started
                            </button>
                        </form>
                        <p className="text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="text-[#532b88]">
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
