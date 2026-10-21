import { ChevronDown } from 'lucide-react';

const experiences = [
  {
    company: 'SidLabs',
    location: 'Remote / India',
    role: 'Full Stack Developer',
    type: 'Full-time',
    dates: 'Jan 2026 · Last day scheduled: 1 Nov 2026',
    current: true,
    summary: 'Scalable web applications, AI integration, and end-to-end deployment.',
    highlights: [
      'Building scalable web applications using the MERN / Next.js stack.',
      'Building AI-integrated systems with scalable architecture and handling end-to-end deployment.',
    ],
    technologies: [
      'React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript',
      'MERN Stack', 'AI Integration', 'Scalable Architecture', 'End-to-End Deployment',
    ],
  },
  {
    company: 'MyMooment',
    location: 'Hyderabad / Remote',
    role: 'Full Stack Developer',
    type: 'Part-time / Contract',
    dates: 'Nov 2025 – 10 Feb (end year unconfirmed)',
    current: false,
    summary: 'Full-stack product features, API integrations, and authentication.',
    highlights: [
      'Built scalable full-stack features using MERN / Next.js, optimized for performance and user experience.',
      'Worked with product and design teams to turn business requirements into efficient solutions.',
      'Handled API integrations, authentication flows, and deployment pipelines.',
    ],
    technologies: [
      'React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript',
      'API Integration', 'Authentication', 'Deployment Pipelines',
    ],
  },
  {
    company: 'Daphnis Labs',
    location: 'Remote / New Delhi',
    role: 'Full Stack Developer Intern',
    type: 'Internship',
    dates: 'July 28, 2025 – Nov 2025',
    current: false,
    summary: 'MERN / Next.js development and client requirement implementation.',
    highlights: [
      'Worked under a Tech Lead to build scalable solutions using the MERN / Next.js stack.',
      'Coordinated with client teams for real-time requirement gathering and implementation.',
    ],
    technologies: [
      'MongoDB', 'Express.js', 'React.js', 'Next.js', 'Node.js', 'JavaScript',
      'MERN Stack', 'Client Coordination',
    ],
  },
  {
    company: 'iLegalLearn',
    location: 'Mumbai / Remote',
    role: 'Software Engineer Intern',
    type: 'Internship',
    dates: 'Sep 2025 – Nov 2025',
    current: false,
    summary: 'Legal-tech platforms, user dashboards, and data-driven features.',
    highlights: [
      'Built backend and frontend modules for legal-tech platforms using Node.js, Express, MongoDB, and React.',
      'Integrated authentication, user dashboards, and data-driven components.',
      'Collaborated in an agile team, delivering features with proper documentation.',
    ],
    technologies: [
      'Node.js', 'Express.js', 'MongoDB', 'React.js', 'JavaScript',
      'Authentication', 'Agile Development', 'Documentation',
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section aria-labelledby="experience-heading" className="bg-black px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-800 bg-gray-900/80 p-4 sm:p-6">
        <header className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 pb-4">
          <h2 id="experience-heading" className="font-serif text-2xl font-bold text-teal-400 sm:text-3xl">
            Professional Experience
          </h2>
          <span className="text-xs text-gray-400">{experiences.length} roles</span>
        </header>

        <div className="grid items-start gap-3 md:grid-cols-2">
          {experiences.map((experience) => (
            <details
              key={experience.company}
              className={`group min-w-0 scroll-mb-28 overflow-hidden rounded-xl border transition-colors open:border-teal-700/70 ${
                experience.current
                  ? 'border-teal-800/70 bg-teal-950/20'
                  : 'border-gray-800 bg-gray-950/30'
              }`}
            >
              <summary className="cursor-pointer list-none rounded-xl p-4 transition-colors hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-teal-400 [&::-webkit-details-marker]:hidden">
                <span className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-base font-semibold text-white">{experience.company}</span>
                  {experience.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-400/10 px-2 py-0.5 text-[10px] font-medium text-teal-300">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Current
                    </span>
                  )}
                  <span className="text-[11px] leading-5 text-gray-400">{experience.dates}</span>
                </span>
                <span className="block text-sm font-medium leading-5 text-gray-100">{experience.role}</span>
                <span className="mt-1 block text-[11px] leading-5 text-gray-400">
                  {experience.type} · {experience.location}
                </span>
                <span className="mt-2 block text-xs leading-5 text-gray-300">{experience.summary}</span>
                <span className="mt-3 flex min-h-6 items-center justify-between text-xs font-medium text-teal-300">
                  <span className="group-open:hidden">View details</span>
                  <span className="hidden group-open:inline">Hide details</span>
                  <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
                </span>
              </summary>

              <div className="mx-4 border-t border-gray-800 pb-4 pt-3">
                <ul className="list-disc space-y-2 pl-4 text-xs leading-5 text-gray-300 marker:text-teal-400">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <h3 className="mb-2 mt-4 text-xs font-semibold text-gray-200">Technologies & skills</h3>
                <ul aria-label={`${experience.company} technologies and skills`} className="flex flex-wrap gap-1.5">
                  {experience.technologies.map((technology) => (
                    <li key={technology} className="rounded-md border border-gray-700/70 bg-gray-800/70 px-2 py-1 text-[11px] leading-4 text-teal-200">
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
