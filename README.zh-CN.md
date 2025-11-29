# Daemon

中文 | [English](README.md)

一个极简的 Hugo 主题，采用 Apple 设计风格 - 干净、优雅、美观。

![Hugo Version](https://img.shields.io/badge/Hugo-%3E%3D0.112.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ 特性

- 🎨 **Apple 设计风格** - 极简白色主题，柔和阴影和圆角设计
- 🔍 **内置搜索** - 快速全文搜索，支持键盘快捷键 (Cmd/Ctrl + K)
- 📑 **目录自动编号** - 浮动 TOC 面板，层级自动编号（1., 1.1, 1.2 等），iOS 风格动画
- 📦 **模块化架构** - CSS/JS 组件化，易于维护和自定义
- 💻 **代码高亮** - 浅色主题代码块，一键复制
- 📱 **响应式设计** - 完美支持移动端、平板和桌面
- ⚡ **性能优化** - 轻量快速加载
- 🏷️ **标签和分类** - 完整的分类系统
- 📦 **归档页面** - 按年份组织文章
- 🎭 **毛玻璃效果** - 头部带 backdrop-filter 透明效果
- 🎬 **流畅动画** - 微交互提升用户体验
- 💬 **评论系统** - Utterances 集成（基于 GitHub Issues）
- 📈 **阅读进度** - 顶部进度条显示滚动位置
- 🔝 **返回顶部** - 按钮显示滚动百分比
- ➗ **数学渲染** - KaTeX 支持数学公式
- 🌍 **多语言** - i18n 支持（英文和中文）
- 🔎 **SEO 优化** - Open Graph、Twitter Card、JSON-LD 结构化数据
- 📡 **RSS 订阅** - 完整内容 RSS 支持
- 📱 **PWA 支持** - 渐进式 Web 应用，支持离线访问和安装到桌面

## 📸 预览

### 主页
干净的主页设计，展示最新文章和个人信息。

### 文章页
右侧显示目录，支持平滑滚动和当前章节高亮。

### 归档页
按年份组织的文章列表。

### 搜索功能
模态框搜索，支持全文检索。

## 🚀 快速开始

### 安装

#### 方法 1：Git Submodule（推荐）

```bash
cd your-hugo-site
git submodule add https://github.com/daemon365/hugo-theme-daemon.git themes/hugo-theme-daemon
```

#### 方法 2：Git Clone

```bash
cd your-hugo-site/themes
git clone https://github.com/daemon365/hugo-theme-daemon.git
```

#### 方法 3：下载

下载最新版本并解压到 `themes/hugo-theme-daemon` 目录。

### 配置

将以下配置添加到你的 `hugo.toml` 或 `config.toml`：

```toml
baseURL = "https://yourdomain.com/"
languageCode = "zh-cn"
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
  # favicon = "/favicon.ico"  # 可选：需要将 favicon.ico 放到 static/ 目录
  
  # PWA 图标（可选）
  icon192 = "/imgs/icon-192.png"  # 192x192 PNG
  icon512 = "/imgs/icon-512.png"  # 512x512 PNG
  
  [params.stats]
    posts = 100
    categories = 10
    tags = 50
  
  [params.rss]
    fullContent = true  # RSS 输出完整内容
  
  [params.social]
    github = "https://github.com/daemon365"
    email = "your-email@example.com"
```

### 创建内容

#### 创建文章

```bash
hugo new post/my-first-post.md
```

文章前置元数据示例：

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

#### 创建关于页面

```bash
hugo new about.md
```

#### 创建归档页面

创建 `content/archives.md`：

```yaml
---
title: "Archives"
layout: "archives"
---
```

### 运行

```bash
hugo server -D
```

访问 `http://localhost:1313` 查看你的站点。

## 📝 内容组织

### 目录结构

```
content/
├── about.md              # 关于页面
├── archives.md           # 归档页面
└── post/                 # 博客文章
    ├── go/
    │   ├── go-basics.md
    │   └── go-advanced.md
    └── web/
        └── web-dev.md
```

### Front Matter

必需字段：

```yaml
---
title: "文章标题"
date: 2024-12-22T00:00:00+08:00
---
```

可选字段：

```yaml
---
categories: ["分类名"]
tags: ["标签1", "标签2"]
description: "文章描述"
---
```

## 🎨 自定义

### 颜色

在 `static/css/main.css` 中修改 CSS 变量：

```css
:root {
    --color-accent: #007aff;        /* 主题色 */
    --color-bg: #ffffff;            /* 背景色 */
    --color-text: #1d1d1f;          /* 文字颜色 */
    /* ... 更多变量 */
}
```

### 字体

主题使用系统字体栈，获得最佳性能和本地化支持：

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, sans-serif;
```

如需使用自定义字体，可以在 `layouts/partials/head.html` 中添加字体引入。

推荐使用 SF Pro 字体（如果可用）以获得最佳 Apple 风格体验。

### 添加自定义 CSS

创建 `static/css/custom.css` 并在 `layouts/partials/head.html` 中引入：

```html
<link rel="stylesheet" href="{{ "css/custom.css" | relURL }}">
```

### 添加自定义 JavaScript

创建 `static/js/custom.js` 并在 `layouts/partials/footer.html` 中引入：

```html
<script src="{{ "js/custom.js" | relURL }}"></script>
```

## 📡 RSS Feed

主题支持完整的 RSS 订阅功能，包含文章全文、分类和标签。

### 配置

在 `hugo.toml` 中启用 RSS：

```toml
[outputs]
  home = ["HTML", "RSS", "JSON"]

[params.rss]
  fullContent = true  # 输出完整内容，false 则只输出摘要
```

### RSS 地址

- 全站 RSS：`/index.xml`
- 分类 RSS：`/categories/分类名/index.xml`
- 标签 RSS：`/tags/标签名/index.xml`

订阅链接已添加到导航栏，点击 RSS 图标即可访问。

## 📱 PWA Support

主题支持渐进式 Web 应用（PWA），可以安装到桌面并支持离线访问。

### 功能特性

- ✅ 可安装到桌面（iOS、Android、桌面浏览器）
- ✅ 离线访问支持
- ✅ 自动缓存静态资源
- ✅ 优雅的离线提示页面
- ✅ 后台自动更新缓存

### 配置

在 `hugo.toml` 中添加 PWA 图标：

```toml
[params]
  icon192 = "/imgs/icon-192.png"  # 192x192 PNG 图标
  icon512 = "/imgs/icon-512.png"  # 512x512 PNG 图标
```

### 图标要求

准备两个尺寸的 PNG 图标：
- **192x192** - 用于移动设备和小图标
- **512x512** - 用于高分辨率设备和启动画面

将图标放置在 `static/imgs/` 目录。

### Service Worker

Service Worker 会自动注册，缓存策略：
- **静态资源**（CSS、JS）：优先使用缓存，后台更新
- **HTML 页面**：网络优先，失败时使用缓存
- **离线时**：显示优雅的离线提示页面

### 安装应用

用户可以通过以下方式安装：
- **桌面浏览器**：点击地址栏的安装图标
- **移动浏览器**：使用"添加到主屏幕"功能
- **iOS Safari**：点击分享按钮 → 添加到主屏幕

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
# 克隆仓库
git clone https://github.com/daemon365/hugo-theme-daemon.git
cd hugo-theme-daemon

# 进入示例站点
cd exampleSite

# 启动 Hugo 服务器
hugo server --themesDir ../.. -D
```

### 构建

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
- Contact: your-email@example.com

---

⭐ If this theme helps you, please give it a Star!

Made with ❤️ by [daemon365](https://github.com/daemon365)
