/**
 * Centralized Event Content Configuration
 * You can easily modify any texts, dates, speakers, and images here or via server/data/event.json
 */
export const defaultEventConfig = {
  hero: {
    invitationTag: "YOU'RE INVITED TO",
    titlePrefix: "SOLIDWORKS",
    titleHighlight: "Innovation Day 2026",
    tagline: "Smarter Design. Faster Innovation.",
    description: "Discover the latest **AI-powered SOLIDWORKS innovations** across design, manufacturing, simulation, and data management.",
    ctaText: "REGISTER NOW",
    heroImage: "/assets/robotic-arm.png"
  },
  info: {
    dates: "November 12, 2026",
    time: "09:00 AM – 02:00 PM",
    venueName: "Holiday Inn Cochin, an IHG Hotel",
    venueAddress: " A Junction, 33/1739, National Highway Bypass, Chakkaraparambu, Vennala, Kochi, Ernakulam, Keralam 682028",
    mode: "In-Person Event"
  },
  registrationForm: {
    title: "Register Now",
    subtitle: "Secure your spot for this exclusive event.",
    buttonText: "Register Now",
    roles: [
      "CEO/Director/MD",
      "Design Engineer",
      "CAD / Mechanical Engineer",
      "R&D Manager / Lead",
      "Engineering Director",
      "Manufacturing Specialist",
      "Academic / Student",
      "Other"
    ]
  },
  agenda: [
    {
      id: "ag-1",
      time: "09:00 AM – 10:00 AM",
      title: "Registration & Networking",
      icon: "user"
    },
    {
      id: "ag-2",
      time: "10:00 AM – 11:15 AM",
      title: "SOLIDWORKS 2027 & AI Innovations – What's New",
      icon: "monitor"
    },
    {
      id: "ag-3",
      time: "11:15 AM – 12:15 PM",
      title: "AI Virtual Companions & Simulation Applications",
      icon: "settings"
    },
    {
      id: "ag-4",
      time: "12:15 PM – 01:00 PM",
      title: "Interactive CAD, Q&A & Customer Success Stories",
      icon: "users"
    },
    {
      id: "ag-5",
      time: "01:00 PM – 02:00 PM",
      title: "Networking Lunch & Wrap-Up",
      icon: "utensils"
    }
  ],
   speakers: [
    {
      id: "sp-1",
      name: "Shanoob Kiliyamannil",
      designation: "Senior Solution Associate",
      photoUrl: "/people/Shanoob-Kiliyamannil.jpg"
    },
    {
      id: "sp-2",
      name: "Muhammed Shahin",
      designation: "Customer Success Specialist",
      photoUrl: "/people/Muhammed-Shahin.jpg"
    }
  ],
  venue: {
    name: "Holiday Inn Cochin, an IHG Hotel",
    address: "A Junction, 33/1739, National Highway Bypass, Chakkaraparambu, Vennala, Kochi, Ernakulam, Keralam 682028",
    directionsUrl: "https://maps.app.goo.gl/qM3s5tKe4sj4mSwo7",
    imageUrl: "https://digital.ihg.com/is/image/ihg/holiday-inn-kochi-10515432803-4x3"
  },
  highlights: [
    {
      id: "hl-1",
      title: "Latest Product Updates",
      icon: "calendar",
      description: "Get first-hand look at SOLIDWORKS 2026 features."
    },
    {
      id: "hl-2",
      title: "Live Demos & Real-World Use Cases",
      icon: "presentation",
      description: "Deep dive into real-world simulation and modeling."
    },
    {
      id: "hl-3",
      title: "Expert Networking",
      icon: "users",
      description: "Connect with 250+ top engineering professionals."
    },
    {
      id: "hl-4",
      title: "Exclusive Customer Stories",
      icon: "award",
      description: "Inspiring transformations from premier companies."
    }
  ],
  partners: {
    eventPartner: {
      name: "SolidCAM",
      tagline: "The Leaders in Integrated CAM",
      logo: "/uploads/SOLIDCAM White Logo-01.png"
    },
    ecosystemBrands: [
      { name: "SOLIDWORKS", logo: "/uploads/solidworks-logo.png" },
      { name: "3DEXPERIENCE", logo: "/uploads/3DEXPERIENCE Logo.png" },
      { name: "SIMULIA", logo: "/uploads/Simulia Abaqus logo.png" },
      { name: "CST Studio Suite", logo: "/uploads/JB_CST-Studio_LOGO.png" },
      { name: "SOLIDWORKS PDM", logo: "/uploads/SOLIDWORKS PDM Logo.png" },
      { name: "SOLIDWORKS Plastics", logo: "/uploads/SOLIDWORKS Plastics.png" },
      { name: "DriveWorks", logo: "/uploads/DriveWorks Logo-02.png" },
      { name: "BOM Creator", logo: "/uploads/BOM-Creator.png" }
    ]
  },
  branding: {
    companyName: "Conceptia KONNECT",
    companyTagline: "Your Trusted Digital Solutions Partner"
  }
};
