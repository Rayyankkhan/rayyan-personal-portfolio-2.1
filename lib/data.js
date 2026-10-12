// ─────────────────────────────────────────────────────────────
//  ALL SITE CONTENT LIVES HERE. Edit this file, not the components.
//  Items marked  TODO  are placeholders you should verify/replace.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Rayyan Ahmed',
  initials: 'RA',
  role: 'MERN Stack & Front-End Developer',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-portfolio.vercel.app',
  email: process.env.NEXT_PUBLIC_EMAIL || 'you@example.com', // TODO set NEXT_PUBLIC_EMAIL
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID || '',
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || '',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '',
  resumeUrl: '/Rayyan-Ahmed-CV.pdf', // TODO put your CV in /public with this name (or set to '')
  availability: 'Available for new projects',
  timezone: '', // optional: e.g. 'Asia/Karachi' shows your live local time in the footer; leave '' to hide it
  description:
    'Rayyan Ahmed is a MERN stack and front-end developer building fast, modern, conversion-focused web apps with React, Next.js, Node.js and MongoDB.',
  links: {
    github: 'https://github.com/Rayyankkhan',
    linkedin: 'https://www.linkedin.com/in/rayyanahmedkhan247/',
    fiverr: 'https://www.fiverr.com/rayyan42',
  },
};

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  roles: ['MERN Stack Developer', 'React & Next.js Developer', 'Front-End Engineer'],
  headline: 'I build fast, modern web apps that turn visitors into customers.',
  intro:
    'From polished React interfaces to robust Node.js APIs, I design and ship complete products with clean code, smooth animations and performance you can measure.',
};

// Only claim numbers you can defend. Edit freely.
export const stats = [
  { value: new Date().getFullYear() - 2022, suffix: '+', label: 'Years building for the web' }, // TODO: started 2022 per your timeline
  { value: 12, suffix: '+', label: 'Client websites delivered' }, // TODO verify: matches the 12 work items
  { value: 2, suffix: '', label: 'Companies worked with' },
  { value: 100, suffix: '%', label: 'Responsive, mobile-first builds' },
];

export const techMarquee = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express', 'MongoDB',
  'Tailwind CSS', 'Framer Motion', 'REST APIs', 'Git & GitHub', 'Vercel',
];

export const about = {
  title: 'A developer who cares about both the code and the customer.',
  paragraphs: [
    'I am a MERN stack developer who creates dynamic, responsive web applications with seamless user experiences, robust backend solutions and efficient, modern design.',
    'I have worked on production React interfaces and full-stack MERN apps, and I take projects from idea to deployment: planning, UI, APIs, database, and launch on Vercel.',
  ],
};

