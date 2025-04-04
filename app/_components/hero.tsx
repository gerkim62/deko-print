export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 md:py-20 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 md:w-64 h-32 md:h-64 rounded-full bg-white"></div>
        <div className="absolute bottom-10 right-20 w-20 md:w-40 h-20 md:h-40 rounded-full bg-blue-300"></div>
        <div className="absolute top-40 right-40 w-10 md:w-20 h-10 md:h-20 rounded-full bg-indigo-300"></div>
      </div>

      {/* Location Badge - Hidden on small screens, visible from medium screens up */}
      <div className="absolute top-6 right-6 hidden md:flex bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-bold items-center shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        Baraton, next to the market
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left w-full md:w-3/5 mb-8 md:mb-0">
            <div className="mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-yellow-300 mb-1">
                Deko Print
              </h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                All Your <span className="text-yellow-300">Needs</span>,
                <br className="hidden sm:block" />
                One Convenient Stop
              </h1>
            </div>
            <p className="text-lg md:text-xl max-w-xl mx-auto md:mx-0 mb-6 md:mb-8 text-blue-100">
              From printing services and device repairs to unique accessories
              and delicious snacks - we've got everything you need in one
              convenient location.
            </p>
            <div className="flex justify-center md:justify-start">
              <a
                href="#"
                className="bg-yellow-300 text-blue-900 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-200"
              >
                Get Started
              </a>
              <a
                href="#"
                className="ml-4 bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-800 transition duration-200"
              >
                Learn More
              </a>
            </div>

            {/* Location Info - More compact on mobile */}
            <div className="mt-6 md:mt-8 bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-lg flex flex-col sm:flex-row items-center justify-center md:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mb-2 sm:mb-0 sm:mr-3 text-yellow-300 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-1">
                <span className="whitespace-nowrap text-sm md:text-base font-medium">
                  Deko Print
                </span>
                <span className="whitespace-nowrap text-sm md:text-base font-medium">
                  • Baraton, next to the market
                </span>
                <span className="whitespace-nowrap text-sm md:text-base font-medium">
                  <span className="hidden sm:inline"> •</span> Open 8AM - 8PM
                  daily
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/5 mt-4 md:mt-0">
            <div className="relative bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-2xl">
              <div className="grid grid-cols-2 gap-3 md:gap-5">
                <div
                  className="bg-blue-500/50 p-3 md:p-5 rounded-lg text-center select-none animate-fade-in hover:bg-blue-500/40 transition-colors duration-300"
                  style={{ animationDelay: "0.1s" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 md:mb-3 animate-pulse"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 17h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2" />
                    <rect x="7" y="12" width="10" height="8" rx="1" />
                  </svg>
                  <span className="text-sm md:text-base font-medium">
                    Printing
                  </span>
                </div>
                <div
                  className="bg-indigo-500/50 p-3 md:p-5 rounded-lg text-center select-none animate-fade-in hover:bg-indigo-500/40 transition-colors duration-300"
                  style={{ animationDelay: "0.2s" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 md:mb-3 animate-pulse"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span className="text-sm md:text-base font-medium">
                    Repairs
                  </span>
                </div>
                <div
                  className="bg-purple-500/50 p-3 md:p-5 rounded-lg text-center select-none animate-fade-in hover:bg-purple-500/40 transition-colors duration-300"
                  style={{ animationDelay: "0.3s" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 md:mb-3 animate-pulse"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <span className="text-sm md:text-base font-medium">Shop</span>
                </div>
                <div
                  className="bg-blue-600/50 p-3 md:p-5 rounded-lg text-center select-none animate-fade-in hover:bg-blue-600/40 transition-colors duration-300"
                  style={{ animationDelay: "0.4s" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 md:mb-3 animate-pulse"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                    <line x1="6" y1="1" x2="6" y2="4" />
                    <line x1="10" y1="1" x2="10" y2="4" />
                    <line x1="14" y1="1" x2="14" y2="4" />
                  </svg>
                  <span className="text-sm md:text-base font-medium">
                    Snacks
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
