import legacyProjects from './LegacyProjects';

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'AI & Learning' | 'Travel' | 'Business' | 'Web Development';
  kind: string;
  description: string;
  overview: string;
  image: string;
  imageAlt: string;
  liveUrl?: string;
  archived?: boolean;
  size?: 'Major' | 'Mini';
  githubUrl?: string;
  images?: string[];
  techStack?: string[];
  longDescription?: string;
  videoUrl?: string;
  createdDate?: string;
  duration?: string;
  teamSize?: string;
  tags: string[];
  features: string[];
  featured: boolean;
}

const projects: PortfolioProject[] = [
  {
    id: 'trao-ai',
    title: 'Trao.ai',
    category: 'AI & Learning',
    kind: 'Interview preparation',
    description: 'AI-powered interview preparation built around a target company, job description, and personal study plan.',
    overview: 'Trao.ai presents a guided approach to interview preparation. Its five-stage workflow brings together company research, job requirement analysis, question generation, coverage review, and a structured study schedule. The public landing page introduces the product and links to the preparation workspace.',
    image: '/projects/current/trao-ai.webp',
    imageAlt: 'Trao.ai landing page with a blue hero and interview dashboard preview',
    liveUrl: 'https://client-two-pi-58.vercel.app/landing',
    tags: ['AI interview prep', 'Company research', 'Study planning'],
    features: [
      'Five-stage preparation pipeline from company research to study scheduling.',
      'Role-specific technical, system design, and behavioral question preparation.',
      'Job description analysis that separates essential and optional skills.',
      'Personalized study timelines and spaced flashcard practice.',
    ],
    featured: true,
  },
  {
    id: 'saarthi-andaman',
    title: 'Saarthi Andaman',
    category: 'Travel',
    kind: 'Travel & tourism website',
    description: 'An Andaman travel website for exploring holiday packages, island destinations, hotels, and activities.',
    overview: 'Saarthi Andaman helps travelers discover the Andaman Islands and plan their visit. Visitors can browse tour packages by trip type and price, explore island guides, find hotels and activities, and send a travel enquiry. Destination content, travel articles, reviews, and FAQs support the trip planning experience.',
    image: '/projects/current/saarthi-andaman.webp',
    imageAlt: 'Saarthi Andaman travel website showing its island holiday hero and tour packages',
    liveUrl: 'https://saarthiandaman.com/',
    tags: ['Tour packages', 'Destination guides', 'Travel enquiries'],
    features: [
      'Tour package browsing with trip categories and price filters.',
      'Island and sightseeing guides for Andaman destinations.',
      'Hotel, activity, and ferry information accessible from the navigation.',
      'Travel enquiries, WhatsApp contact, articles, reviews, and FAQs.',
    ],
    featured: false,
  },
  {
    id: 'asian-extrusions',
    title: 'Asian Extrusions',
    category: 'Business',
    kind: 'Manufacturing website',
    description: 'A corporate website showcasing aluminium extrusion products, manufacturing expertise, and quality standards.',
    overview: 'Asian Extrusions presents the company’s aluminium extrusion capabilities through a product-focused corporate website. It brings company information, product categories, quality practices, and contact channels into a clear browsing experience for prospective customers. The home page also displays a reference aluminium price.',
    image: '/projects/current/asian-extrusions.webp',
    imageAlt: 'Asian Extrusions website with aluminium profile photography and a blue corporate hero',
    liveUrl: 'https://www.asianextrusions.com/',
    tags: ['Product showcase', 'Manufacturing', 'Corporate website'],
    features: [
      'Dedicated company, products, quality, and contact pages.',
      'Manufacturing capabilities and custom extrusion information.',
      'Industry applications and environmental health and safety content.',
      'Aluminium reference price display and direct business contact links.',
    ],
    featured: false,
  },
  {
    id: 'itinova',
    title: 'Itinova',
    category: 'Travel',
    kind: 'Travel workflow product',
    description: 'A travel agency product for turning client enquiries into editable itineraries and branded quotations.',
    overview: 'Itinova introduces a connected workflow for travel agencies: start with a client enquiry, shape a day-wise itinerary, arrange hotels and services, set pricing, and prepare a branded quotation. The public site demonstrates the workflow and document previews, with a personal demo available through WhatsApp. Billing is shown as an illustrative preview.',
    image: '/projects/current/itinova.webp',
    imageAlt: 'Itinova landing page with a dark green design and a sample travel enquiry',
    liveUrl: 'https://itinova.tryouts.workers.dev/',
    tags: ['Itinerary planning', 'Travel quotations', 'Document previews'],
    features: [
      'Client enquiry entry with a sample travel request.',
      'Day-wise itinerary, hotel, service, and pricing workflow presentation.',
      'Branded quotation, confirmation, and logistics document previews.',
      'Billing preview and WhatsApp booking for a personal product demo.',
    ],
    featured: true,
  },
  {
    id: 'prashnivo',
    title: 'Prashnivo',
    category: 'AI & Learning',
    kind: 'AI teaching workspace',
    description: 'An AI teaching workspace concept for school papers, answer evaluation, and organized teaching resources.',
    overview: 'Prashnivo showcases a school-focused teaching workspace through interactive product previews. The site demonstrates school-formatted question papers, sample answer evaluation with teacher review, and a resource library for reusable teaching materials. Schools can explore the concept and request a personal walkthrough.',
    image: '/projects/current/prashnivo.webp',
    imageAlt: 'Prashnivo landing page showing a teacher workspace, sample paper, answer evaluation, and resource library',
    liveUrl: 'https://prashnivo-sigma.vercel.app/',
    tags: ['Question papers', 'Answer evaluation', 'Teaching resources'],
    features: [
      'Interactive teacher workspace with illustrative school content.',
      'Question paper preview organized by school, class, subject, and marks.',
      'Sample AI answer evaluation with marks, feedback, and teacher review.',
      'Teaching library preview and a school demo request flow.',
    ],
    featured: true,
  },
];

