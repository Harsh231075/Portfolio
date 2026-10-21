import './lib/localEnv';
import { searchKnowledge } from '../src/lib/vectorSearch';
import projects from '../src/Data/Project';

const checks = [
  { query: 'Where does Harsh study and when will he graduate?', entity: 'Education' },
  { query: 'What is the scheduled last working day at SidLabs?', entity: 'SidLabs experience' },
  { query: 'What did Harsh do at MyMooment?', entity: 'MyMooment experience' },
  { query: 'Who led Orlo project development?', entity: 'Orlo leadership and project scope' },
  { query: 'What is Harsh’s phone number?', entity: 'Public contact and portfolio navigation' },
  { query: 'Did Harsh win Smart India Hackathon?', entity: 'Smart India Hackathon achievement' },
  { query: 'Who leads Bhumi Sangam development?', entity: 'Bhumi Sangam leadership and project scope' },
  ...projects.map(project => ({ query: `Describe the ${project.title} portfolio project.`, entity: project.title })),
];
async function main() {
  const results = [];
  for (const check of checks) {
    const start = Date.now();
    const documents = await searchKnowledge(check.query);
    const passed = documents.some(doc => doc.section === check.entity);
    const result = { query: check.query, expectedSection: check.entity, passed, latencyMs: Date.now() - start, sources: documents.map(({ id, section, source, version }) => ({ id, section, source, version })) };
    results.push(result);
    console.log(`${passed ? 'PASS' : 'FAIL'} (${result.latencyMs}ms, ${documents[0]?.method || 'no results'}): ${check.query}`);
  }
  console.log(`Verified ${results.filter(result => result.passed).length}/${results.length} expected sources.`);
  if (results.some(result => !result.passed)) throw new Error('Some expected sources were not retrieved.');
}
main().catch(error => {
  console.error('RAG verification failed. Check the source report, credentials and collection settings.');
  if (error instanceof Error) {
    console.error('Error type:', error.name.replace(/[^a-zA-Z0-9_]/g, ''));
    if (/^(Embedding |Knowledge collection|Some expected)/.test(error.message)) console.error(error.message);
  }
  if (error && typeof error === 'object' && 'errorDescriptors' in error && Array.isArray(error.errorDescriptors)) {
    console.error('Astra error codes:', error.errorDescriptors.map((item: { errorCode?: string }) => item.errorCode || 'unknown').join(', '));
    for (const item of error.errorDescriptors) {
      let detail = String(item.message || '');
      for (const [name, value] of Object.entries(process.env)) {
        if (value && /KEY|TOKEN|SECRET|PASSWORD/.test(name)) detail = detail.split(value).join('[redacted]');
      }
      console.error('Astra detail:', detail.slice(0, 1000));
    }
  }
  process.exitCode = 1;
});
