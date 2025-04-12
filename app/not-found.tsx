import { formatDateTime } from "@/lib/format";
import React from "react";

const NotFoundPage = () => {
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
          className="absolute -right-5 -top-10 text-purple-600 text-opacity-10 transform rotate-12 z-0 font-mono"
          style={{ fontSize: "120px" }}
        >
          404
        </div>

        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-transparent"
            style={{
              background:
                "radial-gradient(circle, transparent 0%, transparent 50%, rgba(147, 51, 234, 0.1) 100%)",
            }}
          ></div>
        </div>

        <div className="relative z-10">
          <div className="w-20 h-20 mb-5 text-purple-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            </svg>
          </div>

          <h1 className="text-4xl text-purple-600 uppercase tracking-wider mb-4 font-bold">
            Page Not Found
          </h1>

          <p className="text-lg text-gray-200 mb-5">
            We couldn't find the page you were looking for. The page might have
            been removed, renamed, or is temporarily unavailable.
          </p>

          <p className="text-lg text-gray-200 mb-6">
            Please check the URL for any typing errors or use the navigation
            below to find what you're looking for.
          </p>

          <div className="flex bg-gray-900 bg-opacity-70 p-4 rounded mb-8 border-l-4 border-purple-600 items-start">
            <div className="text-purple-600 mr-4 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
              </svg>
            </div>
            <div>
              <strong className="text-white">Did You Know?</strong>
              <span className="text-gray-300">
                {" "}
                The 404 error code was named after a room 404 at CERN where the
                World Wide Web was developed.
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
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
              href="/contact"
              className="text-gray-400 hover:text-purple-600 border-b border-dotted border-gray-500 hover:border-purple-600 transition-colors duration-300 ml-2"
            >
              Contact Support
            </a>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-gray-700 text-sm text-gray-500 text-center">
          Error Code: 404 Not Found | Time: {currentTime}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
