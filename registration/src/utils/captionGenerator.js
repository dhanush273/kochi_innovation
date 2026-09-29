/**
 * Generates personalized, engaging LinkedIn captions in present tense
 * with 4-5 relevant hashtags for SOLIDWORKS Innovation Day 2026.
 * Generates randomized/customizable variations so attendees don't share identical copy.
 */

export const CAPTION_TEMPLATES = [
  {
    id: 1,
    title: 'Innovation & Engineering Focus',
    generate: ({ fullName, designation, companyName }) => {
      const roleText = designation ? `As a ${designation}${companyName ? ` at ${companyName}` : ''}, it's` : "It's";
      return `I’m at SOLIDWORKS Innovation Day 2026, hosted by Conceptia Konnect!

A day focused on exploring the latest innovations in design and engineering, exchanging ideas, and connecting with the engineering community.
${roleText} inspiring to see the cutting-edge workflows shaping what’s next in product development.

#SOLIDWORKS #InnovationDay2026 #ConceptiaKonnect #EngineeringInnovation #3DCAD`;
    }
  },
  {
    id: 2,
    title: 'Industry & Professional Insights',
    generate: ({ fullName, designation, companyName }) => {
      const companyMention = companyName ? ` representing ${companyName}` : '';
      return `Great to be part of SOLIDWORKS Innovation Day 2026, hosted by Conceptia Konnect${companyMention}!

Exploring new possibilities in design and engineering while connecting with professionals from across the industry.
A high-energy day filled with valuable insights, practical ideas, and innovation.

#SOLIDWORKS #InnovationDay2026 #ConceptiaKonnect #Engineering #ProductDesign`;
    }
  },
  {
    id: 3,
    title: 'Future Tech & Digital Transformation',
    generate: ({ fullName, designation, companyName }) => {
      return `Experiencing SOLIDWORKS Innovation Day 2026 with Conceptia Konnect!

Discovering new ideas, AI-powered design technologies, and possibilities shaping the future of engineering.
An exciting day of hands-on learning, connecting with peers, and innovation in action.

#SOLIDWORKS #InnovationDay2026 #ConceptiaKonnect #EngineeringInnovation #DigitalEngineering`;
    }
  },
  {
    id: 4,
    title: 'Live Workflows & Community',
    generate: ({ fullName, designation, companyName }) => {
      const roleLine = designation
        ? `As a ${designation}${companyName ? ` at ${companyName}` : ''}, sessions packed with smarter design tools and real engineering use cases are pure gold.`
        : `Sessions packed with smarter design tools and real engineering use cases are pure gold.`;
      return `I’m here at SOLIDWORKS Innovation Day 2026, hosted by Conceptia Konnect!

${roleLine}
Here for the live demonstrations, the breakthrough ideas, and the vibrant engineering community.

#SOLIDWORKS #InnovationDay2026 #ConceptiaKonnect #ProductDevelopment #DesignEngineering`;
    }
  },
  {
    id: 5,
    title: 'Shaping What’s Next',
    generate: ({ fullName, designation, companyName }) => {
      return `Proud to say: I'm Part of What's Next at SOLIDWORKS Innovation Day 2026!

Hosted by Conceptia Konnect, today is all about the transformative power of modern CAD, simulation, and collaborative design.
Thrilled to be surrounded by forward-thinking engineers and industry leaders.

#SOLIDWORKS #InnovationDay2026 #ConceptiaKonnect #3DCAD #FutureOfEngineering`;
    }
  },
  {
    id: 6,
    title: 'Next-Gen CAD & Collaboration',
    generate: ({ fullName, designation, companyName }) => {
      const context = companyName ? ` with the team from ${companyName}` : '';
      return `Attending SOLIDWORKS Innovation Day 2026 today${context}, hosted by Conceptia Konnect!

Immersing in live demos of next-generation CAD capabilities, cloud collaboration, and smart manufacturing.
Looking forward to bringing these game-changing insights back to our engineering projects.

#SOLIDWORKS #InnovationDay2026 #ConceptiaKonnect #Engineering #DigitalManufacturing`;
    }
  }
];

export function getRandomCaption(userData, currentIndex = -1) {
  let nextIndex = Math.floor(Math.random() * CAPTION_TEMPLATES.length);
  if (currentIndex >= 0 && CAPTION_TEMPLATES.length > 1) {
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * CAPTION_TEMPLATES.length);
    }
  }
  const template = CAPTION_TEMPLATES[nextIndex];
  return {
    index: nextIndex,
    title: template.title,
    text: template.generate(userData)
  };
}

export function getCaptionByIndex(index, userData) {
  const safeIndex = (index % CAPTION_TEMPLATES.length + CAPTION_TEMPLATES.length) % CAPTION_TEMPLATES.length;
  const template = CAPTION_TEMPLATES[safeIndex];
  return {
    index: safeIndex,
    title: template.title,
    text: template.generate(userData)
  };
}
