# Stride — Learn your body. Train with intention. Stay consistent.

A local-first, minimal fitness companion built with React, TypeScript, Vite, Tailwind CSS 4, Three.js / React Three Fiber, IndexedDB (`idb`), and `vite-plugin-pwa`.

## Quick start

Requires Node.js **20.19+ or 22.12+** and internet access for the initial package install.

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`). All activity, routine, workout and profile data is stored in local IndexedDB; no sign-up or account is needed.

### Install licensed 3D male anatomy (optional)

```bash
npm run anatomy:download
npm run build
npm run preview
```

The command downloads the ~24 MB anatomical GLB from the openly licensed BodyExplorer repository into `public/anatomy.glb`. For a production deployment, run it **before** `npm run build` so that the service worker precaches it for offline operation. The GLB is not included in the source archive, and the app gracefully falls back to an explicitly labeled interactive 2D illustration when it is absent. The download requires internet access. See [ATTRIBUTION.md](./ATTRIBUTION.md) for licensing and credits.

**Honest anatomy coverage:** the licensed 3D dataset is a **male reference**. The **female option is a 2D reference**, not a female 3D asset. Both allow selecting the same 19 muscle-group targets, accessing the same muscle information, and accessing gym/home exercise lists. 3D muscle parts are selected using their real mesh geometry and anatomical node names, not a fake 3D silhouette. The 2D guide is a simplified educational locator, not a precise medical atlas. Fine subdivisions not represented in the meshes can still be selected via the muscle-group list.

## Available functionality

- **Today:** a locally calculated Monday–Sunday dashboard, clickable days, logging of strength, home training, calisthenics, walking, cardio and recovery, notes, optional distance, history and lightweight weekly statistics.
- **Weekly rollover:** calendar-based; nothing needs to delete or run at midnight. On the next Monday the selected current week is empty, with prior weeks preserved. Still works after days offline. Date boundaries use the device's current timezone.
- **Anatomy:** male anatomical GLB if locally installed, otherwise 2D. The female selector uses a clearly labeled 2D diagram. Front/back views, muscle selection, groups, location/function descriptions, related groups and 3+ gym/home training references per group. 3D orbit/zoom/touch controls when the GLB exists.
- **Exercises:** locally stored curated database, search, muscle/equipment/location/difficulty filters, favorites, instructions, common form mistakes and general training ranges.
- **Routines:** create, rename and delete; set categories and optional days of week; add/remove exercises; edit sets and reps; replace exercises with location/equipment-compatible alternatives; complete and save checked sets with optional weight. Sessions log activity automatically.
- **Profile:** nickname, locally compressed profile photo, male/female reference choice, preferred training location, equipment and light/dark/system theme.
- **Backup:** export all records and your profile photo as JSON; restore with explicit replace confirmation.
- **PWA:** manifest, install icon and auto-updating service worker. Runs offline once the production build's resources have been downloaded and cached. On iPhone, open the deployed HTTPS URL in Safari, then use Share → Add to Home Screen. The PWA uses a PNG Apple Touch Icon, iPhone-safe-area spacing, larger tap targets, swipeable weekly dates on narrow screens, and mobile-friendly bottom-sheet dialogs. Note: the source ZIP itself is not directly installable on a phone.

## Verification

```bash
npm test          # unit tests for filtering, calendar rollover and IndexedDB
npm run build     # TypeScript validation and production bundle
npm run preview   # serve the built PWA locally
```

Test the install/offline experience under **HTTPS** (or localhost), including a reload while offline. Test on physical iOS Safari and Android Chrome before calling mobile behavior verified. The development server does not serve a production service worker.

## Privacy and data durability

There is **no backend, authentication, analytics or online synchronization**. All personal data is held per device, per browser origin in IndexedDB. A new browser, browser data reset, private browsing session, or installation on a second device **will not have your original records**. Storage might be evicted by the OS under pressure or cleared by the user, so regularly export JSON backups. Restoring one overwrites the current local data after confirmation. Profile pictures are reduced to at most 400px in the browser before storage.

## Design / development details

- `src/data/`: typed, static muscle definitions and original curated exercise library.
- `src/lib/`: versioned IndexedDB data model, validation, local calendar functions and backup helpers.
- `src/views/`: Today, Anatomy, Exercises and Profile screens.
- `src/components/`: genuine selectable Three.js mesh viewer and independent interactive 2D fallback.
- `scripts/download-anatomy.mjs`: opt-in third-party model installation.
- `tests/`: vitest suite with `fake-indexeddb`.

**Important limitation:** without the GLB, there is no working 3D experience. That is intentional; a pseudo-anatomical mesh would compromise accuracy. For a future full male/female 3D experience, acquire and validate a reusable scientifically derived whole-body female muscle dataset and attach each region to the exercise ontology, maintaining license attribution.

## Attribution / exercise guidance

Anatomy sources, derivative licensing and third-party attribution are documented in [ATTRIBUTION.md](./ATTRIBUTION.md). Supplemental exercise references include [ExRx exercise directory](https://exrx.net/Lists/Directory) and [Fitness Programmer](https://fitnessprogramer.com/) (external links; no proprietary media is bundled). Set and rep guidance is illustrative rather than personal medical or coaching advice.

### iPhone-first usage

Stride runs as a web app on iPhone after it is hosted over HTTPS (for example, Netlify). From Safari, tap **Share → Add to Home Screen** and open the home-screen icon. Data stays on that phone's browser origin; it does not appear on your Mac or another iPhone automatically. Use Profile → Export JSON for periodic backups. For small devices, the seven-day strip scrolls horizontally to keep each date tap target large enough.

These mobile design adjustments were not verified on a physical iPhone in this environment.


## GitHub Pages (personal, separate from Norts)

1. Create a **public** empty GitHub repository named `stride-fitness`. Don't initialize with a README.
2. Upload this project's files to the repository root (the contents of the `stride-fitness/` folder, not the parent folder), or push using Git.
3. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions**.
4. The included workflow tests and builds the app with `GITHUB_PAGES=true`, deploying at `https://YOUR-USERNAME.github.io/stride-fitness/`.
5. Open the deployed URL in iPhone Safari; Share → Add to Home Screen.

The 3D GLB is intentionally optional and is not checked into this package; the 2D anatomy fallback works offline. To include 3D, download `anatomy.glb` into `public/` before building and ensure proper source attributions.
