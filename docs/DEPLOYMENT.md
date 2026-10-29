# Publish Chris-tastic World on GitHub Pages

## Status

The complete static website is on the public `main` branch. The site root contains `index.html`, `experiments.html`, `videos.html`, `assets/`, and `experiments/`.

The GitHub Actions deployment workflow was corrected on October 29, 2026, but the deployment and a separate minimal runner test failed **before a runner started** (no executed steps or usable logs). This points to a GitHub Actions execution/settings problem, not a missing site build command.

## Free branch-based publishing (recommended fallback)

1. Go to https://github.com/rice2k/Chris-Tastic-World/settings/pages
2. In **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Select branch `main`, folder `/(root)`, and click **Save**.
4. Open https://github.com/rice2k/Chris-Tastic-World/actions and verify the Pages build/deployment completes.
5. Check the expected public site at https://rice2k.github.io/Chris-Tastic-World/

The repository is public, so GitHub Pages can be used without paying for a private-repository publishing plan. Publishing is not confirmed until GitHub Pages reports a successful deployment and the website responds publicly.

## Automatic GitHub Actions workflow (optional)

The file `.github/workflows/deploy-pages.yml` is preserved for manual dispatch only. If GitHub-hosted runners become available and Pages is set to use GitHub Actions, run it from the Actions tab. Do not activate multiple competing publishing methods.

## Troubleshooting a failed job with no steps

If the branch deployment also fails before `Set up job`, check repository **Settings → Actions → General** and GitHub account Actions availability/restrictions, then use GitHub Support with the run URLs:
- https://github.com/rice2k/Chris-Tastic-World/actions/runs/40821755402
- https://github.com/rice2k/Chris-Tastic-World/actions/runs/40821960815

The minimal runner test confirmed that a plain `echo` command was not starting, which means changing the website HTML cannot resolve that particular failure.

## Local preview

Clone the repository or download ZIP and open `index.html`. For more realistic local testing of browser scripts, serve the directory with `python -m http.server 8000`.

## Maintenance

Keep all links relative; keep experiments in `experiments/` and images in `assets/images/`. YouTube placeholders need real video IDs. Third-party visitor counter availability is independent from GitHub Pages.
