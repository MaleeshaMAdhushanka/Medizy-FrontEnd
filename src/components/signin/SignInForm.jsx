import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../common/Message";
import { login } from "../../api/auth";


const SignInForm = ({ initialROle = "CLIENT"}) => {

const [role, setRole] = useState(initialROle);

const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
});

const [error, setError] = useState(null);
const[isLoading, setIsLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

const [toast, setToast] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
});

   const navigate = useNavigate();

   const showToast = (type, title, message) => {
    setToast({isOpen: true, type, title, message});
   };

   const closeToast = () => {
    setToast((prev) => ({...prev, isOpen: false}));
   };


   const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);

   };

   const handleChange = (e) => {
     const {name, value, type, checked }   =   e.target;
      setForm((s) => ({... s, [name]: type === "checkbox" ? checked : value}));
   };


    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

  

     if(!form.username || !form.password){
        showToast(
            "warning",
            "Missing Information",
            "Please provide email/mobile and password"
        );
        return;
     }

     setIsLoading(true);

     ///Use user name (email or mobile) for the API call
     login(form.username, form.password)
      .then((res) => {
        console.log("Login response:", res);

        // Check if login was successful based on API response structure
        if (res && res.isSuccess) {
          let user;
          let accessToken;

          // Handle different response structures
          if (res.content && res.content.user) {
            user = res.content.user;
            accessToken = res.content.accessToken;
          } else if (res.content) {
            user = res.content;
            accessToken = res.content.accessToken;
          } else {
            throw new Error("Invalid response structure");
          }

          const userType = user.userType;

          // Check if user type is authorized
          const authorizedTypes = ["DOCTOR", "CLIENT", "AGENT"];
          if (!authorizedTypes.includes(userType)) {
            showToast(
              "error",
              "Unauthorized Access",
              "Your account type is not authorized."
            );
            return;
          }

          // Store tokens properly
          if (form.remember) {
            if (accessToken) {
              localStorage.setItem("access_token", accessToken);
            } else {
              localStorage.setItem(
                "access_token",
                `mock_${user.id}_${Date.now()}`
              );
            }
            localStorage.setItem("mock_user", JSON.stringify(user));
          } else {
            if (accessToken) {
              sessionStorage.setItem("access_token", accessToken);
            } else {
              sessionStorage.setItem(
                "access_token",
                `mock_${user.id}_${Date.now()}`
              );
            }
            sessionStorage.setItem("mock_user", JSON.stringify(user));
          }

          showToast(
            "success",
            "Login Successful",
            `Welcome back, ${
              user.f_name || user.name || "User"
            }! Redirecting...`
          );

          // Navigate based on user type with proper delay
          setTimeout(() => {
            const userRole = userType.toLowerCase();

            console.log("Navigating user with role:", userRole);

            try {
              switch (userRole) {
                case "doctor":
                  navigate("/", { replace: true });
                  break;
                case "client":
                  navigate("/", { replace: true });
                  break;
                case "agent":
                  navigate("/", { replace: true }); // Update when agent dashboard is ready
                  break;
                default:
                  navigate("/", { replace: true });
              }
            } catch (navError) {
              console.error("Navigation error:", navError);
              // Fallback navigation
              window.location.href = "/";
            }
          }, 2000); // Increased delay to ensure state is set
        } else {
          showToast(
            "error",
            "Login Failed",
            res?.message || "Invalid credentials. Please try again."
          );
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        showToast(
          "error",
          "Connection Error",
          err.message ||
            "Unable to connect to server. Please check your internet connection."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
    };
           
    return (
        <>
        <form onSubmit={handleSubmit} className="space-y-4">
             <div className="flex items-center justify-between">
                
            </div>
            <div>
                <label className="block text-sm text-gray-600">Email or Mobile</label>
                <input
                   name="username"
                   value= {form.username}
                   onChange={handleChange}
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
                         value={form.password}
                         onChange={handleChange}
                         type={ showPassword ? "text":"password"}
                         placeholder="Enter your password"
                         className="w-full px-3 py-2 pr-10 border rounded-lg"
                    
                    />
                    <button 
                      type="button"
                      onClick={togglePasswordVisibility}
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
                      checked={form.remember}
                      onChange={handleChange}
                      
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
                  disabled={isLoading}
                  className="w-full py-3 text-white transition-all duration-300 rounded-lg bg-primary-blue hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Signing In ...": "Sign In"}
        
                </button>

             </div>

         </form>

            <Message
            isOpen={toast.isOpen}
            onClose={closeToast}
            type={toast.type}
            message={toast.message}
            showCloseButton={true}
            autoClose={true}
            autoCloseDelay={
                toast.type === "success" ? 2000 : toast.type === "error" ? 4000 : 3000
            }
            position="top-right"
            
            />
            
        </>

    );
};
export default SignInForm;