import { Link, useLocation } from "react-router-dom";
import SignInLogo from "../components/signin/SignInLogo";
import SignInForm from "../components/signin/SignInForm";

const SignInPage = () => {
    const location = useLocation();
    const successMessage = location.state?.message;
  
    return (
        <div  className="relative flex items-center justify-center min-h-screen px-4 py-8 overflow-hidden bg-gradient-to-br from-white via-blue-50 to-accent-cyan/20">
            <div
              className="absolute inset-0 z-0"
                style={{
                    backgroundColor:
                    "linear-gradient(to bottom right, #fff, #e0f2fe, #e0f2fe)",
                    backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0f2fe' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')\"",
                }}
                >

            </div>
            <div className="z-10 w-full max-w-xl">
                <div className="w-full p-8 bg-white shadow-md rounded-3xl" >
                    <div className="flex items-center justify-center mb-1 md:justify-center">
                        <SignInLogo/>

                    </div>

                    <h2 className="mb-2 text-xl font-semibold text-center sm:text-2xl">
                        Sign in to your account
                    </h2>
                    <p className="mb-3 text-xs text-center text-gray-500 sm:text-sm" >
                        Welcome back! Please enter your details.
                    </p>

                    {successMessage && (
                        <div className="p-3 mb-4 text-sm text-center text-green-700 border border-green-200 rounded-lg bg-green-50">
                            {successMessage}
                         </div>   
                    )}
                    
                    <SignInForm/>
                    <div className="mt-4 text-sm text-center text-gray-600">
                        New here?{""}
                        <Link to="">
                        create account
                        </Link>
                    </div>
                    <div className="mt-3 text-xs text-center text-gray-400 sm:text-sm"> 
                        By continuing, you agree to our Terms and Privacy.
                    </div>

                </div>

            </div>

        </div>
     
    );
};

export default SignInPage;

