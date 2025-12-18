import axios from "axios"
import { EndPoints} from "../config/endpoints";

const BASE_URL= import.meta.env.VITE_API_BASE_URL;


//Create axios instance
const HttpClient = axios.create({
 baseURL: BASE_URL,
    withCredentials: true, //This handles the cookies for refresh token
    headers: {
        "Content-Type": "application/json",
    },
});

//Flag to prevent multiple refresh attempts
let isRefreshing = false; //we are currently refreshing token?
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error){
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

//Request interceptor to add access token to requests
HttpClient.interceptors.request.use( (config) => {

    //Get access token from local storage/session storage
    const accessToken = 
       localStorage.getItem("access_token") ||
       sessionStorage.getItem("access_token");
    
       if (accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
       }
        return config;
  },
  (error) => {
    Promise.reject(error)
  } 
);

//Response interceptor for handle token refresh

HttpClient.interceptors.response.use((response) => {
 return response;
},

 async (error) => {
    const originalRequest = error.config;

    //Handle 401 -Token expired try to refresh
    if (error.response?.status === 401 && !originalRequest._retry){
        if(isRefreshing){
            //If already refreshing queue this request
            return new Promise((resolve, reject) => {
                failedQueue.push({resolve, reject});
            })
            .then((token) => {
                //Update the original request with new Token

                if(token) {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                return HttpClient(originalRequest);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
        }
        originalRequest._retry = true;
        isRefreshing = true;

        try {
            //User centralized endpoint for refresh
           const refreshResponse = await HttpClient.post(EndPoints.REFRESH);
            

           //Extract new access  token  from response 
           const newAccessToken = refreshResponse.data.content?.accessToken || refreshResponse.data.accessToken;

           if(newAccessToken) {
            //Store new access token 
            localStorage.setItem("access_token", newAccessToken);


            //Update default authorization header
            HttpClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

            //Process queued requests with new Token
            processQueue(null, newAccessToken);

            //Update the original request with new Token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

           } else {
            processQueue(new Error("No access token receiver"), null);
           }
           isRefreshing = false;

       //Retry the original request
       return HttpClient(originalRequest);
        } catch (refreshError) {
            //Refresh failed , clear auth state and redirect to login
            processQueue(refreshError, null);


            //Clear all authentication data
            localStorage.removeItem("access_token");
            localStorage.removeItem("mock_user");
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("mock_user");

            //Redirect to login page if not already there
            if (window.location.pathname !== "/signin"){
                window.location.href = "/signin";
            }

            return Promise.reject(refreshError);
            
        }

    }

    //handle 403 -Forbidden, redirect to signin immediately
    if (error.response?.status === 403){

        //Clear all authentication data
        localStorage.removeItem("access_token");
        localStorage.removeItem("mock_user");
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("mock_user");

        //Redirect to login page if not already there
        if (window.location.pathname !== "/signin"){
            window.location.href = "/signin";
        }
        return Promise.reject(error);
    }
    return Promise.reject(error);

 }

);

//Base API function using axios

//wraps axios request with extra validation, error handling and formatting, 

const apiCall = async(endpoint, options={}) => {

    //Ensure endpoints  start with / and remove any double slashes
   const cleanEndpoint  =  endpoint.startWith("/") ? endpoint : `/${endpoint}`;


    if (
        cleanEndpoint.includes("placeholder") ||
        cleanEndpoint.includes("via.placeholder")||
        cleanEndpoint.includes("80?text=Dr") ||
        cleanEndpoint.includes("placeholde") ||
        endpoint.includes("placeholder")
    ) {
        console.warn("Prevented API call to placeholder URL:", cleanEndpoint);
        return Promise.reject(new Error("Invalid placeholder URL"));

    }
        //Also check the full URL construction
        const fullUrl = `${BASE_URL}${cleanEndpoint}`;
        if(fullUrl.includes("placeholder") || fullUrl.includes("80?text")){
            console.warn("Prevented Api call to constructed placeholder URL", fullUrl);
            return Promise.reject(new Error("Invalid placeholder URL"));
        }

        try {
            console.log("Making API call to :", fullUrl);
            console.log("Request config", {
                method: options.method || "GET",
                headers: options.headers,
                withCredentials: true,
            });

            //Configure axios request
            const config = {
                url : cleanEndpoint,
                method: options.method || "GET",
                ...options,
            };


            //Handle different content types
            if (options.body instanceof FormData){
               config.data = options.body;
               config.headers = {
                ...config.headers,
                "Content-Type": "multipart/form-data",
               };
            } else if (options.body && config.method !== "GET"){
               config.data = options.body;
            }

           const response =  await HttpClient(config);

           //Log the response for debugging
           console.log(
             `API ${config.method} ${cleanEndpoint}:`,
             response.status,
             response.statusText
           );

           return response.data;
            
         } catch (error) {
            console.log("API call failed:", error);


            //Handle axios error
            if(error.response) {
                //Server responded with error status
              const errorData =  error.response.data || {};

              //provide more specific error message based on status code
              let errorMessage = 
              errorData.message ||
                `Request failed with status ${error.response.status}`;

                if (error.response.status === 400){
                    // Handle 400 Bad Request - often validation errors
                    if (errorData.content && typeof errorData.content === "object") {
                        const fieldErrors = [];
                        for (const [field, errorMsg] of Object.entries(errorData.content)) {
                            const fieldName = field
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase());
                            fieldErrors.push(`${fieldName}: ${errorMsg}`);
                        }
                        errorMessage = fieldErrors.join("\n");
                    } else if (errorData.content && Array.isArray(errorData.content)) {
                        errorMessage = errorData.content.join(",");
                    } else if (errorData.errors) {
                        if (Array.isArray(errorData.errors)) {
                            errorMessage = errorData.errors.join(", ");
                        } else if (typeof errorData.errors === "object") {
                            const errorMessages = Object.values(errorData.errors).flat();
                            errorMessage = errorMessages.join(", ");
                        }
                    } else {
                        errorMessage =
                            errorData.message ||
                            "Invalid request. Please check your input and try again.";
                    }

                    } else if (error.response.status === 401) {
                        errorMessage = "Authentication failed. Please sign in again.";
                    } else if (error.response.status === 403) {
                        errorMessage = "You do not have permission to perform this action.";
                    } else if (error.response.status === 404) {
                        errorMessage = "The requested resource was not found.";
                    } else if (error.response.status === 422) {
                        if (errorData.errors) {
                        const errorMessages = Object.values(errorData.errors).flat();
                        errorMessage = errorMessages.join(", ");
                        } else {
                        errorMessage =
                            errorData.message || "Validation failed. Please check your input.";
                        }
                    } else if (error.response.status === 500) {
                        errorMessage = "Server error occurred. Please try again later.";
                    } else if (error.response.status >= 500) {
                        errorMessage =
                        "Service temporarily unavailable. Please try again later.";
                    }

                    throw new Error(errorMessage);

                } else if (error.request){
                    //Network error - no response received
                    throw new Error(
                        "Unable to connect to server. Please check your internet connection and try again."

                    );
                } else {
                    //Other errors
                    throw new Error(error.message || "An unexpected error occurred.");
                }

        }
};

//Http method helpers
export const api = {

    get: (endpoint, options ={}) =>
        apiCall(endpoint, {method: "GET", ...options}),
    post: (endpoint, body = null, options ={}) =>
        apiCall(endpoint, {method: "POST", body, ...options}),
    put: (endpoint, body = null, options ={}) =>
        apiCall(endpoint, {method: "PUT", body, ...options}),
    delete: (endpoint, options ={}) =>
        apiCall(endpoint, {method: "DELETE", ...options}),
    patch: (endpoint, body = null, options ={}) =>
        apiCall(endpoint, {method: "PATCH", body, ...options}),

};

//Auth-specific helpers
export const authApi = {
    //Api calls for authentication (login, register, etc..)
    post: (endpoint, body = null, options ={}) =>
        apiCall(endpoint, {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        }),
    
};

//Exporting the HttpClient for direct access if needed
export  {HttpClient};

export default api;












