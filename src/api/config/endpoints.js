export const EndPoints = {
  //Authentication EndPoints
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",
    PROFILE_IMAGE: "/auth/profile/image",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    SEND_VERIFICATION_OTP: "/auth/send-verification-otp",
    VERIFY_OTP: "/auth/verify-otp",


    //OTP endpoints for password reset
    OTP_SEND: "/auth/otp/send",
    OTP_VERIFY: "/auth/otp/verify",
    PASSWORD_UPDATE: "/auth/password/update",


    //Doctor EndPoints
    DOCTOR_REGISTER: "/doctors/register",
    DOCTOR_GET: "/doctors/get",
    DOCTOR_PROFILE:"/doctors/profile",


    //Agent endpoints
    AGENT_REGISTER: "/agent/register",
    AGENT_PROFILE: "/agent/profile",

    //client Doctor search endpoints 
   DOCTOR_SEARCH: "/client/doctor/search",
   DOCTOR_SLOTS: "/client/doctor/slots",
   DOCTOR_PUBLIC_PROFILE: "/client/doctor",



    //calender endpoints(Doctor)
    CALENDAR_SLOT_ADD: "/doctors/calender/slot/add",
    CALENDER_SLOTS_BY_MONTH: "/doctors/calender/slots/by-month",
    CALENDER_DOCTOR: "/doctors/calender",
    CALENDER_SLOT_UPDATE: "/doctors/calender/slot", //Used with /: slotId
    CALENDER_SLOT_DELETE: "/doctors/calender/slot/", //Used with /: slotId
    CALENDER_AVAILABLE_SLOTS: "/doctors/calender/slots",
    
    //Appointment endpoints
    BOOK_APPOINTMENT: "/booking/appointment",
    GET_USER_BOOKINGS: "/booking",
    CANCEL_BOOKINGS: "/booking/cancel",


    //User endpoints
    USER_PROFILE: "/user/profile",
};


    //Helper functions dynamic endpoint
    export const DoctorEndPoints = {
        getPublicProfile: (doctorId) => `${EndPoints.DOCTOR_PUBLIC_PROFILE}/${doctorId}`,
        updateSlot: (slotId) => `${EndPoints.CALENDER_SLOT_UPDATE}/${slotId}`,
        deleteSlot: (slotId) => `${EndPoints.CALENDER_SLOT_DELETE}/${slotId}`,

    };

    //Query Parameter builders

    export const QueryParams = {
      doctorSearch: (params = {}) => {
        const query = new URLSearchParams();
        if(params.name) query.append("name", params.name);
        if(params.specialization) query.append("specialization", params.specialization);

        return query.toString() ? `?${query.toString()}` : "";

      },

      doctorSlots: (doctorId) => `?doctorId=${doctorId}`,
      calenderByMonth: (month, year) => `?month=${month}&year=${year}`,

      doctorCalendar:(doctorId, date = null) => {
        const query = new URLSearchParams();
        query.append("doctorId", doctorId);
        if(date) query.append("date", date);
        return `?${query.toString()}`;
      },
       availableSlots: (doctorId, date) => `?doctorId=${doctorId}&date=${date}`,
    };
    
export default EndPoints;

