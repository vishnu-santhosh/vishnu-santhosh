# Terminal Blog - Project Task Plan

## Project Overview
- **Project Name**: Terminal Blog
- **Type**: Static blog website (GitHub Pages)
- **Core Functionality**: A minimal, terminal-styled blog template with Linux kernel/dmesg aesthetic
- **Tech Stack**: React 19 + Tailwind CSS 4 + Vite 7 + React Router 7

---

## Goal Statement
Create a planning document for understanding, maintaining, and potentially enhancing this terminal-styled blog template. Document the architecture, identify potential improvements, and track any work done on the project.

---

## Phases

### Phase 1: Project Analysis
- [x] Explore project structure
- [x] Review configuration system
- [x] Understand build pipeline
- [x] Document architecture

**Status**: complete

### Phase 2: Feature Documentation
- [ ] Document existing features
- [ ] Map content flow (markdown → JSON → React)
- [ ] Review styling system

**Status**: pending

### Phase 3: Enhancement Planning (Optional)
- [ ] Identify potential improvements
- [ ] Prioritize features
- [ ] Create enhancement specs

**Status**: pending

---

## Key Findings

### Architecture
- Static site generator using markdown files in `content/`
- Build script (`scripts/build-content.js`) processes markdown to JSON
- React Router handles client-side routing
- Tailwind CSS 4 with custom theme variables

### Content Pipeline
1. Markdown files in `content/` with frontmatter
2. Build script parses with gray-matter
3. Converts to HTML with remark + rehype
4. Outputs to `src/data/articles.json`
5. React components consume JSON at build time

### Routes
- `/` - Home (article list)
- `/articles` - Writing/Articles page
- `/articles/:slug` - Individual article
- `/about` - About page

### Styling
- Primary: Terminal green (#10b981)
- Background: #0a0a0a (near black)
- Font: JetBrains Mono
- Effects: Scanlines overlay, text glow, cursor blink

---

## Errors Encountered
None yet - project is in analysis phase.

---

## Notes
- Project was originally created as a GitHub template
- Already has deployment workflow (GitHub Actions)
- 3 sample articles included (Linux kernel topics)
- No database - purely static content

---

## Next Steps
1. Complete Phase 2 (Feature Documentation)
2. Consider if any enhancements are needed
3. Update config.js with actual user details (if deploying)
