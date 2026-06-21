<p align="center">
  <a href="https://github.com/mohvn/sttp">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://i.imgur.com/FGINGep.png">
      <img src="https://i.imgur.com/FGINGep.png" width="320" alt="sttp">
    </picture>
  </a>
</p>

<p align="center">
  <b>sttp</b> is a modern, customizable startpage designed to be used as a new tab in your browser.
  <br>
  Command palette, live search, customizable services, themes, and more — all in a beautiful glassmorphism UI.
  <br><br>
  Start typing to launch anything, instantly.
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

- **⌨️ Command Palette** — press any key or `Ctrl+K` to launch. Type service names for autocomplete, or any text to search the web. Tab to fill suggestions, Enter to navigate
- **🎨 Brand-Color Autocomplete** — each suggestion is dynamically highlighted with the service's own brand color: background tint, left border, and text color. Instantly recognize your services
- **🔍 Search Engine Selector** — pick your default from Google, DuckDuckGo, Bing, Brave, Yahoo, Ecosia, Startpage — or add your own custom search engines with emoji, label, and URL template
- **📦 Service Manager** — add, edit, and delete your own web services with custom icons (emoji, react-icons, SVGR, or images), colors, and URL patterns. All saved to localStorage
- **🎯 12 Accent Targets** — dedicated Accent tab with granular control over which UI elements use your accent color: clock digits, colon separator, date text, icons, tabs, toggles, sliders, focus ring, scrollbar, glass borders, button borders, and text cursor
- **🎨 Accent Color Picker** — choose from 10 preset accent colors or pick any custom color. Applies instantly across the entire UI
- **📋 Settings Profiles** — save your entire settings configuration as a named profile. Set a startup default that loads on every visit. Export all profiles as JSON, import profiles from other devices. Factory default is always available
- **🌓 Light / Dark Theme** — toggle instantly via CSS variables with a floating button. No page reload needed
- **🪟 Glassmorphism UI** — adjustable glass intensity (light, medium, strong). Background dim and blur when palette opens
- **⏰ Customizable Clock** — 12h/24h, show/hide seconds, auto-hide on typing, independent font size from 3rem to 8rem
- **📅 Flexible Date Display** — 12+ locales, 4 format styles, toggle day-of-week, year, capitalization. Independent font size from 0.5rem to 3rem
- **📱 Mobile Optimized** — floating palette trigger button, swipe-down gesture to open palette, responsive layout that adapts to any screen size
- **🖱️ Draggable Settings Tabs** — click and drag the tab bar horizontally with your mouse. Touch scrolling also works on mobile. All 7 tabs always reachable
- **👋 Welcome Tour** — interactive 8-step tour shown every startup. Check "Don't show again" to permanently dismiss. Replay anytime via Settings → View tour
- **♿ Accessible** — keyboard navigation, focus rings, ARIA labels, screen-reader friendly

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
├── components/          # Shared UI components (Clock, DateDisplay, Icon, TextHighlight)
├── features/            # Domain modules (atomic design)
│   ├── CommandPalette/  # Palette input, autocomplete, overlay, keyboard handling
│   ├── Settings/        # Theme, accent (12 targets), profiles, search, services, clock, date
│   └── WelcomeTour/     # Interactive 8-step tour with "Don't show again"
├── hooks/               # Global reusable hooks
├── types/               # Global type definitions (Service)
├── utils/               # Pure utility functions (parseInput, url, keyboard)
└── App.tsx              # Root layout + global accent CSS effect
```

### Architecture

**Atomic Design** combined with **Bulletproof React** principles:

```
src/
├── components/
│   ├── atoms/        # Button, Input, Label, Badge...
│   ├── molecules/    # FormField, SearchBar, Card...
│   ├── organisms/    # Header, Sidebar, DataTable...
│   └── templates/    # PageLayout, AuthLayout...
├── features/         # Domain modules
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       ├── types/
│       └── index.ts
├── hooks/            # Global reusable hooks
├── lib/              # Library configurations
├── pages/            # Routes (template + feature composition)
├── types/            # Global types
└── utils/            # Pure utility functions
```

## Customization Guide

### Adding a Custom Search Engine
1. Open Settings → Search
2. Click "Add custom search engine"
3. Enter a label (e.g., "My Search"), URL template with `%s` for the query (e.g., `https://mysite.com/search?q=%s`), and an emoji icon
4. Click to select it as your default

### Adding a Custom Service
1. Open Settings → Services
2. Click "Add"
3. Enter an identifier key, display name, home URL, and colors
4. The service will appear in the command palette autocomplete

### Changing Accent Color
1. Open Settings → Appearance
2. Click any preset color or use the custom color picker
3. The accent color updates instantly across all 12 target elements

### Granular Accent Control
1. Open Settings → Accent
2. Toggle any of the 12 accent targets independently:
   - **Clock & Time**: clock digits, colon separator, text cursor
   - **Date**: date text
   - **Navigation**: interface icons, active tab underline
   - **Interactive**: toggle switches, range sliders, focus ring, button borders
   - **Surface**: scrollbar thumb, glass panel borders
3. Changes apply immediately

### Settings Profiles
1. Open Settings → Profiles
2. Click "Save current settings as profile" and give it a name
3. Click the star icon to set any profile as your **startup default** — it loads automatically every time you visit
4. Use the Load button to switch configurations on the fly
5. The built-in "Default (factory)" profile is always available and can't be deleted
6. Export all user profiles as JSON or import profiles from other devices

## Customization Options

| Setting | Location | Options |
|---|---|---|
| Theme | Appearance | Dark / Light |
| Accent Color | Appearance | 10 presets + custom color picker |
| Accent Targets (12) | Accent | Clock digits, colon, date, icons, tabs, toggles, sliders, focus ring, scrollbar, glass border, button border, caret |
| Glass Intensity | Appearance | Light / Medium / Strong |
| Background Dim | Appearance | 0–80% + auto blur |
| Settings Profiles | Profiles | Save / Load / Delete / Export / Import / Startup default |
| Default Search Engine | Search | 7 built-in + custom |
| User Search Engines | Search | Add / Edit / Delete |
| User Services | Services | Add / Edit / Delete |
| Clock Format | Clock | 12h / 24h, seconds, auto-hide, font size (3–8rem) |
| Date Format | Date | 12+ locales, 4 styles, day/year/caps, font size (0.5–3rem) |
| Tab Navigation | Settings tabs | Drag-to-scroll (mouse) + touch scroll + scrollbar (desktop) |
| Welcome Tour | Startup (or Settings → View tour) | 8-step tour, brand colors, "Don't show again", startup defaults |

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

## Performance

- **Lazy loaded** Settings panel (45 kB separate chunk)
- All leaf components wrapped with `React.memo`
- Zustand selectors optimized to prevent cascade re-renders
- `parseInput` call deduplicated — computed once per keystroke in parent
- Icon component uses direct JSX rendering instead of `createElement`
- CSS minimal — only used keyframes and utilities retained
- Production bundle: ~113 kB gzipped (main) + 10 kB (SettingsPanel)

## Deploy

Every push to `main` triggers an automatic deployment to GitHub Pages via the [provided workflow](.github/workflows/deploy.yml).

## License

[MIT](LICENSE)

<p align="center">made with ❤️</p>
