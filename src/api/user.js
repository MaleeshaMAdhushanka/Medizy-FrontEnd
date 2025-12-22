import { api } from "./config/api";
import { EndPoints} from "./config/endpoints";


//Get user profile function
export const getUserProfile = async () => {

    try {
        console.log("Fetching user profile with cookie-based authentication");
        const response = await api.get(EndPoints.PROFILE);

        //Update local storage with fetched profile data
        if(response && response.isSuccess && response.content) {
          const userDataStr =  JSON.stringify(response.content);

          //updated the same storage location where access token is stored
          if(localStorage.getItem("access_token")){
            localStorage.setItem("mock_user", userDataStr);
          } else if (sessionStorage.getItem("access_token")){
            sessionStorage.setItem("mock_user", userDataStr);
          }

        }
        
        return response;
    } catch (error) {

        //If its a 401 error, the user need to re-authenticate
        if(error.message.includes("401") || error.message.includes("Authentication")) {
            //Clear invalid tokens and both stage
            localStorage.removeItem("access_token");
            localStorage.removeItem("mock_user");
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("mock_user");

            throw new Error("Session expired. Please sign in again.");
            
        }

        throw new Error (error.message || "Failed to fetch user profile");
    }

};

//Update user profile function

export const updateUserprofile = async (profileData) => {

    try {
        const response  = await api.put(EndPoints.PROFILE, profileData);

        //Update local storage with updated profile data
        if(response && response.isSuccess && response.content){
            localStorage.setItem("mock_user", JSON.stringify(response.content));

        }
        return response;
    } catch (error) {

        throw new Error (error.message || "Failed to update user profile");
    }
};

//Update user profile Image function
export const uploadProfileImage  = async (imageFile) => {
    try {

       const formData = new FormData();
       formData.append("profileImage", imageFile);
        
      const response =  await api.post(EndPoints.PROFILE_IMAGE,formData);

      //update local storage if profile data is returned
      if(response && response.isSuccess && response.content){
        localStorage.setItem("mock_user", JSON.stringify(response.content));
      }
      return response;
    } catch (error){
        throw new Error (error.message || "Failed to upload profile image");
    }

};

//Send OTP from email/phone verification
export const sendVerificationOtp = async (type, value) =>{
    try {
        const response =  await api.post(EndPoints.SEND_VERIFICATION_OTP, {
            type, //'email or 'phone'
            value,
        });
        return response;
    } catch (error) {
        throw new Error(error.message || "Failed to send verification OTP");
    }

};
//Send OTp for email/phone
export const verifyOtp = async (type, value, otp) => {

    try {
       const response = await api.post(EndPoints.VERIFY_OTP, {
            type,
            value,
            otp,

        });
        return response;
    } catch (error) {
        throw new Error(error.message || "OTP verification failed");
 }
};




