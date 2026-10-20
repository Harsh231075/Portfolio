import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import type { PortfolioProject } from '@/Data/Project';

export default function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/70 transition-colors hover:border-teal-700">
      <Link href={`/portfolio/${project.id}`} className="relative block aspect-[3/2] overflow-hidden bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-teal-400">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transform-none"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="min-w-0 flex-1 text-[11px] font-medium uppercase tracking-wider break-words text-teal-300">{project.kind}</p>
          <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium ${project.archived ? 'border-amber-800/60 bg-amber-950/40 text-amber-200' : 'border-teal-800/60 bg-teal-950/40 text-teal-300'}`}>
            {project.archived ? `Outdated project · ${project.size}` : 'Latest project'}
          </span>
        </div>
        {project.archived && <p className="mb-3 text-xs leading-5 text-amber-200/80">Built around 1–1.5 years ago.</p>}
        <h3 className="font-serif text-2xl font-bold text-white">
          <Link href={`/portfolio/${project.id}`} className="rounded-sm hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-teal-400">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-6 text-gray-300">{project.description}</p>
        <ul aria-label={`${project.title} highlights`} className="mb-5 mt-4 flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <li key={tag} className="rounded-md border border-gray-700 bg-gray-800/70 px-2 py-1 text-[11px] leading-4 text-gray-300">{tag}</li>
          ))}
        </ul>
        {project.archived && <p className="mb-3 text-xs leading-5 text-gray-400">Original screenshots and source code available.</p>}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-gray-800 pt-4">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} live site (opens in a new tab)`} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-teal-400 px-3 text-xs font-semibold text-gray-950 transition-colors hover:bg-teal-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-400">
            Visit live site <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>}
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code on GitHub (opens in a new tab)`} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-gray-700 px-3 text-xs text-teal-300 hover:border-teal-400 focus-visible:outline-2 focus-visible:outline-teal-400"><Github aria-hidden="true" className="h-4 w-4" /> Source code</a>}
          <Link href={`/portfolio/${project.id}`} aria-label={`View ${project.title} project details`} className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-xs text-gray-300 hover:text-white focus-visible:outline-2 focus-visible:outline-teal-400">
            Details <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
