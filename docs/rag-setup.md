# Portfolio RAG setup

The approved public facts live in `data/profile-knowledge.md`. All 11 gallery projects are added automatically from `src/Data/Project.ts`, including archived major/mini projects. The raw `newDATA..md`, old PDFs and review instructions are not imported.

## Verification completed on 21 October 2026

- Imported and activated 32 knowledge records, including all 11 gallery projects and the public phone number, in `default_keyspace.portfolio_profile_v1`; one additional record tracks the active snapshot.
- Passed 18/18 live expected-source retrieval checks, using exact cosine ranking of vectors read from Astra because its native index is unavailable.
- The chat API logged successful knowledge retrieval and returned HTTP 200 with the correct phone, scheduled SidLabs last day and Orlo leadership. This was a local server-code check against live APIs, not a deployed-website check.
- Seven RAG tests and 16 chat tests passed; TypeScript and the production build passed.
- Credentials were supplied in memory for these checks, not written to the repository. Deployment secrets still need the new endpoint, namespace and collection.

## Configuration

Use ignored `.env.local` locally or deployment secrets in Cloudflare:

```dotenv
ASTRA_DB_API_ENDPOINT=<new Astra database endpoint>
ASTRA_DB_APPLICATION_TOKEN=<Astra application token>
ASTRA_DB_NAMESPACE=default_keyspace
ASTRA_DB_COLLECTION=portfolio_profile_v1
GEMINI_API_KEY=<Gemini API key with embedding access>
GROQ_API_KEY=<Groq API key>
```

`GENAI_API_KEY` and `GOOGLE_API_KEY` are accepted aliases for Gemini. The client ID and client secret are not needed when using the application token. Never put these keys in `NEXT_PUBLIC_` variables.

## Commands

```sh
npm run embed-data -- --dry-run
npm run embed-data -- --write
npm run verify:rag
npm run test:rag
npm run test:chat
npm run typecheck
npm run build
```

The dry run needs no credentials and performs no network calls. Review the Markdown source, project data and printed record list. No local JSON database or generated JSON files are created. `--write` verifies embedding access, validates/creates the named collection, upserts a complete snapshot and activates it only after the record count matches. A failed partial import does not replace the active snapshot. Repeat imports reuse matching records. Older snapshots remain stored for rollback; they are excluded from search by an active-version filter. They are not automatically deleted.

Embeddings use `gemini-embedding-2`, 768 dimensions, cosine similarity, and shared document/query formatting. All vectors must be regenerated when the embedding model or format changes. See [Google's embedding documentation](https://ai.google.dev/gemini-api/docs/embeddings).

`verify:rag` checks that expected sections appear in retrieved results and prints pass/fail results and timing. It does not prove every generated answer is correct or that the deployed website uses these settings. Verify the deployed chat after setting Cloudflare secrets and deploying the code. A normal chat reply can come from static facts when retrieval is unavailable.

## Updating content

Edit the public profile or gallery data, review a fresh dry run, then run `--write` and `verify:rag`. Metadata distinguishes owner-supplied profile facts from existing gallery descriptions. Neither category is independent third-party verification. Unknown dates, implementation scope and metrics stay qualified. System behavior belongs in `src/Data/system.ts`, not embedded Markdown.

## Astra index fallback

Live checks found an Astra `INVALID_DATABASE_QUERY` error reporting that the internal vector column lacks its required index, despite the collection reporting vector-enabled settings. Retrieval first attempts native ANN search. For this specific missing-index error only, it reads the active snapshot’s vectors from Astra and computes exact cosine similarity in the server process. This fallback is capped at 256 knowledge records; it is not a local file database or a fallback to static profile text. Other errors still fail retrieval safely. The server logs the retrieval method, and the verification command reports it. Astra’s native index still requires repair before this collection scales beyond the small-profile fallback.

The supplied source draft's review remains in `docs/rag-data-review.md`; its initial empty-database findings describe the pre-import state. Refer to subsequent import and verification results for the latest database state.

## Chat response diagnostics

`POST /api/chat` returns the existing `answer` plus a `debug` object. The chat interface continues displaying only the answer; inspect the response in the browser Network tab to see diagnostics.

```json
{
  "answer": "Harsh is pursuing B.Tech Computer Science; his current semester is unconfirmed.",
  "debug": {
    "pipelineVersion": "2026-10-21-rag-debug-v1",
    "contextSource": "vector_db",
    "portfolioContextIncluded": true,
    "retrieval": {
      "status": "success",
      "method": "exact-cosine",
      "reason": null,
      "durationMs": 2400,
      "chunks": 5,
      "sources": [
        { "section": "Education", "source": "data/profile-knowledge.md", "version": "<active knowledge version>" }
      ]
    },
    "generation": { "provider": "groq", "model": "openai/gpt-oss-120b" }
  }
}
```

The example values are illustrative. `vector_db` means retrieved records were actually passed to generation alongside the standard portfolio/system facts. It does not prove that every sentence was derived from a particular record. `sources` lists the supplied sections, not model-inferred citations. `exact-cosine` still uses the vectors stored in Astra; it is distinct from static portfolio fallback.

`portfolio_fallback` means no retrieved context was passed. Check `retrieval.status`: `not_configured`, `timeout`, `empty`, or `error`. `reason` uses fixed safe labels, such as `embedding_http_403`, `astra_timeout`, and `knowledge_not_activated`. The response never includes raw provider errors, credentials, full retrieved text or visitor history. `generation` identifies the provider that actually returned the answer, independently of retrieval.

The pipeline version distinguishes this updated deployment from older API responses that contain only `answer`. Responses use `Cache-Control: no-store`. Education guidance explicitly states that Harsh is pursuing his degree alongside work; his exact semester must remain unconfirmed until he supplies it, regardless of earlier assistant claims in conversation history.
