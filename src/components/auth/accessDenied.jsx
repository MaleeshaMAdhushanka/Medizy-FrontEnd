import React, { useState } from "react";
import Message from "../common/Message";

const AccessDenied = () => {
  const [toast, setToast] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  const handleGoBack = () => {
    setToast({
      isOpen: true,
      type: "info",
      title: "Navigating Back",
      message: "Taking you back to the previous page...",
    });

    setTimeout(() => {
      window.history.back();
    }, 1000);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md p-8 text-center bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full">
            <svg
              className="w-8 h-8 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
              />
            </svg>
          </div>
          <h2 className="mb-4 text-2xl font-bold text-orange-600">
            Access Denied
          </h2>
          <p className="mb-6 leading-relaxed text-gray-600">
            You don't have permission to access this page. Please contact your
            administrator if you believe this is an error.
          </p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 font-medium text-white transition-all duration-300 rounded-lg bg-primary-blue hover:bg-primary-dark"
          >
            Go Back
          </button>
        </div>
      </div>

      <Message
        isOpen={toast.isOpen}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        showCloseButton={true}
        autoClose={true}
        autoCloseDelay={2000}
        position="top-right"
      />
    </>
  );
};

export default AccessDenied;
