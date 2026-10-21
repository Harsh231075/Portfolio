This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Portfolio assistant

Copy `.env.example` to `.env.local` and set `GROQ_API_KEY` and `GEMINI_API_KEY` locally and as secrets on your hosting provider. Never prefix credentials with `NEXT_PUBLIC_`.

The assistant tries Groq's `openai/gpt-oss-120b` first, then Gemini's `gemini-3.5-flash-lite` if Groq fails, times out, is rate-limited, returns an empty answer, or has no key. Existing `GENAI_API_KEY` and `GOOGLE_API_KEY` are also accepted for Gemini. Override defaults using `GROQ_MODEL` and `GEMINI_MODEL`.

Both defaults are listed in their providers' free tiers as checked on October 20, 2026. Free usage has account-specific quotas; use free-plan accounts for both providers. The app does not control provider billing or enable a paid plan. See [Groq limits](https://console.groq.com/docs/rate-limits) and [Gemini pricing](https://ai.google.dev/gemini-api/docs/pricing).

Current project data is included directly in assistant responses. Existing Astra document retrieval is optional and limited to three seconds, so a missing database or embedding failure does not block chat. Conversation history stays in the open browser tab and is sent with each request; New chat clears it. There is no shared server-side conversation cache.

Run checks with `npm run test:chat`.

## Cloudflare Workers deployment

The Worker name and `WORKER_SELF_REFERENCE.service` in `wrangler.jsonc` must both be `harsh`. The checked-in OpenNext configuration avoids the automatic migration that previously generated the incorrect service name `portfolio`.

In Cloudflare Workers Builds, set the build command to `npm run build:cloudflare` and the deploy command to `npx opennextjs-cloudflare deploy`. This builds once and deploys the generated Worker. For a manual deployment, run `npm run deploy`.

Set API credentials as **secrets** in the `harsh` Worker's Settings → Variables and Secrets. The existing `GENAI_API_KEY` is supported as the Gemini fallback key. `keep_vars: true` preserves dashboard variables during deployment; never commit credential values to the Wrangler configuration. If a log contains credentials, rotate them with the relevant provider and replace them with secrets.

Use `npm run preview:cloudflare` to test locally in the Workers runtime. Next.js has been updated to the supported 16.4 release required by the pinned OpenNext adapter’s support-policy check; the normal Node.js development command remains `npm run dev`.
