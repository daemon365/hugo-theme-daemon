# Daemon

[中文](README.zh-CN.md) | English

A minimal Hugo theme with Apple design aesthetics - clean, elegant, and beautiful.

![Hugo Version](https://img.shields.io/badge/Hugo-%3E%3D0.112.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎨 **Apple Design Style** - Minimal white theme with soft shadows and rounded corners
- 🔍 **Built-in Search** - Fast full-text search with keyboard shortcuts (Cmd/Ctrl + K)
- 📑 **TOC Auto-numbering** - Floating TOC panel with hierarchical numbering (1., 1.1, 1.2, etc.), iOS-style animations
- 📦 **Modular Architecture** - Componentized CSS/JS for easy maintenance and customization
- 💻 **Code Highlighting** - Light theme code blocks with one-click copy
- 📱 **Responsive Design** - Perfect support for mobile, tablet, and desktop
- ⚡ **Performance Optimized** - Lightweight and fast loading
- 🏷️ **Tags & Categories** - Complete taxonomy system
- 📦 **Archive Page** - Articles organized by year
- 🎭 **Frosted Glass Effect** - Header with backdrop-filter transparency
- 🎬 **Smooth Animations** - Micro-interactions for better UX
- 💬 **Comments System** - Utterances integration (GitHub Issues based)
- 📈 **Reading Progress** - Top progress bar showing scroll position
- 🔝 **Back to Top** - Button with scroll percentage
- ➗ **Math Rendering** - KaTeX support for mathematical formulas
- 🌍 **Multi-language** - i18n support (English & Chinese)
- 🔎 **SEO Optimized** - Open Graph, Twitter Card, JSON-LD structured data
- 📡 **RSS Feed** - Full content RSS support
- 📱 **PWA Support** - Progressive Web App with offline access and install to desktop

## 📸 Preview

### Homepage
Clean homepage design showcasing latest articles and personal information.

### Article Page
TOC on the right side with smooth scrolling and current section highlighting.

### Archive Page
Article list organized by year.

### Search Feature
Modal search with full-text retrieval.

## 🚀 Quick Start

### Installation

#### Method 1: Git Submodule (Recommended)

```bash
cd your-hugo-site
git submodule add https://github.com/daemon365/hugo-theme-daemon.git themes/hugo-theme-daemon
```

#### Method 2: Git Clone

```bash
cd your-hugo-site/themes
git clone https://github.com/daemon365/hugo-theme-daemon.git
```

#### Method 3: Download

Download the latest release and extract to `themes/hugo-theme-daemon` directory.

### Configuration

Add the following to your `hugo.toml` or `config.toml`:

```toml
baseURL = "https://yourdomain.com/"
languageCode = "en"
title = "Your Site Title"
theme = "hugo-theme-daemon"

enableEmoji = true
paginate = 10

[markup]
  [markup.highlight]
    style = "monokailight"
    lineNos = false
    lineNumbersInTable = false
    tabWidth = 4
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
  [markup.tableOfContents]
    startLevel = 2
    endLevel = 4
    ordered = false

[outputs]
  home = ["HTML", "RSS", "JSON"]

[taxonomies]
  tag = "tags"
  category = "categories"

[params]
  author = "Your Name"
  subtitle = "Your subtitle or motto"
  bio = "A brief introduction about yourself"
  
  avatar = "/imgs/avatar.png"
  # favicon = "/favicon.ico"  # Optional: place favicon.ico in static/ directory
  
  # PWA Icons (optional)
  icon192 = "/imgs/icon-192.png"  # 192x192 PNG
  icon512 = "/imgs/icon-512.png"  # 512x512 PNG
  
  [params.stats]
    posts = 100
    categories = 10
    tags = 50
  
  [params.rss]
    fullContent = true  # Output full content in RSS feed
  
  [params.social]
    github = "https://github.com/daemon365"
    email = "your-email@example.com"
```

### Create Content

#### Create a Post

```bash
hugo new post/my-first-post.md
```

Example front matter:

```yaml
---
title: "My First Post"
date: 2024-12-22T00:00:00+08:00
categories: ["tech"]
tags: ["hugo", "blog"]
---

Your content here...

<!--more-->

More content...
```

#### Create About Page

```bash
hugo new about.md
```

#### Create Archive Page

Create `content/archives.md`:

```yaml
---
title: "Archives"
layout: "archives"
---
```

### Run

```bash
hugo server -D
```

Visit `http://localhost:1313` to see your site.

## 📝 Content Organization

### Directory Structure

```
content/
├── about.md              # About page
├── archives.md           # Archive page
└── post/                 # Blog posts
    ├── go/
    │   ├── go-basics.md
    │   └── go-advanced.md
    └── web/
        └── web-dev.md
```

### Front Matter

Required fields:

```yaml
---
title: "Post Title"
date: 2024-12-22T00:00:00+08:00
---
```

Optional fields:

```yaml
---
categories: ["Category Name"]
tags: ["Tag1", "Tag2"]
description: "Post description"
---
```

## 🎨 Customization

### Colors

Modify CSS variables in `static/css/components/variables.css`:

```css
:root {
    --color-accent: #007aff;        /* Theme color */
    --color-bg: #ffffff;            /* Background color */
    --color-text: #1d1d1f;          /* Text color */
    /* ... more variables */
}
```

### Fonts

The theme uses system font stack for best performance and localization:

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, sans-serif;
```

To use custom fonts, add font imports in `layouts/partials/head.html`.

For the best Apple-style experience, use SF Pro font if available.

### Add Custom CSS

Create `static/css/custom.css` and reference it in `layouts/partials/head.html`:

```html
<link rel="stylesheet" href="{{ "css/custom.css" | relURL }}">
```

### Add Custom JavaScript

Create `static/js/custom.js` and reference it in `layouts/partials/footer.html`:

```html
<script src="{{ "js/custom.js" | relURL }}"></script>
```

## 📡 RSS Feed

The theme supports full RSS feed functionality with complete article content, categories, and tags.

### Configuration

Enable RSS in `hugo.toml`:

```toml
[outputs]
  home = ["HTML", "RSS", "JSON"]

[params.rss]
  fullContent = true  # Output full content, false for summary only
```

### RSS URLs

- Site RSS: `/index.xml`
- Category RSS: `/categories/category-name/index.xml`
- Tag RSS: `/tags/tag-name/index.xml`

The RSS link is available in the page header.

## 📱 PWA Support

The theme supports Progressive Web App (PWA) features, allowing installation to desktop and offline access.

### Features

- ✅ Installable to desktop (iOS, Android, desktop browsers)
- ✅ Offline access support
- ✅ Automatic static resource caching
- ✅ Elegant offline prompt page
- ✅ Background cache updates

### Configuration

Add PWA icons in `hugo.toml`:

```toml
[params]
  icon192 = "/imgs/icon-192.png"  # 192x192 PNG icon
  icon512 = "/imgs/icon-512.png"  # 512x512 PNG icon
```

### Icon Requirements

Prepare two sizes of PNG icons:
- **192x192** - For mobile devices and small icons
- **512x512** - For high-resolution devices and splash screens

Place icons in the `static/imgs/` directory.

### Service Worker

The Service Worker is automatically registered with caching strategies:
- **Static resources** (CSS, JS): Cache first, background update
- **HTML pages**: Network first, fallback to cache
- **Offline**: Show elegant offline prompt page

### Install App

Users can install via:
- **Desktop browsers**: Click the install icon in the address bar
- **Mobile browsers**: Use "Add to Home Screen" feature
- **iOS Safari**: Tap share button → Add to Home Screen

## 🔍 Search

Search functionality based on local JSON index with fuzzy search support.

### Keyboard Shortcuts

- `Cmd/Ctrl + K` - Open search
- `Escape` - Close search

### Configuration

Enable JSON output in `hugo.toml`:

```toml
[outputs]
  home = ["HTML", "RSS", "JSON"]
```

## ➗ Math Rendering

Theme supports KaTeX for rendering mathematical formulas.

### Enable Math

Enable globally in `hugo.toml`:

```toml
[params]
  math = true
```

Or enable per page in front matter:

```yaml
---
title: "Math Example"
math: true
---
```

### Usage

Inline math: `$E = mc^2$`

Block math:
```
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

## 💬 Comments

Theme supports Utterances (GitHub Issues-based comments).

### Configuration

```toml
[params.comments]
  enable = true
  active = "utterances"

[params.utterances]
  repo = "daemon365/your-repo"
  issueTerm = "pathname"
  label = "comments"
  theme = "preferred-color-scheme"
```

## 📊 Statistics

Busuanzi visitor counter integration.

### Configuration

```toml
[params.analytics]
  [params.analytics.busuanzi]
    enable = true
```

## 🌍 Multi-language

Theme supports multiple languages via Hugo's i18n system.

### Configuration

```toml
defaultContentLanguage = "en"

[languages]
  [languages.en]
    languageName = "English"
    weight = 1
  [languages.zh-cn]
    languageName = "简体中文"
    weight = 2
```

Supported languages:
- English (en)
- Simplified Chinese (zh-cn)

## 🔎 SEO

Theme includes comprehensive SEO optimization:

- Open Graph meta tags
- Twitter Card support
- JSON-LD structured data
- Canonical URLs
- XML sitemap

### Configuration

```toml
[params]
  description = "Your site description"
  keywords = ["blog", "hugo"]
  defaultImage = "/images/og-image.png"
  
  [params.social]
    twitter = "yourusername"
```

### Per-page SEO

```yaml
---
title: "Page Title"
description: "Page description for SEO"
image: "/images/page-image.png"
keywords: ["keyword1", "keyword2"]
noindex: false  # Set true to exclude from search engines
---
```

## 📦 Dependencies

Theme uses vanilla JavaScript with no external dependencies.

Optional CDN resources:
- **KaTeX** (v0.16.9) - Math rendering
- **Busuanzi** - Visitor statistics
- **Utterances** - GitHub-based comments

## 🛠️ Development

### Local Development

```bash
# Clone repository
git clone https://github.com/daemon365/hugo-theme-daemon.git
cd hugo-theme-daemon

# Enter example site
cd exampleSite

# Start Hugo server
hugo server --themesDir ../.. -D
```

### Build

```bash
hugo --minify
```

## 📋 Roadmap

- [x] Apple design aesthetics
- [x] Table of contents panel with auto-numbering
- [x] Modular CSS/JS architecture
- [x] Search functionality
- [x] Comments system (Utterances)
- [x] Site statistics (Busuanzi)
- [x] Reading progress bar
- [x] Math rendering (KaTeX)
- [x] Multi-language support
- [x] SEO optimization
- [x] RSS feed with full content
- [x] PWA support with offline mode
- [ ] Dark mode toggle
- [ ] More social icons
- [ ] RSS reader integration

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from [Apple](https://www.apple.com/)
- Built with [Hugo](https://gohugo.io/) static site generator
- Icons from [Feather Icons](https://feathericons.com/)
- Math rendering by [KaTeX](https://katex.org/)

## 📮 Contact

For issues or suggestions:

- Open an Issue
- Submit a Pull Request
- Contact: daemon365@foxmail.com

---

⭐ If this theme helps you, please give it a Star!

Made with ❤️ by [daemon365](https://github.com/daemon365)
