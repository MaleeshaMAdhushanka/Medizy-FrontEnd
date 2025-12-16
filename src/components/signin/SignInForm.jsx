import { useNavigate } from "react-router-dom";
const SignInForm = () => {



   const navigate = useNavigate();
    return (
        <>
        <form className="space-y-4">
             <div className="flex items-center justify-between">
                
            </div>
            <div>
                <label className="block text-sm text-gray-600">Email or Mobile</label>
                <input
                   name="username"
                   value= {}
                   onChange={}
                   type="text"
                   placeholder="you@example.com or 077 000 0000"
                   className="w-full px-3 py-2 border rounded-lg"

                />
            </div>
            <div>
                <label className="block text-sm text-gray-600">Password</label>
                <div className="relative">
                    <input
                         name="password"
                         value={}
                         onChange={}
                         type={ ? "text":"password"}
                         placeholder="Enter your password"
                         className="w-full px-3 py-2 pr-10 border rounded-lg"
                    
                    />
                    <button 
                      type="button"
                      onClick={}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      aria-label={ showPassword ? "Hide password" : "Show password"}
                    >
                         {showPassword ? (
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                            />
                        </svg>


                         ) : (
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>

                         )}
                    </button>
                </div>

            </div>

             <div className="flex items-center justify-between text-sm">
                <label className="flex items-center ml-4 space-x-2">
                    <input 
                      type="checkbox" 
                      name="remember"
                      checked={}
                      onChange={}
                      
                    />
                    <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="mr-5 text-primary-blue"
                  onClick={() => navigate()}
                
                >
                    ForgotPassword?
                </button>
             </div>
             {error && <div className="text-sm text-red-600">{error}</div>}

             <div>
                <button
                  type="submit"
                  disabled={}
                  className="w-full py-3 text-white transition-all duration-300 rounded-lg bg-primary-blue hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Signing In ...": "Sign In"}
        
                </button>

             </div>



        </form>

        
        
        
        </>

    );
};
export default SignInForm;