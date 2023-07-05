import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Loading from "../../../../Assignment-11/client/src/components/Loading/Loading.jsx";
import { showErrorMessage, showSuccessMessage } from "../utils/Notification";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();

    document.title = "Melody Institute | Login";

    const {
        continueWithGoogle,
        continueWithGithub,
        continueWithFacebook,
        emailPasswordUserLogin,
        error,
        setError,
        loading,
    } = useContext(AuthContext);

    const from = location.state?.from?.pathname || "/";

    const handleUserLogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        if (password.length < 6) {
            showErrorMessage("Password must be at least 6 characters");
            return setError("Password must be at least 6 characters");
        } else {
            emailPasswordUserLogin(email, password)
                .then(() => {
                    setError("");
                    showSuccessMessage("👍 Email SignIn Successful!");
                    navigate(from, { replace: true });
                })
                .catch((err) => {
                    setError(err.message);
                    showErrorMessage(err.message);
                });
        }
    };

    const handleGoogleLogin = () => {
        continueWithGoogle()
            .then(() => {
                setError("");
                showSuccessMessage("👍 Google SignIn Successful!");
                navigate(from, { replace: true });
            })
            .catch((err) => {
                setError(err.message);
                showErrorMessage(err.message);
            });
    };

    const handleGithubLogin = () => {
        continueWithGithub()
            .then(() => {
                setError("");
                showSuccessMessage("👍 Github SignIn Successfully!");
                navigate(from, { replace: true });
            })
            .catch((err) => {
                setError(err.message);
                showErrorMessage(err.message);
            });
    };

    const handleFacebookLogin = () => {
        continueWithFacebook()
            .then(() => {
                setError("");
                showSuccessMessage("👍 Facebook SignIn Successfully!");
                navigate(from, { replace: true });
            })
            .catch((err) => {
                setError(err.message);
                showErrorMessage(err.message);
            });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#1d232a]  flex flex-col justify-center sm:py-12">
            <div className="md:pt-0  p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <h1 className="font-bold text-center text-3xl dark:text-white mb-5">
                    Please Login
                </h1>
                <div className="bg-white dark:bg-[#2B3A55]   shadow w-full rounded-lg divide-gray-200">
                    <form onSubmit={handleUserLogin} className="px-5 pt-7">
                        <label className="font-semibold text-sm text-gray-600 dark:text-white pb-1 block">
                            E-mail
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Please Enter Your Email"
                            className="dark:text-white dark:bg-slate-700 border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            required
                        />
                        <label className="font-semibold text-sm text-gray-600 dark:text-white pb-1 block">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Please Enter Your Password"
                            className="dark:text-white dark:bg-slate-700 border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            required
                        />
                        {error && (
                            <p className=" mb-5 text-sm  text-red-700">
                                {error}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                        >
                            <span className="inline-block mr-2">Login</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4 inline-block"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </button>
                    </form>
                    <div className="m-0 p-0 ">
                        <p className="mt-6 text-sm text-center text-gray-400 dark:text-white">
                            Don&#x27;t have an account yet?{" "}
                            <Link
                                to="/register"
                                className="text-blue-500 focus:outline-none focus:underline hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                    <div className="text-center mt-2">
                        <div className="inline-flex items-center justify-center w-full">
                            <hr className="w-full h-px  bg-gray-200 border-1 dark:bg-gray-700" />
                            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
                                OR Continue With
                            </span>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-3 gap-1">
                            <button
                                onClick={handleFacebookLogin}
                                type="button"
                                className="transition duration-200 border border-gray-200 dark:text-white text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                            >
                                Facebook
                            </button>
                            <button
                                onClick={handleGoogleLogin}
                                type="button"
                                className="transition duration-200 border border-gray-200 dark:text-white text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                            >
                                Google
                            </button>
                            <button
                                onClick={handleGithubLogin}
                                type="button"
                                className="transition duration-200 border border-gray-200 dark:text-white text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                            >
                                Github
                            </button>
                        </div>
                    </div>
                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-4 h-4 inline-block align-text-top"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="inline-block ml-1">
                                        Forgot Password
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="text-center sm:text-left whitespace-nowrap">
                            <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block align-text-top"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                <Link to="/" className="inline-block ml-1">
                                    Back To Home
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
