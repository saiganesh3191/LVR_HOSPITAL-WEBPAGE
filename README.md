# LVR Multi Speciality Hospital website

Public information website for LVR Multi Speciality Hospital, Sathupally. Built with Next.js, React, and TypeScript. It is not the hospital management application.

## Run locally

Requires Node.js 22 or newer.

```sh
npm install
npm run dev
```

Open `http://localhost:3000`. To check a production build:

```sh
npm run lint
npm run build
npm run test:e2e
```

The browser tests use Playwright Chromium and may require `npx playwright install chromium` on a new machine.

## Website content and features

- Five public doctor profiles: General Medicine, Dermatology, Pediatrics, Gastroenterology, and Nephrology. LVR has confirmed there is no oncology doctor.
- Doctor directory filters, site-wide search, a consultation-information overview, department pages, and hospital facilities.
- A Telugu visitor-information page at `/te`. Full bilingual translation of every page is not yet available.
- An updates page at `/updates`. Approved announcements can be added to `src/lib/updates.ts` with publication and optional expiry dates. No events or clinic dates are invented when that list is empty.
- Appointment request form with validation, review, and WhatsApp handoff. A request is **not** a confirmed appointment or live slot reservation; reception confirms availability.
- Contact, directions, patient guide, FAQs, privacy information, and responsive mobile navigation.

Public hospital, department, and doctor data is in `src/lib/hospital.ts`. The site deliberately excludes raw hospital-system user exports, credentials, patient records, and private CV documents. Doctor consultation times other than the published Dermatology hours require confirmation with reception.

## Production configuration

Copy `.env.example` to a local `.env` file and set the final site URL. Keep indexing disabled until the hospital has reviewed the public content. The `.env` file is ignored by Git.

The site has no connected CMS, authenticated staff editor, appointment database, or payment gateway. Staff-managed live updates and verified booking slots require a secure backend and persistent production storage.
