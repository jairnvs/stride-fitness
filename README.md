# Stride Fitness

Mobile-first, local-first fitness tracker and exercise education PWA.

## Publish the app

1. Download and extract the **stride-fitness-github-pages.zip** provided in ChatGPT.
2. On this GitHub repository, choose **Add file → Upload files**, then upload **all files and folders inside** the extracted project (not the ZIP file itself), preserving the folder structure.
3. Set repository visibility to **Public** (Settings → General → Danger Zone → Change repository visibility). GitHub Pages on a free plan requires public repositories.
4. Go to **Settings → Pages → Build and deployment** and choose **GitHub Actions** as Source.
5. Open **Actions → Deploy Stride to GitHub Pages** and run the workflow if it has not started.
6. Visit https://jairnvs.github.io/stride-fitness/ from iPhone Safari and choose Share → Add to Home Screen.

No backend, analytics, or user accounts. Your workouts and profile remain in local IndexedDB on the device. Use JSON export backups regularly. Other devices do not automatically synchronize.

The optional male 3D anatomy GLB is not bundled. The application has a labeled interactive 2D fallback when absent, and its female reference uses the interactive 2D view. For the male 3D reference, run `npm run anatomy:download` before building.
