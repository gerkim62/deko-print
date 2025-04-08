import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import {
  location_details,
  name,
  contacts,
  working_hours,
  location_county,
} from "@/constants";

export default function ContactUs() {
  return (
    <section className="relative bg-primary text-primary-foreground py-16 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 md:w-64 h-32 md:h-64 rounded-full bg-background"></div>
        <div className="absolute bottom-10 right-20 w-20 md:w-40 h-20 md:h-40 rounded-full bg-secondary"></div>
        <div className="absolute top-40 right-40 w-10 md:w-20 h-10 md:h-20 rounded-full bg-muted"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-accent mb-1">
            {name}
          </h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            Contact Us
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Have questions or need our services?
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Location Card */}
            <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground rounded-lg shadow-xl p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <MapPin className="h-6 w-6 mr-3 text-accent" />
                Our Location
              </h3>

              <div className="mb-6">
                <p className="text-lg mb-2">{name}</p>
                <p className="text-primary-foreground/80">{location_details}</p>
                <p className="text-primary-foreground/80">{location_county}</p>
              </div>

              <div className="bg-primary-foreground/10 backdrop-blur-sm p-4 rounded-lg">
                <h4 className="font-semibold text-accent mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Business Hours
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(working_hours).map(([days, hours]) => (
                    <div key={days}>
                      <p className="text-sm text-primary-foreground/80">
                        {days.replace("-", " - ")}
                      </p>
                      <p className="font-medium">{hours}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Details Card */}
            <div className="bg-background text-foreground rounded-lg shadow-xl p-6 md:p-8 border border-border">
              <h3 className="text-2xl font-bold mb-6">Contact Details</h3>

              <div className="space-y-6">
                {contacts.calls.length > 0 && (
                  <div className="flex items-start">
                    <div className="bg-accent p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Phone</h4>
                      {contacts.calls.map((phone, index) => (
                        <p key={`call-${index}`} className="text-foreground/80">
                          {phone}
                        </p>
                      ))}
                      <p className="text-sm text-muted-foreground mt-1">
                        Available for calls and SMS
                      </p>
                    </div>
                  </div>
                )}

                {contacts.whatsapp.length > 0 && (
                  <div className="flex items-start">
                    <div className="bg-accent p-3 rounded-full mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-accent-foreground"
                      >
                        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                        <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                        <path d="M12 17a5 5 0 0 0 5-5v-1a5 5 0 0 0-10 0v1a5 5 0 0 0 5 5Z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">WhatsApp</h4>
                      {contacts.whatsapp.map((whatsapp, index) => (
                        <p
                          key={`whatsapp-${index}`}
                          className="text-foreground/80"
                        >
                          {whatsapp}
                        </p>
                      ))}
                      <p className="text-sm text-muted-foreground mt-1">
                        Message us anytime
                      </p>
                    </div>
                  </div>
                )}

                {contacts.emails.length > 0 && (
                  <div className="flex items-start">
                    <div className="bg-accent p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Email</h4>
                      {contacts.emails.map((email, index) => (
                        <p
                          key={`email-${index}`}
                          className="text-foreground/80"
                        >
                          {email}
                        </p>
                      ))}
                      <p className="text-sm text-muted-foreground mt-1">
                        We'll respond as soon as possible
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-10 text-center bg-background text-foreground rounded-lg shadow-xl p-6 md:p-8 border border-border">
            <h3 className="text-2xl font-bold mb-4">Ready to Connect?</h3>
            <p className="text-foreground/80 mb-6">
              Reach out through any of our contact channels above or visit us at
              our location.
            </p>
            <a
              href={`tel:${contacts.calls[0].replace(/\s/g, "")}`}
              className="inline-block bg-accent text-accent-foreground font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-accent/90 transition duration-200"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