export const skills = [
  { group: 'Front-end', items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
  { group: 'Back-end', items: ['Node.js', 'Express.js', 'REST API design', 'Authentication (JWT)', 'API integration'] }, // TODO remove any you do not use
  { group: 'Database', items: ['MongoDB', 'Mongoose'] },
  { group: 'Tools & Delivery', items: ['Git & GitHub', 'Vercel', 'Responsive design', 'SEO basics', 'Performance tuning'] },
];

export const experience = [
  {
    role: 'MERN Stack Developer',
    org: 'Code-x-Nebula',
    period: '2023 – 2024',
    points: ['Built full-stack features with MongoDB, Express, React and Node.js.'], // TODO add 2-3 concrete achievements
  },
  {
    role: 'React.js Developer',
    org: 'NFTCIPHER',
    period: '2022 – 2023',
    points: ['Developed responsive React interfaces.'], // TODO add concrete achievements
  },
  // Uncomment if still true:
  // { role: 'Freelance Developer', org: 'Fiverr / Upwork', period: '2022 – Present', points: ['Delivered websites and web apps for international clients.'] },
];

export const education = [
  { title: 'Bachelor of Science in Computer Science', org: 'EIMS', period: '2024' },
  { title: 'Front-End Web Development Bootcamp', org: 'Udemy', period: '2022' },
];

export const services = [
  { icon: 'react', title: 'Front-End Development', desc: 'High-performance, accessible interfaces in React and Next.js, built mobile-first and animated with purpose.' },
  { icon: 'node', title: 'Back-End Development', desc: 'Secure, scalable Node.js and Express APIs with clean architecture and clear documentation.' },
  { icon: 'stack', title: 'MERN Stack Apps', desc: 'End-to-end web applications with MongoDB, Express, React and Node.js, from database design to deployment.' },
  { icon: 'api', title: 'API Integration', desc: 'Connect payments, CRMs, maps, auth and third-party services to your product reliably.' },
  { icon: 'bug', title: 'Bug Fixing & Optimisation', desc: 'Troubleshooting, refactoring and Core Web Vitals tuning so your site runs smoothly and loads fast.' },
  { icon: 'rocket', title: 'Deployment & Launch', desc: 'Vercel deployments, environment setup, domains and SEO fundamentals so you launch with confidence.' },
];

export const processSteps = [
  { step: '01', title: 'Discover', desc: 'We align on goals, audience, scope and timeline before any code is written.' },
  { step: '02', title: 'Design', desc: 'Structure, wireframes and UI direction you approve early, so there are no surprises.' },
  { step: '03', title: 'Build', desc: 'Clean, tested, responsive code with regular previews you can click through.' },
  { step: '04', title: 'Launch & Support', desc: 'Deployment, performance checks, handover and post-launch support.' },
];

// TODO for every project: edit `role`, `stack`, `desc` so it matches what YOU actually built.
// `image` files are your existing /public/portfolio/*.png (compress them to WebP when you can).
export const projects = [
  { title: 'Brooklinen', category: 'E-commerce', image: '/portfolio/Brooklinen.png', link: 'https://www.brooklinen.com/', role: 'Front-end development', stack: ['React', 'Next.js', 'Tailwind CSS'], desc: 'Home-goods storefront interface with clean product browsing.', featured: true },
  { title: 'Plum Guide', category: 'Travel', image: '/portfolio/plum guide.png', link: 'https://www.plumguide.com/', role: 'Front-end development', stack: ['React', 'Next.js', 'Tailwind CSS'], desc: 'Curated stays platform interface focused on search and listings.', featured: true },
  { title: 'Hotel Tonight', category: 'Travel', image: '/portfolio/Hotel tonight.png', link: 'https://www.hoteltonight.com/', role: 'Front-end development', stack: ['React', 'Tailwind CSS'], desc: 'Last-minute hotel booking interface.', featured: true },
  { title: 'mmanew', category: 'Web App', image: '/portfolio/mmanew (1).png', link: 'https://mmanew.vercel.app/', role: 'Design & development', stack: ['Next.js', 'Tailwind CSS', 'Vercel'], desc: 'Self-built web project deployed on Vercel.', featured: true },
  { title: 'Divvy Homes', category: 'Business', image: '/portfolio/Divvy.png', link: 'https://www.divvyhomes.com/', role: 'Front-end development', stack: ['React', 'Tailwind CSS'], desc: 'Rent-to-own home platform marketing site.', featured: true },
  { title: 'Pergola Rooms', category: 'Business', image: '/portfolio/Pergolas (1).png', link: 'https://www.pergolarooms.ae/', role: 'Front-end development', stack: ['React', 'Tailwind CSS'], desc: 'Service business website with lead-focused layout.', featured: true },
  { title: 'Atoms', category: 'E-commerce', image: '/portfolio/atoms.png', link: 'https://atoms.com/', role: 'Front-end development', stack: ['React', 'Tailwind CSS'], desc: 'Footwear brand storefront interface.' },
  { title: 'Drink Trade', category: 'E-commerce', image: '/portfolio/Coffe Trade.png', link: 'https://www.drinktrade.com/', role: 'Front-end development', stack: ['React', 'Tailwind CSS'], desc: 'Coffee subscription storefront interface.' },
  { title: 'Outdoor Voices', category: 'E-commerce', image: '/portfolio/Outdoor Voice.png', link: 'https://www.outdoorvoices.com/', role: 'Front-end development', stack: ['React', 'Tailwind CSS'], desc: 'Activewear brand storefront interface.' },
  { title: 'FBA Xperts', category: 'Business', image: '/portfolio/Laurel spring (1).png', link: 'https://fbaxperts.com', role: 'Front-end development', stack: ['React', 'Tailwind CSS'], desc: 'Service business website.' }, // TODO: screenshot file is named "Laurel spring" — confirm the right image
  { title: 'The Logo Alchemy', category: 'Business', image: '/portfolio/Logo alchemy (1).png', link: 'https://www.thelogoalchemy.com', role: 'Front-end development', stack: ['React', 'Tailwind CSS'], desc: 'Branding and logo design agency website.' },
  { title: 'Techno Rivals', category: 'Web App', image: '/portfolio/Tecno Rivals.png', link: 'https://techno-rivals.com', role: 'Front-end development', stack: ['React', 'Tailwind CSS'], desc: 'Tech-focused content website.' },
];

// Keep EMPTY until you have real client quotes (name + company, ideally a link).
// The section hides itself when this array is empty.
export const testimonials = [
  // { name: 'Client Name', role: 'Founder, Company', quote: 'Real quote here.', link: 'https://linkedin.com/in/...' },
];
