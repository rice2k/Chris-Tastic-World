# Chris-tastic World!

A colorful, retro-inspired science activity website for children and families, styled after late-1990s and early-2000s web portals.

## Website contents

The current complete local site package contains **55 science experiment pages** with posters, supplies, step-by-step instructions, five-block difficulty indicators, and print controls.

Other planned/present sections include:
- Experiments, with search, difficulty filters, and random experiment selection
- Characters and kid-friendly science facts
- Ten YouTube video placeholders
- Gallery placeholders labeled under construction
- Links to kid-friendly NASA, science learning, equipment, and lab safety resources
- A green digital visitor counter designed for online hosting

## Deployment

This is a static HTML/CSS/JavaScript website. The website files belong at the **repository root** with `index.html` alongside `experiments.html`, `videos.html`, and the `assets/` and `experiments/` folders.

A GitHub Pages Actions workflow is included at `.github/workflows/deploy-pages.yml`. In GitHub, open **Settings → Pages**, select **GitHub Actions** as the build/deployment source, and verify Actions and Pages deployment permissions. When a complete site is present on the `main` branch, GitHub Pages can normally serve it at:

https://rice2k.github.io/Chris-Tastic-World/

**Publishing status:** This README alone does not mean the complete website is uploaded or live. Check the repository files, Pages settings, and deployment workflow status.

## Local preview

After downloading and extracting the complete project ZIP, open `index.html` in a browser. Some functionality that calls online services (including the visitor counter) requires an internet connection and a live host.

## Design and safety

The science content is intended for family activities with appropriate adult supervision. Experiments involving heat, sharp tools, chemicals, pressurized containers, or strong magnets need additional precautions. Do not drink filtered experiment water.

## Project maintenance

Keep original poster artwork in `assets/images/`. Use relative links for HTML pages and media so the site also works on GitHub Pages and Neocities.

Repository: https://github.com/rice2k/Chris-Tastic-World
