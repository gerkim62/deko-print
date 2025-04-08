const contacts = {
  emails: [],
  whatsapp: ["+2547 98 799 577"],
  calls: ["+2547 94 005 675"],
} as const;

const working_hours = {
  "Monday - Sunday": "8:00 AM - 10:00 PM",
  "Online Deliveries": "Available 24/7",
} as const;

const location_details = "Baraton, next to the Market" as const;

const location_county = "Nandi County" as const;

const socials = {
  facebook: "",
  instagram: "",
  twitter: "",
  linkedin: "",
} as const;

const name = "Deko Print" as const;

export {
  contacts,
  working_hours,
  location_details,
  socials,
  name,
  location_county,
};
