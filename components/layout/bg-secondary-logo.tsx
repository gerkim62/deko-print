import Image from "next/image";
import React from "react";

export default function BgSecondaryLogo() {
  return (
    <>
      {/* Secondary Logo as background elements - positioned at multiple places */}
      <div className="absolute top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2 opacity-30 rotate-12">
        <Image
          src="/secondary-logo.png"
          alt="Deko Print Secondary Logo"
          width={200}
          height={200}
          className="select-none pointer-events-none"
        />
      </div>
      <div className="absolute bottom-1/4 right-1/3 transform translate-x-1/2 translate-y-1/2 opacity-20 -rotate-6">
        <Image
          src="/secondary-logo.png"
          alt="Deko Print Secondary Logo"
          width={150}
          height={150}
          className="select-none pointer-events-none"
        />
      </div>
      <div className="absolute top-3/4 left-2/3 transform -translate-x-1/2 -translate-y-1/2 opacity-25 rotate-45">
        <Image
          src="/secondary-logo.png"
          alt="Deko Print Secondary Logo"
          width={180}
          height={180}
          className="select-none pointer-events-none"
        />
      </div>
      <div className="absolute top-1/2 right-1/4 transform translate-x-1/4 -translate-y-1/4 opacity-15 -rotate-20">
        <Image
          src="/secondary-logo.png"
          alt="Deko Print Secondary Logo"
          width={120}
          height={120}
          className="select-none pointer-events-none"
        />
      </div>
    </>
  );
}