const legacyCards: Record<number, { image: string; description: string; category: PortfolioProject['category'] }> = {
  1: { image: '/projects/NextGen/p2.png', description: 'AI-powered personalized learning with study roadmaps, real-time assistance, and gamification.', category: 'AI & Learning' },
  2: { image: '/projects/SelfLearning/p1.png', description: 'A self-learning platform with AI study plans, quizzes, and progress tracking.', category: 'AI & Learning' },
  3: { image: '/projects/ecommerce/p4.png', description: 'A full-stack shopping platform with user and admin authentication and product management.', category: 'Business' },
  4: { image: '/projects/college/p5.png', description: 'A responsive college website showcasing courses, campus life, faculty, and admissions.', category: 'Web Development' },
  5: { image: '/code/p3.png', description: 'AI-assisted code reviews, improvement suggestions, and a typing test with certification.', category: 'AI & Learning' },
  6: { image: '/linkshort/p6.png', description: 'A URL shortener with authentication, click analytics, and personal link dashboards.', category: 'Web Development' },
};

const earlierProjects: PortfolioProject[] = [...legacyProjects]
  .sort((a, b) => a.id - b.id)
  .map(project => ({
    id: String(project.id),
    title: project.title,
    category: legacyCards[project.id].category,
    kind: project.category,
    description: legacyCards[project.id].description,
    overview: project.description,
    longDescription: project.longDescription,
    image: legacyCards[project.id].image,
    imageAlt: `${project.title} original project screenshot`,
    images: [...new Set(project.images)],
    tags: project.techStack.slice(0, 3),
    techStack: project.techStack,
    features: project.features,
    githubUrl: project.githubUrl,
    videoUrl: project.videoUrl,
    createdDate: project.createdDate.trim(),
    duration: project.duration,
    teamSize: project.teamSize,
    archived: true,
    size: project.id <= 3 ? 'Major' : 'Mini',
    featured: false,
  }));

export default [...projects, ...earlierProjects];
