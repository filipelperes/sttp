<p align="center">
  <a href="https://github.com/mohvn/sttp">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://i.imgur.com/FGINGep.png">
      <img src="https://i.imgur.com/FGINGep.png" width="320" alt="sttp">
    </picture>
  </a>
</p>

<p align="center">
  <b>sttp</b> is a minimalist homepage designed to be used as a new tab in your browser.
  <br>
  It offers a clean, streamlined browsing experience with a modern, distraction-free design.
  <br><br>
  Command palette, live services, customizable themes, and more.
</p>

<h4 align="center">
  <a href="https://filipelperes.github.io/sttp/">Visit the Website</a>
</h4>

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB" alt="React"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite"></a>
</p>
<p align="center">
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS"></a>
  <a href="https://zustand.docs.pmnd.rs/"><img src="https://img.shields.io/badge/Zustand-5-7C3AED?logo=react&logoColor=white" alt="Zustand"></a>
  <a href="https://zod.dev/"><img src="https://img.shields.io/badge/Zod-3-3B72FF?logo=zod&logoColor=white" alt="Zod"></a>
</p>
<p align="center">
  <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white" alt="Vitest"></a>
  <a href="https://eslint.org/"><img src="https://img.shields.io/badge/ESLint-10-4B32C3?logo=eslint&logoColor=white" alt="ESLint"></a>
  <a href="https://pages.github.com/"><img src="https://img.shields.io/badge/GitHub_Pages-121013?logo=github&logoColor=white" alt="GitHub Pages"></a>
</p>

---

## Features

- **⌨️ Command Palette** — press any key or `Ctrl+K` to search and launch services instantly
- **🌓 Light / Dark Theme** — toggle instantly via CSS variables, no page reload
- **🪟 Glassmorphism UI** — adjustable glass intensity (light, medium, strong)
- **⏰ Customizable Clock** — 12h/24h, show/hide seconds, auto-hide on typing, font size (3–8rem)
- **📅 Flexible Date** — 12 locales, 4 format styles, toggle day-of-week, year, capitalization
- **🔧 Service Manager** — add, edit, delete services with custom colors; changes persist to source
- **🌫️ Background Dim** — adjustable overlay opacity (0–80%) + blur when palette opens
- **♿ Accessible** — `role="switch"` toggles, keyboard navigation, focus rings

## Getting Started

```bash
git clone https://github.com/mohvn/sttp.git
cd sttp
yarn install
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `yarn dev` | Start development server with HMR |
| `yarn build` | Type-check and production build |
| `yarn test` | Run all tests (Vitest) |
| `yarn test:watch` | Run tests in watch mode |
| `yarn lint` | Lint with ESLint |
| `yarn preview` | Preview production build locally |
| `yarn deploy` | Deploy `dist/` to `gh-pages` branch |

## Project Structure

```
src/
├── components/       # Shared UI components (Clock, DateDisplay, Icon)
├── features/         # Domain modules (CommandPalette, Settings, WelcomeTour)
│   ├── CommandPalette/
│   ├── Settings/
│   └── WelcomeTour/
├── hooks/            # Global reusable hooks
├── lib/              # Library configurations
├── types/            # Global type definitions
├── utils/            # Pure utility functions
└── App.tsx           # Root layout
```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Language | [TypeScript 6](https://www.typescriptlang.org/) |
| Build Tool | [Vite 8](https://vite.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| State | [Zustand 5](https://zustand.docs.pmnd.rs/) |
| Validation | [Zod 3](https://zod.dev/) |
| Testing | [Vitest 4](https://vitest.dev/) |
| Linting | [ESLint 10](https://eslint.org/) |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) |
| Hosting | [GitHub Pages](https://pages.github.com/) |

## Deploy

Every push to `main` triggers an automatic deployment to GitHub Pages via the [provided workflow](.github/workflows/deploy.yml).

## License

[MIT](LICENSE)

<p align="center">made with ❤️</p>
