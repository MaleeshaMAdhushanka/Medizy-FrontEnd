import { authApi, api } from "./config/api";
import EndPoints from "./config/endpoints";


//login function
export const login = async (username, password) => {
   try {

   const response = await authApi.post(EndPoints.LOGIN, {
        username,
        password,
    });
    console.log("Login successful, handle...");
    
    //Store access token and user data
    if (response.isSuccess && response.content) {
    
        //store access token if provided
        if(response.content.accessToken) {
            localStorage.setItem("access_token", response.content.accessToken);

        }

        //Store user data for UI purposes
        if (response.content.user) {
            localStorage.setItem("mock_user", JSON.stringify(response.content.user));

        } else if ( response.content) {
            //If user data is directly in content
            localStorage.setItem("mock_user", JSON.stringify( response.content));

        }
    }
     
    return response;
   } catch (error) {
    throw new Error(error.message || "Login failed");
   }
};




//Register function

export const register = async () => {

};




//Logout function

export const logout = async () => {
    try {
        await api.post(EndPoints.LOGOUT);

        //Clear all authentication data
        localStorage.removeItem("access_token");
        localStorage.removeItem("mock_user");
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("mock_user");

        console.log("Logout successful, all tokens cleared.");
        return { isSuccess: true, message: "Logged out successfully" };
    } catch (error) {
        //Even if Api calls fails, clear local storage for security
        localStorage.removeItem("access_token");
        localStorage.removeItem("mock_user");
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("mock_user");

        console.warn("Logout API failed, but local storage cleared:",error.message);
        
        //Don't throw error here - logout should always succeed locally
        return{ isSuccess: false, message: error.message};

    }

};



//Forgot password function

export const forgotPassword = async () => {

};




//Reset password function

export const resetPassword = async () => {


}




//Send OTP function for password reset

export const sendOtp = async () => {

}




//Verify OTP function
export const verifyOtp = async () => {

};



//update password function

export const updatePassword = async () => {

};
