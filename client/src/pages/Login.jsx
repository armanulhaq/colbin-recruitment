import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
    const IMAGE_URL =
        "https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg";

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);

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
                                className="w-full bg-[#532b88] hover:bg-[#2f184b] text-white py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer"
                            >
                                Login to Dashboard
                            </button>
                        </form>
                        <p className="text-center text-sm">
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
