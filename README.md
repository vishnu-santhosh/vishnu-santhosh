# Terminal Blog

A minimal, terminal-styled blog template built with React and Tailwind CSS. Perfect for engineers, developers, and anyone who loves the aesthetic of Linux kernel logs.

![Terminal Blog Preview](https://via.placeholder.com/800x400/0a0a0a/10b981?text=Terminal+Blog)

## Features

- **dmesg/Terminal Aesthetic**: Dark theme with terminal green (#10b981) accent
- **Markdown Articles**: Write in pure markdown with frontmatter
- **Auto-generated Routes**: Add a new .md file, rebuild, done
- **Boot Animation**: Terminal boot sequence on page load
- **Responsive**: Works on mobile, tablet, and desktop
- **SEO Friendly**: Server-rendered content
- **Auto-deploy**: GitHub Actions workflow included

## Quick Start

### Option 1: Use as GitHub Template

1. Click **"Use this template"** on this repository
2. Name your repository `{username}.github.io` for a user site, or any name for a project site
3. Clone your new repository
4. Edit `src/config.js` with your details
5. Push to main → auto-deploys to GitHub Pages

### Option 2: Local Development

```bash
# Clone your forked repo
git clone https://github.com/YOUR_USERNAME/your-repo.git
cd your-repo

# Install dependencies
npm install

# Start development server
npm run dev
```

## Configuration

All configuration is in `src/config.js`:

```javascript
export const siteConfig = {
  name: 'Your Name',
  tagline: 'Your tagline here.',
  username: 'your-github-username',
  role: 'Your Role',
  intro: `Hi, I'm Your Name.

I'm a software engineer and writer.

For the last few years I've been focused on...`,
  
  photoUrl: 'https://github.com/your-username.png',
  
  experience: [
    {
      period: '2024 → Present',
      role: 'Software Engineer',
      company: 'Company Name',
      link: 'https://company.com/',
      description: 'What you do'
    }
  ],
  
  otherPursuits: `Your other interests...`,
  
  social: {
    github: 'https://github.com/your-username',
    linkedin: 'https://linkedin.com/in/your-username',
    twitter: 'https://twitter.com/your-username',
    email: 'hello@example.com'
  },

  newsletter: {
    enabled: false,
    provider: 'buttondown',
    url: 'https://buttondown.email/your-username'
  }
};
```

## Adding Articles

1. Create a new `.md` file in the `content/` folder
2. Add frontmatter with title, date, and excerpt:

```markdown
---
title: "Your Article Title"
date: "2025-02-25"
excerpt: "A brief description of your article."
tags: ["linux", "kernel"]
---

# Your Article Heading

Your article content here...
```

3. Rebuild the project:

```bash
npm run build
```

4. Push to GitHub → auto-deploys

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Article title |
| `date` | Yes | Publication date (YYYY-MM-DD) |
| `excerpt` | Yes | Short description for listings |
| `tags` | No | Array of tags |

### Markdown Features

This template supports:
- **Headers**: `# H1`, `## H2`, `### H3`
- **Code blocks**: With language hints (` ```c `)
- **Lists**: Ordered and unordered
- **Bold/Italic**: `**bold**`, `*italic*`
- **Links**: `[text](url)`
- **Blockquotes**: `> quote`
- **Tables**: GFM tables

## Project Structure

```
/terminal-blog
├── content/              # Markdown articles (add new files here)
│   ├── 2025-02-25-article-1.md
│   └── 2025-02-20-article-2.md
├── src/
│   ├── config.js         # Site configuration
│   ├── pages/            # React pages
│   ├── components/       # React components
│   └── data/            # Generated content (auto)
├── scripts/
│   └── build-content.js # Markdown processor
└── .github/
    └── workflows/       # Auto-deploy workflow
```

## Customization

### Colors

Edit `src/index.css` to change colors:

```css
@theme {
  --color-terminal-green: #10b981;  /* Change accent color */
  --color-terminal-bg: #0a0a0a;    /* Change background */
}
```

### Fonts

The default font is JetBrains Mono. To change, edit the `@import` in `src/index.css`.

## Deployment

### GitHub Pages (Recommended)

1. Go to repository **Settings**
2. Navigate to **Pages**
3. Under **Source**, select **GitHub Actions**
4. Push any change to `main` branch
5. Workflow will automatically deploy

Your site will be available at:
- `https://your-username.github.io/` (if repo is named `{username}.github.io`)
- `https://your-username.github.io/repo-name/` (for other repo names)

> **Note:** If deploying to a subdirectory (e.g., `https://your-username.github.io/repo-name/`), edit `vite.config.js` and change `base: '/'` to `base: '/repo-name/'`, then rebuild and push.

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

Drag and drop the `dist` folder after building, or connect your repository.

## Updating from Template

To pull updates from the original template:

```bash
# Add the template as a remote
git remote add template https://github.com/your-username/terminal-blog.git

# Fetch and merge updates
git fetch template
git merge template/main

# Resolve any conflicts, then push
git push origin main
```

## License

MIT - Feel free to use this template for your own blog.

---

Built with React + Tailwind CSS + ❤️
