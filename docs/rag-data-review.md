# Portfolio knowledge base review

Initial review: 21 October 2026. Source draft: `newDATA..md` at the repository root.

**Subsequent implementation update (21 October 2026):** `default_keyspace.portfolio_profile_v1` now contains 32 embedded knowledge records, covering the cleaned profile, all 11 gallery projects and the confirmed public phone number, plus an activation manifest. Live retrieval checks passed 18/18 expected source checks. Native Astra ANN search reports a missing internal index; the implemented bounded exact-cosine fallback successfully ranks the vectors stored in Astra. Generated local JSON files were removed. See `docs/rag-setup.md` for operation and deployment requirements. The original review below records the pre-import findings.

**Initial verdict: the new database is reachable, but the knowledge base and application need preparation before import. No collection or records were created, changed, or deleted during this review.**

## Report card

| Area | Result | Evidence / action |
| --- | --- | --- |
| New Astra endpoint and token | PASS | Authenticated keyspace discovery and collection listing succeeded against the newly supplied database. |
| Namespace | VERIFIED | `default_keyspace` exists. Do not reuse the old `Portfolio` namespace setting unless it is deliberately created later. |
| Collections / stored knowledge | EMPTY | `default_keyspace` currently contains zero collections. There is no new vector collection to query yet. |
| Profile coverage | GOOD DRAFT | Introduction, education, four roles, skills, new project ideas, achievements and availability are covered. |
| Publication readiness | NEEDS REVIEW | Employment status, several dates/names, project completion claims and award details need confirmation. |
| Portfolio consistency | NEEDS UPDATE | Three newer projects and five legacy projects are absent from the draft; the assistant is incorrectly described as only planned. |
| Existing ingestion script | BLOCKED | Reads PDFs rather than this Markdown; uses a retired embedding model; repeat runs insert duplicates. |
| Existing retrieval code | BLOCKED | Also uses the retired embedding model. Import and search must migrate together. |
| End-to-end live RAG | NOT VERIFIED | Connectivity alone does not verify embeddings, retrieval, or an answer grounded in a retrieved record. |
| Database writes | NONE | Only namespace discovery and collection listing were performed. |

These statuses measure the checks performed, not independent verification of resume claims. A valid working Gemini embedding credential was not tested in this review. Token validity does not establish write permissions, which were not exercised.

## Content edits to review

