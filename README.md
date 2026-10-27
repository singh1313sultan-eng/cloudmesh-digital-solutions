# CloudMesh Digital Solutions — website

Marketing site for CloudMesh Digital Solutions (Auckland, NZ): websites, web portals and mobile apps.

Built with React 19, TypeScript, Vite, Tailwind CSS v4, three.js (3D hero) and Motion (portfolio animations).
Deployed to Cloudflare Pages.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # type-check
npm run build    # production build in dist/
```

## Editing content

| What | Where |
| --- | --- |
| Portfolio projects ("Selected Work") | `src/data/projects.ts` — add a screenshot to `public/work/` and set `image` to show it instead of the drawn mockup |
| Contact email & nav links | `src/data/site.ts` |
| Services | `SERVICES` in `src/components/Solutions.tsx` |

The contact form opens the visitor's email client with the enquiry pre-filled (there is no backend).
To receive submissions directly, point `handleSubmit` in `src/components/ContactSection.tsx` at a form service
or a Cloudflare Pages Function.

## Deploy

```bash
npm run build
npm run deploy:cf
```
