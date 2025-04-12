import { formatDateTime } from "@/lib/format";
import React from "react";

const ForbiddenPage = () => {
  // Generate the current time on the server
  const currentTime = formatDateTime(new Date());

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-900 relative"
      style={{
        backgroundImage: "radial-gradient(circle, #222 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <div className="max-w-3xl bg-gray-800 bg-opacity-95 sm:rounded-lg p-10 shadow-xl relative overflow-hidden border border-gray-700">
        <div
          className="absolute -right-5 -top-10 text-red-600 text-opacity-10 transform rotate-12 z-0 font-mono"
          style={{ fontSize: "120px" }}
        >
          403
        </div>

        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-transparent"
            style={{
              background:
                "radial-gradient(circle, transparent 0%, transparent 50%, rgba(255, 51, 51, 0.1) 100%)",
            }}
          ></div>
        </div>

        <div className="relative z-10">
          <div className="w-20 h-20 mb-5 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-7h2v5h-2z" />
            </svg>
          </div>

          <h1 className="text-4xl text-red-600 uppercase tracking-wider mb-4 font-bold">
            Access Forbidden
          </h1>

          <p className="text-lg text-gray-200 mb-5">
            You don't have permission to access this resource. This area is
            restricted and requires higher level authorization credentials.
          </p>

          <p className="text-lg text-gray-200 mb-6">
            If you believe you should have access, please contact the system
            administrator or security team for assistance.
          </p>

          <div className="flex bg-gray-900 bg-opacity-70 p-4 rounded mb-8 border-l-4 border-red-600 items-start">
            <div className="text-red-600 mr-4 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 11h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
              </svg>
            </div>
            <div>
              <strong className="text-white">Security Alert:</strong>
              <span className="text-gray-300">
                {" "}
                Your access attempt has been logged. Multiple unauthorized
                access attempts will result in IP blocking.
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Return to Home
            </a>

            <a
              href="/#products-and-services"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Products & Services
            </a>

            <a
              href="/contact-us"
              className="text-gray-400 hover:text-red-600 border-b border-dotted border-gray-500 hover:border-red-600 transition-colors duration-300 ml-2"
            >
              Contact Support
            </a>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-gray-700 text-sm text-gray-500 text-center">
          Error Code: 403 Forbidden | Time: {currentTime}
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
