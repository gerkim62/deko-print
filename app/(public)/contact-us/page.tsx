import React from "react";

export default function ContactUs() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-2">
            Contact Us
          </h1>
          <p className="text-lg text-blue-700/80 max-w-2xl mx-auto">
            Have questions or need our services?
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Location Card */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg shadow-xl p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3 text-yellow-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Our Location
              </h3>

              <div className="mb-6">
                <p className="text-lg mb-2">Deko Print</p>
                <p className="text-blue-100">
                  Baraton, next to the Baraton Market
                </p>
                <p className="text-blue-100">Nandi County, Kenya</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-300 mb-2">
                  Business Hours
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-blue-100">Monday - Friday</p>
                    <p className="font-medium">8:00 AM - 8:00 PM</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">Saturday - Sunday</p>
                    <p className="font-medium">8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details Card */}
            <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">
                Contact Details
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-yellow-400 p-3 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-900"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900 mb-1">
                      Phone / WhatsApp
                    </h4>
                    <p className="text-blue-700">+254 700 123456</p>
                    <p className="text-blue-700">+254 733 789012</p>
                    <p className="text-sm text-blue-600 mt-1">
                      Available for calls and SMS
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-yellow-400 p-3 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-900"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900 mb-1">
                      Email
                    </h4>
                    <p className="text-blue-700">info@dekoprint.co.ke</p>
                    <p className="text-blue-700">support@dekoprint.co.ke</p>
                    <p className="text-sm text-blue-600 mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-10 text-center bg-white rounded-lg shadow-xl p-6 md:p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Ready to Connect?
            </h3>
            <p className="text-blue-700 mb-6">
              Reach out through any of our contact channels above or visit us at
              our location.
            </p>
            <a
              href="tel:+254700123456"
              className="inline-block bg-yellow-400 text-blue-900 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-200"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
