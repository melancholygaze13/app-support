# Apps & Support

A static personal developer site for apps, product details, support, privacy policies, and terms of use.

## Local preview

Open `index.html` directly, or serve the directory locally:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages

In the repository settings, open **Pages**, select **Deploy from a branch**, and publish the root of the `main` branch.

The site has no build step and can be hosted directly from the repository root.

## Pages

- `index.html` - app catalog and support
- `chordgrid.html` - ChordGrid product details
- `chordgrid/privacy.html` - ChordGrid privacy policy
- `chordgrid/terms.html` - ChordGrid terms of use

The app catalog uses a responsive `auto-fit` grid, so additional app cards can be added without changing the layout.
