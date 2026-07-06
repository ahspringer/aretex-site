# aretex-site
This repository owns the website code for Aretex Labs.

To view the site:

```
cd ./site

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; npm run dev
```

> Then open http://localhost:3000

## GitHub Pages deployment

This repository is configured to deploy to GitHub Pages via GitHub Actions.

1. In GitHub, go to Settings -> Pages and set Source to GitHub Actions.
2. Add a repository secret named NEXT_PUBLIC_CONTACT_ENDPOINT that points to your external form endpoint.
3. Push to main and wait for the Deploy Next.js site to Pages workflow to complete.

Notes:
- The site is deployed as a static export from site/out.
- GitHub Pages does not run Next.js API routes. Form submissions must use an external endpoint.