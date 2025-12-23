import { useCallback, useState , useRef, useEffect} from "react";
import { LOGO } from "../../assets/logo";
import { useNavigate, Link } from "react-router-dom";
import { getUserProfile } from "../../api/user";
import { logout } from "../../api/auth";
import Message from "./Message";

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

  const handleSignIn = useCallback (() => {
    navigate("/signin");
    setIsMenuOpen(false);
  },[navigate]);


  const handleProfileDropdown = useCallback(() =>{
     setIsProfileDropdownOpen((prev) => !prev);
  }, []);

    //Derived state

   const isLoggedIn = !!user;
   const role = user?.userType?.toLowerCase() || "client";

  const handleProfileMenuClick = useCallback( async (action) => {
    setIsProfileDropdownOpen(false);
    setIsMenuOpen(false);
    try {
      switch (action) {
        case  "profile":
          if (role === "doctor") {
            navigate("/doctor-profile");
          } else if (role === "agent") {
            navigate("/agent-profile");
          } else {
            navigate("/client-profile");
          }
          break;

          case "appointments":
            navigate("/my-appointments");
            break;

          case "logout":
            showToast("info", "Signing Out", "Please wait while we sign you out...");

            try {
              // Call logout API (axios will handle any token refresh if needed)
              await  logout();


              //Clear  all auth data
              localStorage.removeItem("access_token");
              localStorage.removeItem("mock_user");
              sessionStorage.removeItem("access_token");
              sessionStorage.removeItem("mock_user");
            
              setUser(null);
              showToast("Success", "Signed out Successfully");

              setTimeout(() => {
                navigate("/signin", {replace: true});
              }, 1500);
            } catch (logoutError) {
              console.error("Logout API error:", logoutError);

              //Even if API calls fails clear local data for security
              localStorage.removeItem("access_token");
              localStorage.removeItem("mock_user");
              sessionStorage.removeItem("access_token");
              sessionStorage.removeItem("mock_user");

              setUser(null);
              showToast("Warning", "Logout Waring", "Session cleared for security. you will be redirected");

              setTimeout(() => {
                navigate("/signin", {replace: true});

              }, 2000);
            }
            break;
           default:
            console.warn("Unknown Profile menu action:", action);
            
      }
    } catch (error) {
        console.error("Error handling profile menu action", error);
        showToast("error", "Action Failed", "Unable to complete the requested action.");
        
    }

  }, [role,navigate, showToast]);

  //Close drop down on outside click
  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutSide);
      return () => document.removeEventListener("mousedown", handleClickOutSide);
    }

  }, [isProfileDropdownOpen]);

  //helper functions
  const getInitials = useCallback((firstName, lastName) => {
    if (!firstName) return "?";
    const first = firstName.charAt(0).toUpperCase();
    const last = lastName ? lastName.charAt(0).toUpperCase() : "";
    return first + last;
  }, []);


  const getFullName = useCallback(() => {
    if (!user) return "";
    const firstName = user.f_name || "";
    const lastName = user.l_name || "";
    return `${firstName} ${lastName}`.trim() || "User";
  }, [user]);


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
                  { !isLoggedIn ? (
                    <button
                     onClick={handleSignIn}
                     className="px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-md text-primary-blue hover:text-primary-dark"
                    >
                      SignIn

                    </button>
                  ) : (
                    <div className="relative" ref={profileDropdownRef}>
                      <button 
                      onClick={handleProfileDropdown}
                      className="flex items-center px-3 py-2 space-x-3 transition-all duration-200 rounded-lg hover:bg-primary-blue/10"
                      aria-expanded={isProfileDropdownOpen}
                      aria-haspopup="true"
                      >
                        { user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={`${getFullName()} profile`}
                            className="object-cover border-2 rounded-full w-9 h-9 border-primary-blue/20"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />

                        ) : (
                          <span className="flex items-center justify-center text-lg font-bold border-2 rounded-full w-9 h-9 bg-primary-blue/10 text-primary-blue border-primary-blue/20">
                            {getInitials(user.f_name, user.l_name)}
                          </span>

                        )}
                        <span className="text-sm font-semibold text-primary-dark">
                          {role === "doctor" ? "Dr. " : ""}
                          {role === "agent" ? "Agent " : ""}
                          {getFullName()}
                        </span>
                        <svg 
                          className={`w-4 h-4 text-primary-blue transition-transform duration-200 ${
                          isProfileDropdownOpen ? "rotate-180" : ""
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>

                      {/* Dropdown */}
                      { isProfileDropdownOpen && (
                        <div className="absolute right-0 z-50 w-48 py-2 mt-2 bg-white border border-gray-100 shadow-lg rounded-xl">
                          <button
                           onClick={() => handleProfileMenuClick ("profile")}
                           className="w-full px-4 py-2 text-left transition-all duration-200 text-primary-dark hover:bg-primary-blue/10"
                          >
                            Profile
                          </button>
                          {/* only show My Appointments for client */}
                          {role !== "doctor" && role !== "agent" && (
                            <>
                             <button
                              onClick={() => handleProfileMenuClick("appointments")}
                              className="w-full px-4 py-2 text-left transition-all duration-200 text-primary-dark hover:bg-primary-blue/10"

                             >

                              My Appointments
                             </button>
                             {role === "client" && (
                              <Link 
                               to="/my-bookings"
                               className="block w-full px-4 py-2 text-left transition-all duration-200 text-primary-dark hover:bg-primary-blue/10"
                               onClick={() => setIsProfileDropdownOpen(false)}
                              
                              >

                               My Bookings
                              </Link>
                             )}
                          
                            </>
                            
                          )}
                          <button
                          onClick={() => handleProfileMenuClick("logout")}
                          className="w-full px-4 py-2 text-left text-red-600 transition-all duration-200 hover:bg-red-50"
                          
                          >
                            Logout
                          </button>
            
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Mobile menu button  */}
                <div className="md:hidden">
                  <button
                   onClick={toggleMenu}
                   className="p-2 transition-colors duration-300 rounded-md text-primary-dark hover:text-primary-blue"
                   aria-label="Toggle menu"
                  >
                    <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                </div>
              
            </div>

        </div>
        {/* Mobile Navigation Menu  */}
        {isMenuOpen && (
          <div className="bg-white border-t border-gray-100 shadow-lg md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">

              <button 
               onClick={() => scrollToSection("hero")}
               className="block w-full px-3 py-2 text-base font-medium text-left transition-colors duration-300 rounded-md text-primary-dark hover:text-primary-blue"
              >
                Home
              </button>
              <button
               onClick={() => scrollToSection("about")}
               className="block w-full px-3 py-2 text-base font-medium text-left transition-colors duration-300 rounded-md text-neutral-gray hover:text-primary-blue"
              
              >
                About
              </button>
              <button
               onClick={() => scrollToSection("services")}
               className="block w-full px-3 py-2 text-base font-medium text-left transition-colors duration-300 rounded-md text-neutral-gray hover:text-primary-blue"
              >
                Service
              </button>
              <button
               onClick={() => scrollToSection("doctors")}
               className="block w-full px-3 py-2 text-base font-medium text-left transition-colors duration-300 rounded-md text-neutral-gray hover:text-primary-blue"
              >
                Doctors
              </button>
              <button
               onClick={() => scrollToSection("contact")}
               className="block w-full px-3 py-2 text-base font-medium text-left transition-colors duration-300 rounded-md text-neutral-gray hover:text-primary-blue"
              >
                Contact
              </button>

            </div>
            <div className="px-2 pt-3 pb-3 border-t border-gray-100">
              { !isLoggedIn ? (
                <button
                 onClick={handleSignIn}
                 className="block w-full px-3 py-2 text-base font-medium text-left transition-colors duration-300 rounded-md text-primary-blue hover:text-primary-dark"
                >
                  Sign In
                </button>
              ) : (
                <div className="relative" ref={profileDropdownRef}>
                  <button
                   onClick={handleProfileDropdown}
                   className="flex items-center w-full px-3 py-2 space-x-3 transition-all duration-200 rounded-lg hover:bg-primary-blue/10"
                  >
                    {user.profileImage ? (
                      <img
                       src={user.profileImage}
                       alt={`${getFullName()} profile`}
                       className="object-cover border-2 rounded-full w-9 h-9 border-primary-blue/20 "
                       onError={(e) => {
                        e.target.style.display = "none";
                       }}
                      
                      />
                    ) : (
                      <span className="flex items-center justify-center text-lg font-bold border-2 rounded-full w-9 h-9 bg-primary-blue/10 text-primary-blue border-primary-blue/20">
                        {getInitials(user.f_name, user.l_name)}

                      </span>

                    )}
                    <span className="text-sm font-semibold text-primary-dark">
                      {role === "doctor" ? "Dr. " : ""}
                      {role === "agent " ? "Agent " : ""}
                      {getFullName()}

                    </span>
                    
                  </button>
                  {/* Mobile dropdown menu items */}
                  {isProfileDropdownOpen && (
                    <div className="mt-2 space-y-1">
                      <button
                       onClick={() => handleProfileMenuClick("profile")}
                       className="block w-full px-4 py-2 text-left transition-all duration-200 text-primary-dark hover:bg-primary-blue/10"

                      >
                        Profile
                      </button>
                      {role !== "doctor" && role !== "agent" && (
                        <>
                        <button
                         onClick={() => handleProfileMenuClick("appointments")}
                         className="block w-full px-4 py-2 text-left transition-all duration-200 text-primary-dark hover:bg-primary-blue/10"
                        
                        >
                          My Appointments
                        </button>
                        {/* My Bookings for Client (mobile) */}
                        {role === "client" && (
                          <Link
                           to="/my-bookings"
                           className="block w-full px-4 py-2 text-left transition-all duration-200 text-primary-dark hover:bg-primary-blue/10"
                           onClick={() => setIsProfileDropdownOpen(false)}
                        
                          >
                          
                           My Bookings
                          </Link>
                        )}
                        
                        </>
                      )}
                      <button
                       onClick={() => handleProfileMenuClick("logout")}
                       className="block w-full px-4 py-2 text-left text-red-600 transition-all duration-200 hover:bg-red-50"
                      
                      >
                        Logout
                      </button>

                    </div>
                  )}
                </div>

              )}
            </div>

           </div>
        )}
      </nv>
      <Message
       isOpen={toast.isOpen}
       onClose={closeToast}
       type={toast.type}
       title={toast.title}
       message={toast.message}
       showCloseButton={true}
       autoClose={true}
       autoCloseDelay={toast.type === "info" ? 2000 : toast.type === "success" ? 3000 : 4000}
       position="top-right"
    
      />
    </>
  );   
};

export default NavBar;

