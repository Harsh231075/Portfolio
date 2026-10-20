import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import projects from '@/Data/Project';
import ProjectCard from '@/components/ProjectCard';

const topProjects = ['saarthi-andaman', 'trao-ai', '1'].flatMap(id => {
  const project = projects.find(project => project.id === id);
  return project ? [project] : [];
});

export default function Project() {
  return (
    <section aria-labelledby="projects-heading" className="bg-black px-4 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-teal-300">Selected work</p>
            <h2 id="projects-heading" className="font-serif text-3xl font-bold text-white sm:text-4xl">Top projects</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400">Three highlights from my work in travel, AI, and personalized learning. Explore the full gallery for all my projects.</p>
          </div>
          <Link href="/portfolio" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-gray-700 px-4 text-sm text-teal-300 transition-colors hover:border-teal-400 focus-visible:outline-2 focus-visible:outline-teal-400">
            All {projects.length} projects <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topProjects.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  );
}
