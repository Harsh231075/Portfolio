import { createHash } from 'node:crypto';
import projects from '../../src/Data/Project';
import { EMBEDDING_DIMENSIONS, EMBEDDING_FORMAT, EMBEDDING_MODEL } from '../../src/lib/embeddings';
import { KNOWLEDGE_DATASET } from '../../src/lib/ragConfig';

const hash = (text: string) => createHash('sha256').update(text).digest('hex');
const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function buildKnowledge(markdown: string) {
  const sections: { entity: string; section: string; text: string; source: string; project_status?: string }[] = [];
  for (const part of markdown.split(/^## /m).slice(1)) {
    const [heading, ...lines] = part.split('\n');
    const body = lines.join('\n').trim();
    if (!body) continue;
    sections.push({ entity: `profile:${slug(heading)}`, section: heading.trim(), text: body, source: 'data/profile-knowledge.md' });
  }
  for (const project of projects) {
    const status = project.archived ? 'archived' : 'latest';
    sections.push({
      entity: `project:${project.id}`, section: project.title, source: 'src/Data/Project.ts', project_status: status,
      text: [
        `${project.title} — ${status === 'archived' ? `outdated / archived ${project.size || ''} project` : 'latest portfolio project'}.`,
        `Category: ${project.category}. ${project.kind}.`,
        project.overview,
        `Described features: ${project.features.join(' ')}`,
        project.archived ? 'Current demo availability is not verified; use project details or source code.' : 'A listed public site is not proof of production scale or current availability.',
        !project.archived && project.liveUrl ? `Public site: ${project.liveUrl}` : '',
        project.githubUrl ? `Source code: ${project.githubUrl}` : '',
        project.createdDate ? `Recorded build date: ${project.createdDate}.` : '',
        `Portfolio details: /portfolio/${project.id}`,
      ].filter(Boolean).join('\n'),
    });
  }
  if (!sections.length || new Set(sections.map(s => s.entity)).size !== sections.length) throw new Error('Knowledge sections must have unique entities.');
  const version = hash(JSON.stringify({ sections, model: EMBEDDING_MODEL, dimensions: EMBEDDING_DIMENSIONS, format: EMBEDDING_FORMAT, chunking: 'words-300-overlap-50-v1' })).slice(0, 24);
  const chunks = sections.flatMap(section => {
    const words = section.text.split(/\s+/);
    const pieces = [];
    for (let offset = 0, index = 0; offset < words.length; offset += 250, index++) {
      const text = `${section.section}\n${section.project_status ? `Project status: ${section.project_status}\n` : ''}${words.slice(offset, offset + 300).join(' ')}`;
      pieces.push({
        _id: `${KNOWLEDGE_DATASET}:${version}:${section.entity}:${index}`,
        dataset: KNOWLEDGE_DATASET, kind: 'chunk',
        text, source: section.source, section: section.section, entity: section.entity,
        ...(section.project_status ? { project_status: section.project_status } : {}),
        content_hash: hash(text), knowledge_version: version,
        verification_status: section.source.startsWith('data/') ? 'owner-supplied-profile' : 'existing-portfolio-description',
        embedding_model: EMBEDDING_MODEL, embedding_dimensions: EMBEDDING_DIMENSIONS, embedding_format: EMBEDDING_FORMAT,
      });
      if (offset + 300 >= words.length) break;
    }
    return pieces;
  });
  return { version, chunks, sectionCount: sections.length };
}
