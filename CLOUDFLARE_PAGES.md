# LVR Hospital static Pages deployment

This branch exports the hospital website as static HTML, CSS, JavaScript, fonts, and images in `out/`. It does not require a Next.js Worker for public page requests. The existing Cloudflare Worker and the OpenNext files (`wrangler.jsonc`, `open-next.config.ts`, and the `preview`/`deploy` scripts) remain as the fallback on `main`. Do not run the OpenNext deployment script for the Pages project.

## Cloudflare Pages project

Create a **new** Pages project connected to `saiganesh3191/LVR_HOSPITAL-WEBPAGE`. Do not select the existing Worker or attach its domain.

| Setting | Value |
| --- | --- |
| Framework preset | Next.js (Static HTML Export) |
| Production branch | `cloudflare-pages-static` |
| Root directory | Repository root |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js | 22 or newer |
| `SITE_INDEXABLE` | `false` during client review |
| `NEXT_PUBLIC_SITE_URL` | The new Pages URL, for example `https://<pages-project>.pages.dev` |

Use a distinct Pages project name. Cloudflare will provide a `*.pages.dev` URL for review. Keep the Worker URL and any current DNS records unchanged. When the client approves a permanent domain, set `NEXT_PUBLIC_SITE_URL` to that domain, set `SITE_INDEXABLE=true`, rebuild, verify metadata/robots/sitemap, and only then connect the domain with explicit approval.

The root `wrangler.jsonc` belongs to the **existing Worker**. It intentionally has no `pages_build_output_dir`; use the Pages dashboard build settings above for the new project. `public/_headers` is copied into `out/_headers` and supplies the four existing security headers on Pages. No `_redirects` file is needed: Pages serves exported `about.html` at `/about` and exported nested HTML at the matching extensionless path. The generated `404.html` preserves a real not-found page.

## Static behavior

- Doctor and department detail pages are generated from their known slugs at build time.
- The appointment form remains in the browser. Query parameters such as `/appointment?doctor=prathyusha` and `/appointment?department=nephrology` select the correct fields after hydration. Form data stays in page memory until the visitor chooses the WhatsApp link; there is no new data service.
- The hospital updates list is compiled at build time from client-approved announcements. It is currently empty. When adding a dated announcement, deploy on its publication date and redeploy on its expiration date; do not rely on a previously built page to change with the clock. Do not add unapproved announcements.
- Existing WebP images are served directly from `public/`. `next/image` still supplies dimensions, responsive layout sizing, lazy loading, and priority for above-the-fold images, but it no longer requests the server-only `/_next/image` optimizer. Original source photographs remain in the repository; public pages use the smaller WebP versions.
- `robots.txt`, `sitemap.xml`, titles, descriptions, and social metadata are generated during the build. Keep `SITE_INDEXABLE=false` while the Pages site is a demonstration; rebuild with `true` and the final URL when the hospital approves indexing.

## Verify before sharing the Pages URL

From this branch, run `npm ci`, `npm run typecheck`, `npm run lint`, and `npm run build`. Confirm `out/index.html`, `out/appointment.html`, `out/doctors/prathyusha.html`, `out/_headers`, `out/robots.txt`, and `out/sitemap.xml` exist. Run `npm run preview:static` and in another terminal set `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3001` before `npm run test:e2e`. This local preview simulates extensionless static URLs; final routing must also be checked on the real Pages URL.

After the **new** Pages project builds, open its root, `/doctors/prathyusha`, `/departments/gastroenterology`, `/appointment?doctor=prathyusha`, `/appointment?department=nephrology`, `/updates`, `/te`, `/robots.txt`, and `/sitemap.xml`. Refresh the nested pages. Confirm doctor and logo images load, the form preselects correctly, its review creates the intended WhatsApp link, and security headers appear in browser Network tools. Check phone and contact links on a mobile device. No appointment request needs to be sent while testing.

To publish this branch to GitHub for the separate Pages project, run:

```bash
git switch cloudflare-pages-static
git push -u origin cloudflare-pages-static
```

Pushing the branch does not merge it into `main`. If a Pages project is later connected to this branch, future pushes will trigger a new Pages build. Do not replace the Worker, change DNS, or deploy over its URL during review.
