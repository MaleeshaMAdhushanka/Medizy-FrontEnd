import React, { useState } from "react";
import Message from "../common/Message";

const UnauthorizedUser = () => {
  const [toast, setToast] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  const handleSignOut = () => {
    setToast({
      isOpen: true,
      type: "info",
      title: "Clearing Session",
      message: "Clearing your session data and redirecting to sign in...",
    });

    setTimeout(() => {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/signin";
    }, 1500);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md p-8 text-center bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="mb-4 text-2xl font-bold text-red-600">
            Unauthorized User
          </h2>
          <p className="mb-6 leading-relaxed text-gray-600">
            Your account type is not authorized to access this application. Only
            DOCTOR, CLIENT, and AGENT accounts are permitted.
          </p>
          <button
            onClick={handleSignOut}
            className="px-6 py-3 font-medium text-white transition-all duration-300 rounded-lg bg-primary-blue hover:bg-primary-dark"
          >
            Sign In with Different Account
          </button>
        </div>
      </div>

      <Message
        isOpen={toast.isOpen}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        autoClose={true}
        autoCloseDelay={1000}
      />
    </>
  );
};

export default UnauthorizedUser;
