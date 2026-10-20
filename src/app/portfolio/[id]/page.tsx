import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Check, Github } from 'lucide-react';
import type { Metadata } from 'next';
import projects from '@/Data/Project';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find(project => project.id === id);
  return project ? { title: `${project.title} | Harsh Singh Baghel`, description: project.description } : { title: 'Project not found' };
}

export function generateStaticParams() {
  return projects.map(project => ({ id: project.id }));
}

export default async function ProjectDetailsPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find(project => project.id === id);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white sm:px-8 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/portfolio" className="mb-8 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm text-gray-300 hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-teal-400">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> All projects
        </Link>
        <header className="mb-7 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className={`mb-3 w-fit rounded-full border px-3 py-1 text-xs font-medium ${project.archived ? 'border-amber-800/60 bg-amber-950/40 text-amber-200' : 'border-teal-800/60 bg-teal-950/40 text-teal-300'}`}>
              {project.archived ? `Outdated project · ${project.size}` : 'Latest project'}
            </p>
            {project.archived && <p className="mb-3 text-sm text-amber-200/80">Built around 1–1.5 years ago.</p>}
            <p className="mb-3 text-xs uppercase tracking-widest text-teal-300">{project.kind}</p>
            <h1 className="font-serif text-4xl font-bold sm:text-5xl">{project.title}</h1>
            <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base">{project.description}</p>
          </div>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-teal-400 px-5 text-sm font-semibold text-gray-950 hover:bg-teal-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-400">
            Visit live site <ArrowUpRight aria-hidden="true" className="h-4 w-4" /><span className="sr-only"> (opens in a new tab)</span>
          </a>}
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-gray-700 px-5 text-sm text-teal-300 hover:border-teal-400 focus-visible:outline-2 focus-visible:outline-teal-400"><Github aria-hidden="true" className="h-4 w-4" /> Source code<span className="sr-only"> (opens in a new tab)</span></a>}
        </header>
        <figure className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
          <a href={project.image} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size ${project.title} screenshot in a new tab`} className="block focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-teal-400">
            <Image src={project.image} alt={project.imageAlt} width={1440} height={960} priority sizes="(max-width: 1024px) 100vw, 1024px" className="h-auto w-full" />
          </a>
          <figcaption className="px-4 py-3 text-xs leading-5 text-gray-400">{project.archived ? 'Original project screenshot' : 'Live website screenshot'} · Select the image to view full size.</figcaption>
        </figure>
        {project.images && project.images.length > 0 && (
          <details className="mt-4 rounded-xl border border-gray-800 bg-gray-900/50 p-4">
            <summary className="cursor-pointer text-sm text-teal-300 focus-visible:outline-2 focus-visible:outline-teal-400">More project screenshots ({project.images.length})</summary>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {project.images.map((image, index) => (
                <a key={image} href={image} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} screenshot ${index + 1} in a new tab`} className="overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-teal-400">
                  <Image src={image} alt={`${project.title} screenshot ${index + 1}`} width={800} height={500} sizes="(max-width: 640px) 100vw, 50vw" className="h-auto w-full" />
                </a>
              ))}
            </div>
          </details>
        )}
        <div className="mt-8 grid gap-8 md:grid-cols-[1.5fr_1fr]">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="mb-3 font-serif text-2xl font-bold">About the project</h2>
            <p className="text-sm leading-7 text-gray-300">{project.overview}</p>
            {project.longDescription && <p className="mt-4 text-sm leading-7 text-gray-400">{project.longDescription}</p>}
            <h2 className="mb-4 mt-7 font-serif text-2xl font-bold">Project highlights</h2>
            <ul className="space-y-3">
              {project.features.map(feature => (
                <li key={feature} className="flex gap-3 text-sm leading-6 text-gray-300"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-teal-400" />{feature}</li>
              ))}
            </ul>
          </section>
          <aside aria-label="Project information" className="h-fit min-w-0 rounded-2xl border border-gray-800 bg-gray-900/70 p-5">
            <h2 className="mb-4 font-serif text-xl font-bold">At a glance</h2>
            <dl className="space-y-4 text-sm">
              <div><dt className="mb-1 text-xs text-gray-400">Category</dt><dd>{project.category}</dd></div>
              <div><dt className="mb-1 text-xs text-gray-400">Project status</dt><dd className={project.archived ? 'text-amber-200' : 'text-teal-300'}>{project.archived ? 'Outdated project · Built around 1–1.5 years ago' : 'Latest project'}</dd></div>
              {project.size && <div><dt className="mb-1 text-xs text-gray-400">Project type</dt><dd>{project.size} project</dd></div>}
              {project.createdDate && <div><dt className="mb-1 text-xs text-gray-400">Created</dt><dd>{project.createdDate}</dd></div>}
              {project.duration && <div><dt className="mb-1 text-xs text-gray-400">Duration</dt><dd>{project.duration}</dd></div>}
              {project.teamSize && <div><dt className="mb-1 text-xs text-gray-400">Team</dt><dd>{project.teamSize}</dd></div>}
              {project.liveUrl && <div><dt className="mb-1 text-xs text-gray-400">Live website</dt><dd><a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="break-all text-teal-300 underline decoration-teal-800 underline-offset-4 hover:decoration-teal-300">{new URL(project.liveUrl).hostname}<span className="sr-only"> (opens in a new tab)</span></a></dd></div>}
            </dl>
            {project.techStack && <h3 className="mt-5 text-sm font-semibold">Tech stack</h3>}
            <ul aria-label={project.techStack ? 'Project tech stack' : 'Project focus areas'} className="mt-5 flex flex-wrap gap-2">
              {(project.techStack ?? project.tags).map(tag => <li key={tag} className="rounded-md border border-gray-700 px-2 py-1 text-xs leading-5 text-gray-300">{tag}</li>)}
            </ul>
          </aside>
        </div>
        {project.videoUrl && (
          <section aria-labelledby="video-heading" className="mt-8">
            <h2 id="video-heading" className="mb-4 font-serif text-2xl font-bold">Project walkthrough</h2>
            <iframe src={project.videoUrl} title={`${project.title} project walkthrough`} loading="lazy" allowFullScreen className="aspect-video w-full rounded-xl border border-gray-800" />
          </section>
        )}
        <nav aria-label="More projects" className="mt-12 border-t border-gray-800 pt-6">
          <h2 className="mb-4 text-sm font-semibold text-gray-300">Explore more projects</h2>
          <div className="flex flex-wrap gap-3">
            {projects.filter(item => item.id !== project.id).map(item => <Link key={item.id} href={`/portfolio/${item.id}`} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-gray-800 px-3 text-xs text-teal-300 hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-teal-400">{item.title}<ArrowUpRight aria-hidden="true" className="h-3 w-3" /></Link>)}
          </div>
        </nav>
      </div>
    </main>
  );
}