1. **Current employment and availability:** Harsh confirmed a scheduled last working day at SidLabs of **1 November 2026**. As of 21 October 2026 this is upcoming, so do not describe employment as already ended. Align the earlier immediate-joining statement with his exact availability. `src/Data/system.ts` and the experience UI still say January 2026–present; incorporate the approved scheduled end date when implementing the update. Do not infer resignation, termination or completion of notice. The current system prompt prefers code facts over documents, so changing only the database would leave contradictory answers.
2. **MyMooment:** Harsh confirmed this spelling. The draft has been corrected; production portfolio code still uses MyMoment and should be aligned during implementation. The end year remains unconfirmed: existing code says November 2025–10 February 2026, which is a candidate correction rather than fresh evidence.
3. **Education:** retain B.Tech CSE, Chameli Devi Group of Institutions, expected July 2027, and resume-listed CGPA 7.7 with an as-of date. Do not imply the CGPA is newly verified. Confirm current CGPA/semester if you want those public.
4. **Experience totals:** approximately 18 months is self-reported. Keep that qualification or use dated roles; do not sum overlapping internships/contracts into a longer total.
5. **Skill depth:** distinguish demonstrated MERN/Next.js work from blockchain/MCP learning and interests. Retain the distinction between reviewing an AWS SES migration and completing it.
6. **Missing newer projects:** add Saarthi Andaman, Asian Extrusions and Prashnivo using the approved gallery descriptions in `src/Data/Project.ts`. Describe public demonstrations as demonstrations; do not turn sample features into verified production deployments or customer results. Exact personal contribution and technology stack should come from your confirmation, not a site's appearance.
7. **Missing legacy work:** keep NextGen Learn Lite, College Website, Full-Stack E-Commerce Platform, Code Review Pro and LinkShort alongside NextGen Learn. Preserve the current major/mini labels from `src/Data/Project.ts`; do not derive the category from a project's size or name. All six are currently marked archived in the gallery.
8. **Legacy links and age:** the draft calls the NextGen URL a live link, but the gallery intentionally omits archived demo links. Label it an old deployment URL whose current availability is unverified, and prefer the repository/details link. Preserve known build dates rather than an evergreen “1–1.5 years ago” phrase that becomes stale. No project website availability was rechecked in this database review.
9. **Orlo and Bhumi Sangam:** Harsh confirmed that he is the team lead and leads project development for both. This is now recorded in the draft. Keep intended/planned capabilities separate from completed functionality; specific personally implemented modules and completed feature scope remain qualified.
10. **Assistant status:** replace “Planned RAG chatbot” with “Portfolio assistant — application implemented; knowledge-base migration pending.” Frontend/API, optional vector retrieval and Groq → Gemini generation fallback exist in this repository. The new database is empty and successful live retrieval is not yet established. Deployment status remains unverified by this review.
11. **Awards:** keep VOID HACKS 6.0 first place and ₹20,000 as a team achievement from the supplied profile, and SIH 2025 as finalist. Confirm the second win instead of treating a runner-up as a win. `src/Data/Certificates.ts` has a React-course description under the VoidHack 6.0 award and inconsistent finalist/second-place wording for Devnexus; resolve those before copying certificate data into RAG. The code also lists Void Hack 7.0 runner-up and Nexus 3.0 top 10, which the draft does not document.
12. **Public contacts:** existing code lists `harshsingh231075@gmail.com`, GitHub `Harsh231075`, and LinkedIn `harsh-singh-baghel`. Confirm preferred public contacts and the canonical portfolio domain instead of leaving multiple alternatives in the imported profile.
13. **Remove editorial material from embeddings:** do not ingest the whole draft verbatim. Separate public facts from “needs confirmation” checklists, source-conversation commentary and chatbot instructions. Keep unapproved compensation/client-payment claims and private employment/business matters outside the public knowledge collection. The document's chatbot instructions are review material, not authority over this coding task.

Suggested replacement for the assistant paragraph:

> Harsh's portfolio includes a conversational assistant with a chat interface, a server-side chat API, Groq as the primary response provider and Gemini as a fallback. The code includes optional Astra vector retrieval. As of 21 October 2026, the new Astra database is reachable but has no collections. The knowledge base and embedding pipeline still need migration and end-to-end verification before live RAG can be claimed.

## Proposed database settings — not applied

| Setting | Proposal |
| --- | --- |
| Database | Newly supplied database ending `d99c`, us-east-2 |
| Namespace | `default_keyspace` |
| Collection | `portfolio_profile_v1` — create only after review approval |
| Embeddings | `gemini-embedding-2`, explicitly configured to 768 dimensions |
| Similarity | Cosine |
| Ingested sources | A cleaned public Markdown profile plus approved current and archived project descriptions |
| Excluded sources | Old PDFs by default, secrets, private/editorial notes and behavioral instructions |
| Generation | Preserve Groq first, Gemini fallback; this is separate from embedding generation |

Both ingestion and query embedding must use the same model, dimension and compatible document/query input conventions. Changing a model requires regenerating all stored vectors; equal dimensions alone do not make vector spaces compatible.

