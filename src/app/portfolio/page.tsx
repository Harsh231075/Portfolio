'use client';

import { useState } from 'react';
import projects from '@/Data/Project';
import ProjectCard from '@/components/ProjectCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chat from '@/components/Chat';
import MobileBottomNav from '@/components/MobileNav';

const categories = ['All projects', 'Latest work', 'Major projects', 'Mini projects'] as const;
type Category = (typeof categories)[number];

const matchesCategory = (project: (typeof projects)[number], category: Category) => {
  if (category === 'Latest work') return !project.archived;
  if (category === 'Major projects') return project.size === 'Major';
  if (category === 'Mini projects') return project.size === 'Mini';
  return true;
};

export default function ProjectGallery() {
  const [category, setCategory] = useState<Category>('All projects');
  const visibleProjects = projects.filter(project => matchesCategory(project, category));

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-28 sm:px-8 sm:pt-32">
        <header className="mb-8 border-b border-gray-800 pb-7">
          <p className="mb-3 text-xs uppercase tracking-widest text-teal-300">Portfolio / All work</p>
          <h1 className="font-serif text-4xl font-bold sm:text-5xl">Projects</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">Explore my latest work alongside earlier major and mini projects, with screenshots, project details, and source code.</p>
        </header>
        <div role="group" aria-label="Filter projects by category" className="mb-6 flex flex-wrap gap-2">
          {categories.map(item => {
            const count = item === 'All projects' ? projects.length : projects.filter(project => matchesCategory(project, item)).length;
            return (
              <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-400 ${category === item ? 'border-teal-400 bg-teal-400 text-gray-950' : 'border-gray-800 bg-gray-900 text-gray-300 hover:border-gray-600'}`}>
                {item}<span className="opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" aria-atomic="true" className="mb-4 text-xs text-gray-400">Showing {visibleProjects.length} of {projects.length} projects</p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
      </main>
      <Footer />
      <Chat />
      <MobileBottomNav />
    </div>
  );
}
