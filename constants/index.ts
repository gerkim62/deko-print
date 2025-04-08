const contacts = {
  emails: ["info@dekoprint.com", "support@dekoprint.com"],
  calls: ["+254 700 123456", "+254 733 789012"],
  whatsapp: ["+254 700 123456", "+254 733 789012"],
} as const;

const working_hours = {
  "Monday-Friday": "8:00 AM - 8:00 PM",
  "Saturday-Sunday": "8:00 AM - 8:00 PM",
} as const;

const location_details =
  "Baraton, next to the Market" as const;

  const location_county = "Nandi County" as const;

const socials = {
  facebook: "https://www.facebook.com/dekoprintke",
  instagram: "https://www.instagram.com/dekoprintke",
  twitter: "https://twitter.com/dekoprintke",
  linkedin: "https://www.linkedin.com/company/dekoprintke",
} as const;

const name = "Deko Print" as const;

export { contacts, working_hours, location_details, socials, name, location_county};
