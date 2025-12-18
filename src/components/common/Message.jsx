import { useEffect } from "react";


const Message = ({
  isOpen,
  onClose,
  type = "info",
  title,
  message,
  showCloseButton = true,
  autoClose = true,
  autoCloseDelay = 5000,
  position = "top-right"

}) => {
    useEffect(() => {
     if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
     }
    }, [isOpen, autoClose, autoCloseDelay, onClose]);

 const getIconAndColors = () => {
    switch (type) {
        case "success":
            return {
                icon: (
                    <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                            >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                    />
                    </svg>
                ),
                bgColor: "bg-white",
                borderColor: "border-l-4 border-l-green-500",
                iconBg: "bg-green-500",
                iconColor: "text-white",
                titleColor: "text-green-600",
                messageColor: "text-gray-600",
            };
        case "error":
            return {
                icon: (
                    <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                ),
                    bgColor: "bg-white",
                    borderColor: "border-l-4 border-l-red-500",
                    iconBg: "bg-red-500",
                    iconColor: "text-white",
                    titleColor: "text-red-600",
                    messageColor: "text-gray-600",
            };
        case "warning":
            return {
                icon: (
                    <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01M5.063 4.636L12 2l6.937 2.636A2 2 0 0121 6.364V17.64a2 2 0 01-2.063 1.727L12 22l-6.937-2.636A2 2 0 014 17.64V6.364a2 2 0 011.063-1.727z"
                    />
                    </svg>
                ),
                    bgColor: "bg-white",
                    borderColor: "border-l-4 border-l-orange-500",
                    iconBg: "bg-orange-500",
                    iconColor: "text-white",
                    titleColor: "text-orange-600",
                    messageColor: "text-gray-600",
            };

        default:
            return {
                icon: (
                    <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    </svg>
                 ),
                    bgColor: "bg-white",
                    borderColor: "border-l-4 border-l-blue-500",
                    iconBg: "bg-blue-500",
                    iconColor: "text-white",
                    titleColor: "text-blue-600",
                    messageColor: "text-gray-600",
            };
    }
 };

 const getPositionClasses = () => {
    // Add mt-16 (or adjust as needed) to push below navbar
    switch (position) {
      case "top-left":
        return "top-4 left-4 mt-16";
      case "top-center":
        return "top-4 left-1/2 transform -translate-x-1/2 mt-16";
      case "top-right":
      default:
        return "top-4 right-4 mt-16";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-center":
        return "bottom-4 left-1/2 transform -translate-x-1/2";
      case "bottom-right":
        return "bottom-4 right-4";
    }
  };

  if(!isOpen) return null;

  const {
    icon,
    bgColor,
    borderColor,
    iconBg,
    iconColor,
    titleColor,
    messageColor,
  } = getIconAndColors();

 return (

    <div
      className={`fixed z-50 w-96 max-w-sm animate-slideInRight ${getPositionClasses()}`}
      style={{
        animation: isOpen
          ? "slideInRight 0.3s ease-out"
          : "slideOutRight 0.3s ease-in",
      }}
    >
      <div
        className={`${bgColor} ${borderColor} rounded-lg shadow-lg p-4 transition-all duration-300`}
      >
        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div
            className={`${iconBg} rounded-full p-1.5 flex-shrink-0 ${iconColor}`}
          >
            {icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className={`text-sm font-semibold ${titleColor} mb-1`}>
                {title}
              </h4>
            )}
            {message && (
              <div className={`text-sm ${messageColor} leading-relaxed`}>
                {message.includes("\n") ? (
                  // Handle multi-line messages
                  message.split("\n").map((line, index) => (
                    <div key={index} className="mb-1 last:mb-0">
                      {line}
                    </div>
                  ))
                ) : (
                  // Handle single-line messages
                  <p>{message}</p>
                )}
              </div>
            )}
          </div>

          {/* Close Button */}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="flex-shrink-0 ml-2 text-gray-400 transition-colors duration-200 hover:text-gray-600"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
        
        
 );
   
};

export default Message;