import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

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
            Deko Print
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
                <p className="text-lg mb-2">Deko Print</p>
                <p className="text-primary-foreground/80">
                  Baraton, next to the Baraton Market
                </p>
                <p className="text-primary-foreground/80">
                  Nandi County, Kenya
                </p>
              </div>

              <div className="bg-primary-foreground/10 backdrop-blur-sm p-4 rounded-lg">
                <h4 className="font-semibold text-accent mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Business Hours
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-primary-foreground/80">
                      Monday - Friday
                    </p>
                    <p className="font-medium">8:00 AM - 8:00 PM</p>
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/80">
                      Saturday - Sunday
                    </p>
                    <p className="font-medium">8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details Card */}
            <div className="bg-background text-foreground rounded-lg shadow-xl p-6 md:p-8 border border-border">
              <h3 className="text-2xl font-bold mb-6">Contact Details</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-accent p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">
                      Phone / WhatsApp
                    </h4>
                    <p className="text-foreground/80">+254 700 123456</p>
                    <p className="text-foreground/80">+254 733 789012</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Available for calls and SMS
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-accent p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Email</h4>
                    <p className="text-foreground/80">info@dekoprint.co.ke</p>
                    <p className="text-foreground/80">
                      support@dekoprint.co.ke
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      We'll respond as soon as possible
                    </p>
                  </div>
                </div>
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
              href="tel:+254700123456"
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
