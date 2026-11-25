# portofolio-nyiayu

Interactive portfolio of **Nyiayu Syafiah Riani**, UI Engineer & Frontend Developer based in Jakarta.

The site is a single illustrated office scene. Move the mouse to look around (layered parallax), and click objects in the room to open each section:

| Object | Section |
| --- | --- |
| Monitor | About |
| Task board | Projects |
| Bookshelf | Skills |
| Wall clock | Experience |
| Drawer cabinet | Contact |

## Tech

- React 19 + TypeScript, built with Vite
- Hand-drawn SVG scene split into 5 depth layers
- GSAP for parallax, intro and camera zoom
- Keyboard accessible hotspots, respects `prefers-reduced-motion`

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Editing content

All portfolio content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts): profile, projects, skills and experience. The downloadable CV is served from `public/cv/`.

## Structure

```
src/
  data/portfolio.ts      content
  components/
    Scene.tsx            parallax + camera zoom
    layers.tsx           SVG layers (sky, tree, room, desk, foreground)
    Hotspot.tsx          clickable objects
    Panel.tsx            section panel
```
