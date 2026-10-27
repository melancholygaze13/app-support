# Apps & Support

A static personal developer site for apps, product details, support, privacy policies, and terms of use.

## Local preview

Open `index.html` directly, or serve the directory locally:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages

In the repository settings, open **Pages** and set **Source** to **GitHub Actions**. Every push to `main` runs `.github/workflows/pages.yml`, which copies the site into `_site` and publishes it.

GitHub Pages caches files for 10 minutes. To keep browsers from pairing a new page with an old stylesheet, link CSS and JS as `file.css?v=dev`; the workflow replaces `dev` with the commit hash on each deploy. New top-level site files must also be added to the `cp` line in the workflow.

## Pages

- `index.html` - app catalog and support
- `chordgrid.html` - ChordGrid product details
- `chordgrid/privacy.html` - ChordGrid privacy policy
- `chordgrid/terms.html` - ChordGrid terms of use

The app catalog uses a responsive `auto-fit` grid, so additional app cards can be added without changing the layout.
