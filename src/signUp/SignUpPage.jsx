import WebLayout from "../layouts/WebLayout";
import { Link } from "react-router-dom";
import SignInLogo from "../components/signin/SignInLogo";
import SignUpForm from "../components/signup/SignUpForm";


const SignUpPage = () => {

  return (
        <WebLayout>
            <div className="relative flex items-center justify-center min-h-screen px-4 py-6 overflow-hidden sm:py-8 sm:px-6 bg-gradient-to-br from-white via-blue-50 to-accent-cyan/10">
             <div className="absolute inset-0 z-0 hidden sm:block" aria-hidden />

                <div className="z-10 flex items-center justify-center w-full px-2 sm:px-4">
                <div className="w-full max-w-sm sm:max-w-xl">
                    <div className="p-4 bg-white shadow-sm sm:p-8 rounded-3xl">
                    <div className="items-center justify-center hidden mb-6 sm:flex md:justify-center">
                        <SignInLogo />
                    </div>

                    <h2 className="mb-2 text-lg font-semibold text-center sm:text-2xl">
                        Create an account
                    </h2>
                    <p className="mb-3 text-xs text-center text-gray-500 sm:text-sm">
                        Sign up as a client to book appointments.
                    </p>

                    <SignUpForm />

                    <div className="mt-4 text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/signin" className="text-primary-blue">
                        Sign in
                        </Link>
                    </div>
                    <div className="mt-3 text-center text-gray-400 text-2xs sm:text-xs">
                        By continuing you agree to our Terms and Privacy.
                    </div>
                    </div>
                </div>
                </div>
           </div>

     </WebLayout>
    );


};

export default SignUpPage;