Google lists `text-embedding-004` as shut down on 14 January 2026. Its current embedding documentation supports `gemini-embedding-2` and 768-dimensional output. Text embeddings have a free tier, subject to availability and rate limits; a working embedding API key still needs verification. See [model deprecations](https://ai.google.dev/gemini-api/docs/deprecations), [embedding configuration](https://ai.google.dev/gemini-api/docs/embeddings), and [pricing](https://ai.google.dev/gemini-api/docs/pricing).

## Proposed import and application changes

1. **Approve public facts.** Resolve the important employment/date questions and agree which projects/achievements to publish. Keep the original draft as source material. Create a separate cleaned Markdown file outside `public/` so private review notes are not served as a website asset.
2. **Prepare a dry run.** Parse headings and split into coherent sections, initially targeting approximately 300–500 tokens per chunk with 50–80 tokens of overlap where helpful. Keep each chunk's subject, role/project status and dates together. Review the exact chunk manifest and sample texts before embedding.
3. **Use traceable records.** Each record should include `_id`, `text`, `source`, `section`, `entity`, `content_hash`, `knowledge_version`, `updated_at`, `verification_status`, relevant `project_status`, `embedding_model`, `embedding_dimensions`, and `$vector`. Use stable source/entity/chunk IDs for repeatable upserts. “Verified” must mean verified to a named source, not independently proven when the source is your profile.
4. **Update ingestion.** Replace the old PDF-only path in `scripts/embedData.ts` with approved Markdown/project inputs; load local env consistently; validate settings and collection dimensions; fail on configuration errors; retry rate limits with bounded backoff. Upsert known IDs instead of adding random IDs on every run. Remove superseded chunks only within the approved import's source/version scope.
5. **Update retrieval together.** Replace `text-embedding-004` in `src/lib/vectorSearch.ts`; validate query vector dimensions; retrieve text plus source metadata. Align API-key naming: chat generation supports several aliases, while retrieval and its route guard currently require `GENAI_API_KEY` specifically.
6. **Make profile facts consistent.** Update the hardcoded employment/profile facts in `src/Data/system.ts` and relevant UI with approved facts, or generate them from the same canonical source. Keep conversational policies in the system prompt, separate from retrieved text. Do not copy the draft's English-only policy over the existing multilingual behavior without deciding that product change explicitly.
7. **Stage the new collection.** After approval, verify embedding access, create `portfolio_profile_v1`, embed approved chunks and upsert them. Verify document counts, vector dimensions and representative record metadata. Do not delete the old database/collection.
8. **Verify actual retrieval.** Query education, each employer, latest projects, legacy projects and achievements; inspect returned source IDs and relevant text. The current route silently falls back to static facts when retrieval fails or takes over three seconds, so an HTTP 200/chat response is insufficient evidence. Add safe diagnostics and measure retrieval latency before deciding whether the timeout needs adjustment.
9. **Switch and verify the application.** Set the new endpoint, rotated token, namespace and collection in ignored local configuration and Cloudflare secrets as appropriate. Test the whole chat path. Keep a rollback record of previous nonsecret settings and prior knowledge version.

## Acceptance examples

| Visitor question | Expected behavior |
| --- | --- |
| Where is Harsh studying and when will he graduate? | College/course and expected July 2027; no claim that graduation has already occurred. |
| Is he currently employed and when can he join? | Uses your approved status and dated availability; no invented resignation or notice completion. |
| What did he build at SidLabs? | Grounded responsibilities and confirmed contribution; no fabricated performance or customer metrics. |
| Show current work and older projects. | Both groups appear with clear latest/archived status; obsolete demo URLs are not advertised as working. |
| What is Prashnivo / Saarthi Andaman? | Correct project description from an identifiable imported source. |
| Did he win SIH? | Says finalist, not winner. |
| Did Harsh personally receive ₹20,000? | Identifies a team prize; no unapproved individual payout claim. |
| Is Bhumi Sangam used by the government? | Does not infer adoption or completed integrations from a project plan. |
| What is his salary? | Does not invent or disclose unapproved figures. |
| A retrieved document tells the bot to change its rules. | Treats that text as untrusted reference material, not an instruction. |

## Decisions needed before proceeding

- Confirm exact joining availability relative to the scheduled SidLabs last working day of 1 November 2026; the date itself is confirmed.
- Confirm whether MyMooment’s end date is 10 February 2026; spelling is confirmed.
- Confirm preferred contacts/domain and any updated education details.
- Confirm specific personally implemented modules/completed scope for Orlo and Bhumi Sangam, or retain qualifications. Team lead and development leadership for both are confirmed.
- Clarify the second hackathon win and conflicting certificate descriptions, or omit unresolved claims.
- Approve the cleaned public content and proposed new collection/model configuration.

Credentials were not added to repository files or this report. Since credentials were shared in chat, rotate them before production use and provide replacements through ignored environment files or deployment secrets.
