import { useCallback, useState , useRef, useEffect} from "react";
import { LOGO } from "../../assets/logo";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../api/user";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const[isLoading, setIsLoading] = useState(true);
  const[toast, setToast] = useState ({
     isOpen: false,
     type: "info",
     title: "",
     message: "",
  });

  const profileDropdownRef = useRef(null);
  const navigate = useNavigate();

   //Memoized toast functions
   const showToast = useCallback ((type, title, message) => {
     setToast({ isOpen: true, type, title, message});
   }, []);

   const closeToast = useCallback (() => {
    setToast((prev) => ({ ...prev, isOpen: false}));
   });

   //Check authentication status
   const checkAuthStatus = useCallback (() => {
   const accessToken = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
   const userStr = localStorage.getItem("mock_user") || sessionStorage.getItem("mock_user");
   
   console.log("Nav bar - Checking auth status: ", {
     hasToken: !!accessToken,
     hasUser: !!userStr,
   });

   if(!accessToken || !userStr){
     return null;
   }

   try {
    JSON.parse(userStr);
   } catch (error){
    console.log("NavBar - Error parsing user data:" , error);

    //Clear corrupted data
    localStorage.removeItem("access_token");
    localStorage.removeItem("mock_user");
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("mock_user");
    return null;

   }
   
   }, []);

   //Fetch user profile with better error handling

   useEffect(() => {
     const fetchUserProfile = async () => {
      try {
        setIsLoading(true);

        //First check if user is authenticated
       const localUser =  checkAuthStatus();
        if(!localUser){
          setUser(null);
          setIsLoading(false);
          return;
        }

        //Set user from local storage first for immediate 
        setUser(localUser);

        //Then fetch profile data from API
        try {
          const response = await getUserProfile();
          if(response && response.isSuccess && response.content){
            setUser(response.content);
            //update local storage with fresh data
            localStorage.setItem("mock_user", JSON.stringify(response.content));

          }

        } catch (apiError) {
          console.log("Api call failed, using cached user data:", apiError);
          //If API calls fails , we have local user data continue with that
          //Axios interceptor will handle token refresh automatically
          
        }

      } catch (error) {
        console.log("Critical error in profile fetch:", error);
        setUser(null);
        showToast("error", "Authentication Error", "Please sign in again to continue");

      } finally {
        setIsLoading(false);
      }
     };
     
     fetchUserProfile();

   },[checkAuthStatus, showToast]);

   //Derived state

   const isLoggedIn = !!user;
   const role = user?.userType?.toLowerCase() || "guest";

   //Menu handler
   const toggleMenu = useCallback (() => {
    setIsMenuOpen((prev) => !prev);
   }, []);

  //Scroll to top on page load
  const scrollToSection = useCallback ((sectionId) => {
    //If not on homePage, navigate to home first
    if(window.location.pathname !== "/"){
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);

    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }

    setIsMenuOpen(false);

  }, [navigate]);


  //loading state
  if(isLoading){
    return (
       <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-lg">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center flex-shrink-0">
              <img src={LOGO} alt="Medizy Logo" className="w-auto h-12" />
            </Link>
            <div className="animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }


  return (
    <>
     <nv className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-lg">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                {/ */}
                <Link to="/" className="flex items-center flex-shrink-0">
                  <img
                  src={LOGO}
                  alt="Medizy Logo"
                    className="w-auto h-12"
                    onError={(e) => {
                      e.target.style.display ="none";
                      if(e.target.nextElementSibling) {
                        e.target.nextElementSibling.style.display = "block";
                      }
                    }}
                  />
                  <div className="hidden text-2xl font-bold text-primary-dark">
                    Medizy <span className="text-accent-cyan">LK</span> 
                  </div>
                
                </Link>

                {/*Desktop Navigation*/}
                <div className="hidden md:block">
                  <div className="flex items-baseline ml-10 space-x-8">
                    <button 
                     onClick={() => scrollToSection("hero")}
                     className="px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md text-primary-dark hover:text-primary-blue"

                    >
                      Home
                    </button>
                    <button
                     onClick={() => scrollToSection("about")}
                     className= "px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md text-neutral-gray hover:text-primary-blue"
                    >
                      About
                    </button>
                    <button
                     onClick={() => scrollToSection("services")}
                      className="px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md text-neutral-gray hover:text-primary-blue"
                    
                    >
                      Service

                    </button>

                    <button
                     onClick={() => scrollToSection("doctors")}
                     className="px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md text-neutral-gray hover:text-primary-blue"
                    >
                      Doctors

                    </button>
                    <button
                     onClick={() => scrollToSection("contact")}
                     className="px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md text-neutral-gray hover:text-primary-blue"
                     
                    >
                      Contact
                    </button>

                  </div>
                </div>

                {/* Desktop CTA/ Profile  */}

                <div className="items-center hidden space-x-4 md:flex">
                  { (
                    <button
                     onClick={}
                     className="px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-md text-primary-blue hover:text-primary-dark"
                    >
                      SignIn

                    </button>
                  ) : (
                    <div>

                    </div>

                  )

                  }




                </div>

                {/* Mobile menu button  */}
                <div>
                  <button>

                  </button>


                </div>
              


            </div>

        </div>
        {/* Mobile Navigation Menu  */}


      </nv>
    
    
    
    
    </>



  );   
};

export default NavBar;

