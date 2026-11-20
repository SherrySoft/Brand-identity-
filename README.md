# Ditervo — Brand Identity & Company Website

Official brand identity system and static website for **Ditervo** (Applied AI, Software Engineering & Technology).

## Project Structure

```text
.
├── index.html                  # Main company landing page
├── brand.html                  # Interactive brand guidelines & SVG downloads
├── css/
│   └── styles.css              # Design tokens & responsive styles
├── js/
│   └── main.js                 # Navigation, swatch copy, and inquiry form
├── assets/
│   ├── favicon.svg             # Browser icon
│   ├── hero-sculpture.jpg      # Hero visual
│   ├── logo-mark.svg           # Standalone Ditervo emblem
│   ├── logo-full.svg           # Dark wordmark lockup
│   └── logo-full-light.svg     # Light reversed wordmark lockup
├── .nojekyll
└── .github/workflows/deploy.yml
```

---

## Deploying to GitHub Pages

1. **Repository visibility:** On a Free GitHub plan, GitHub Pages requires the repository to be **Public** (or GitHub Pro/Team for Private repos). You can either make `SherrySoft/Brand-identity-` public, or create a dedicated `ditervo` organization with a public `ditervo.github.io` repository.
2. **Enable Pages:** In GitHub, open **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Pushing to `main` automatically runs `.github/workflows/deploy.yml` and publishes the site.

---

## Connecting `ditervo.com` from Namecheap

Once you register `ditervo.com` on Namecheap:

1. **Add a `CNAME` file** at the root of this repository containing a single line:
   ```text
   ditervo.com
   ```
2. **Configure Namecheap Advanced DNS** for `ditervo.com`:
   - Add four `A` records for `@` pointing to GitHub Pages:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Add a `CNAME` record for `www` pointing to:
     - `sherrysoft.github.io.` *(or `ditervo.github.io.` if using an org repo)*
3. In GitHub **Settings → Pages → Custom domain**, enter `ditervo.com`, save, and enable **Enforce HTTPS** once DNS propagation completes.
