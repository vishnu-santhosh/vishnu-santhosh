# Terminal Blog - Findings

## Project Structure

```
terminal-blog/
├── content/                    # Markdown articles (source)
│   ├── 2025-01-05-debugging-kernel-panics.md
│   ├── 2025-01-10-deep-dive-into-proc-filesystem.md
│   └── 2025-01-15-understanding-linux-system-calls.md
├── src/
│   ├── components/            # React components
│   │   ├── BootSequence.jsx   # Terminal boot animation
│   │   ├── Logo.jsx
│   │   └── Nav.jsx
│   ├── pages/                 # Route pages
│   │   ├── Home.jsx
│   │   ├── Writing.jsx        # /articles
│   │   ├── Article.jsx       # /articles/:slug
│   │   └── About.jsx
│   ├── data/                  # Generated (by build-content.js)
│   │   └── articles.json
│   ├── config.js              # Site configuration
│   ├── App.jsx                # Main app with routing
│   ├── index.css              # Tailwind + custom styles
│   └── main.jsx               # Entry point
├── scripts/
│   └── build-content.js       # Markdown → JSON processor
├── .github/workflows/
│   └── deploy.yml              # GitHub Pages deployment
├── package.json
├── vite.config.js
└── index.html
```

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 19.2.0 |
| Router | react-router-dom | 7.13.1 |
| Styling | Tailwind CSS | 4.2.1 |
| Build | Vite | 7.3.1 |
| Markdown | remark | 15.0.1 |
| Markdown | remark-gfm | 4.0.1 |
| Markdown | remark-html | 16.0.1 |
| Syntax | rehype-highlight | 7.0.2 |
| Frontmatter | gray-matter | 4.0.3 |

## Content Pipeline Details

### Build Script (`scripts/build-content.js`)

1. Reads all `.md` files from `content/` directory
2. Uses `gray-matter` to parse frontmatter + content
3. Processes markdown with:
   - `remark-gfm` - GitHub Flavored Markdown
   - `remark-html` - Convert to HTML
   - `rehype-highlight` - Code syntax highlighting
4. Extracts date, generates slug from filename
5. Formats date as "Month Day" (e.g., "Jan 15")
6. Sorts articles by date (newest first)
7. Outputs to `src/data/articles.json`

### Frontmatter Schema

```yaml
---
title: "Article Title"
date: "2025-01-15"
excerpt: "Short description for listings."
tags: ["linux", "kernel"]
---
```

| Field | Required | Type |
|-------|----------|------|
| title | Yes | string |
| date | Yes | YYYY-MM-DD |
| excerpt | Yes | string |
| tags | No | string[] |

## Styling System

### CSS Variables (Tailwind @theme)
- `--color-terminal-bg`: #0a0a0a
- `--color-terminal-green`: #10b981
- `--color-terminal-cyan`: #22d3ee
- `--color-terminal-blue`: #3b82f6
- `--color-terminal-amber`: #f59e0b
- `--color-terminal-red`: #ef4444

### Visual Effects
- **Scanlines**: Repeating linear gradient overlay
- **Glow**: Text shadow with green glow
- **Blink**: Cursor blink animation (1s step-end)
- **Selection**: Green background, dark text

### Syntax Highlighting
Custom theme matching terminal aesthetic (One Dark / Dracula inspired)

## Configuration

### Site Config (`src/config.js`)
```javascript
export const siteConfig = {
  name: 'Your Name',
  tagline: 'Your tagline here.',
  username: 'your-github-username',
  role: 'Your Role',
  intro: '...',
  photoUrl: 'https://github.com/your-username.png',
  experience: [...],
  otherPursuits: '...',
  social: { github, linkedin, twitter, email },
  newsletter: { enabled, provider, url }
};

export const navigation = [
  { path: '/', label: 'home' },
  { path: '/articles', label: 'articles' },
  { path: '/about', label: 'about' }
];
```

## Deployment

- **Platform**: GitHub Pages
- **Workflow**: GitHub Actions (`.github/workflows/deploy.yml`)
- **Build Command**: `npm run build`
- **Output**: `dist/` directory
- **Base Path**: Configurable in `vite.config.js`

## Sample Content

3 articles included demonstrating Linux systems topics:
1. "Debugging Kernel Panics" - Jan 5, 2025
2. "Deep Dive into /proc Filesystem" - Jan 10, 2025
3. "Understanding Linux System Calls" - Jan 15, 2025
