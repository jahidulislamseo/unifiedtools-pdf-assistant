# 🚀 UnifiedTools Pro — PDF & Document Assistant

> **High-performance Manifest V3 Chrome Extension to convert cluttered webpages into pristine print PDFs, bridge local documents to UnifiedTools Pro editing suites, and automate document workflows with 10+ right-click context shortcuts. 100% client-side execution with zero cloud telemetry.**

<div align="center">

[![🌐 Live Landing Page](https://img.shields.io/badge/🌐_Live_Website-GitHub_Pages-ef4444.svg?style=for-the-badge)](https://jahidulislamseo.github.io/unifiedtools-pdf-assistant/)
[![Download ZIP](https://img.shields.io/badge/📦_Download-v1.0.0_(46_KB)-f59e0b.svg?style=for-the-badge)](https://github.com/jahidulislamseo/unifiedtools-pdf-assistant/releases/download/v1.0.0/unifiedtools-pdf-assistant-v1.0.0.zip)
[![Manifest V3](https://img.shields.io/badge/Architecture-Manifest_V3-10b981.svg?style=for-the-badge)]()
[![Platform](https://img.shields.io/badge/Browser-Chrome_%7C_Brave_%7C_Edge_%7C_Opera-3b82f6.svg?style=for-the-badge)]()
[![Privacy](https://img.shields.io/badge/Telemetry-0_Trackers_%7C_100%25_Local-purple.svg?style=for-the-badge)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/jahidulislamseo/unifiedtools-pdf-assistant?style=for-the-badge)](https://github.com/jahidulislamseo/unifiedtools-pdf-assistant/stargazers)

<p align="center">
  <a href="#-why-this-exists-the-problem">Why This Exists</a> •
  <a href="#-1-click-instant-installation">Fast Install</a> •
  <a href="#-how-this-helps-you-real-world-benefits">How It Helps You</a> •
  <a href="#-core-engineering-features">Core Features</a> •
  <a href="#-deep-technical-architecture">Technical Architecture</a> •
  <a href="#-context-menu-shortcuts-right-click">Context Menus</a> •
  <a href="#-contributing--community">Contributing</a>
</p>

</div>

---

## 💥 Why This Exists: The Problem With Standard Web Printing

When researching or archiving web articles, saving a webpage to PDF using default browser printing is frustrating:
- ❌ **Bloated With Clutter:** Standard `window.print()` captures sticky navigation menus, animated video sidebars, cookie consent popups, and ad banners.
- ❌ **Cloud Upload Risk:** Online converters demand uploading confidential contracts, invoices, and sensitive documents to third-party cloud servers.
- ❌ **Friction & Wasted Time:** Extracting text from a PDF link or counting words on a page requires downloading the file, opening separate software, and manually uploading.
- ❌ **Hidden Telemetry:** Most browser extensions embed background analytics, user session trackers, and ad-injectors.

### 🛡️ The UnifiedTools Pro Solution: Client-Side DOM Rigor
**UnifiedTools Pro PDF Assistant** solves this directly at the browser rendering layer. Built on modern **Google Chrome Manifest V3**, it strips DOM noise before triggering print spooling, passes local documents to browser editing tools via in-memory `DataTransfer` buffers, and provides 10 right-click shortcuts—**with 0 bytes of external telemetry**.

---

## ⚡ 1-Click Instant Installation

You can install and run the extension in under 60 seconds.

### Option A: 1-Click ZIP Download (Recommended)
1. **Download the archive:** [unifiedtools-pdf-assistant-v1.0.0.zip](https://github.com/jahidulislamseo/unifiedtools-pdf-assistant/releases/download/v1.0.0/unifiedtools-pdf-assistant-v1.0.0.zip) *(46 KB)*.
2. Extract the `.zip` archive on your computer.
3. Open your browser and navigate to: `chrome://extensions`
4. Toggle **Developer mode** (top-right corner) to **ON**.
5. Click **Load unpacked** (top-left) and select the extracted folder.
6. Pin **UnifiedTools Pro** to your Chrome toolbar!

### Option B: Terminal / Git Clone (For Developers)
```bash
# 1. Clone repository
git clone https://github.com/jahidulislamseo/unifiedtools-pdf-assistant.git

# 2. Open extensions manager in Chrome
open -a "Google Chrome" chrome://extensions

# 3. Toggle Developer mode ON -> Click [Load unpacked] -> Select folder
```

---

## 🌟 How This Helps You (Real-World Benefits)

| User Persona | Before Using This Extension | With UnifiedTools Pro PDF Assistant |
| :--- | :--- | :--- |
| **🔬 Researchers & Students** | Multi-page PDFs filled with floating ad banners, cookie notices, and broken sidebars. | **Clean 1-Click PDF Export:** Injects targeted print CSS that suppresses all layout clutter and produces pristine, publication-ready PDFs. |
| **✍️ Writers & SEO Specialists** | Copying text, switching tabs, and opening external word counters to measure length. | **Highlight & Right-Click:** Instant context-menu routing directly into Word Counter, Readability Auditor, or Keyword Density tools. |
| **💼 Legal & Business Teams** | Uploading private client NDAs and financial PDFs to suspicious free conversion websites. | **100% In-Memory Transfer:** Drops files locally into browser tools using Base64 buffers without uploading to external storage. |
| **💻 Web Developers** | Opening dev tools to delete sticky navbars and modal overlays before printing documentation. | **Automated DOM Sanitization:** Zero manual style overrides; automated cleanup runs in sandbox tabs and unmounts after spooling. |

---

## 🚀 Core Engineering Features

### 1. 📄 DOM-Stripped Native Webpage-to-PDF
Standard printing includes headers, footers, fixed position menus, and ad banners. UnifiedTools Pro dynamically injects a tailored `@media print` style sheet on click:
- Hides elements matching `header`, `footer`, `nav`, `aside`, `.ad`, `[class*="sidebar"]`, and cookie banners.
- Expands the primary content container to 100% viewport width with clean typography.
- Fires native `window.print()` and automatically purges the injected stylesheet after 1,000ms.

### 2. 📥 In-Memory Drag & Drop File Bridge
Drop any PDF, document, or image into the extension popup:
- **Single PDF File:** Directs straight to the visual PDF Editor with pre-loaded data.
- **Multiple PDF Files:** Automatically bundles multiple files and dispatches them to the PDF Merger.
- **Image Files (.jpg, .png, .webp):** Automatically routes to the JPG-to-PDF compiler.
- Data transfers through `chrome.storage.local` with immediate cleanup to prevent memory leaks.

### 3. 🖱️ 10 Right-Click Context Menu Shortcuts
Access deep document tooling from any webpage without opening a new window:
- **Highlighted Text:** Count Words, Check Readability, Analyze Keyword Density.
- **PDF Links on Web:** Extract Text from PDF Link, Compress PDF Link, Add Watermark, Protect PDF, Unlock PDF, Split PDF.
- **Web Images:** Convert Image Format with one right-click.

### 4. 🔒 Zero-Telemetry Local Privacy
- No third-party analytics (No Google Analytics, Mixpanel, or Segment).
- No account registration or login required.
- No network requests made except user-initiated navigation to [unifiedtoolspro.xyz](https://unifiedtoolspro.xyz).

---

## 🧠 Deep Technical Architecture

```text
┌──────────────────────────────────────────────────────────────────┐
│                   UnifiedTools Pro Architecture                  │
└──────────────────────────────────────────────────────────────────┘
            │
            ├─► [Popup Dashboard] ─── (popup.html / popup.js / popup.css)
            │      ├─ Clean Print Trigger
            │      ├─ Drag & Drop Dropzone (Single / Multiple)
            │      ├─ Settings Drawer (Dark/Light theme, Subfolder)
            │      └─ Quick Links to 101+ Webmaster Tools
            │
            ├─► [Background Service Worker] ─── (service-worker.js)
            │      ├─ Programmatic ContextMenus Builder (10 handlers)
            │      ├─ Cross-Origin Binary Fetch Bridge (ArrayBuffer to Base64)
            │      └─ Tab Dispatch Engine
            │
            └─► [Content Script Bridge] ─── (content.js)
                   ├─ DataTransfer File Payload Injector
                   └─ Cross-Origin Window Message Bridge
```

### Technical Specifications Matrix

| Module | Specification | Standard Reference |
| :--- | :--- | :--- |
| **Manifest Version** | Manifest V3 (Service Worker) | [Google Chrome MV3 Spec](https://developer.chrome.com/docs/extensions/mv3/intro/) |
| **Runtime Target** | Chromium 102+ (Google Chrome, Brave, Microsoft Edge, Opera) | [Chromium Project](https://www.chromium.org/) |
| **Permissions Scope** | `activeTab`, `scripting`, `contextMenus`, `tabs`, `storage` | Principle of Least Privilege |
| **Data Retention** | 0 bytes transmitted to external telemetry servers | 100% Client-Side Sandbox |
| **Binary Protocol** | Binary-safe `ArrayBuffer` & `DataTransfer` injection | W3C File API |
| **License** | MIT License | Open Source |

---

## 🖱️ Context Menu Shortcuts (Right-Click)

| Context | Action Title | Target Endpoint |
| :--- | :--- | :--- |
| **Text Selection** | 📝 Count Words & Analyze Text | `unifiedtoolspro.xyz/tools/seo/word-counter` |
| **Text Selection** | 📖 Check Readability | `unifiedtoolspro.xyz/tools/seo/readability-checker` |
| **Text Selection** | 📊 Analyze Keyword Density | `unifiedtoolspro.xyz/tools/seo/keyword-density` |
| **Image Element** | 🖼️ Convert Image Format | `unifiedtoolspro.xyz/tools/image-converter` |
| **Direct PDF Link** | 📄 Extract Text from PDF Link | `unifiedtoolspro.xyz/tools/pdf-to-text` |
| **Direct PDF Link** | 🗜️ Compress PDF Link | `unifiedtoolspro.xyz/tools/pdf/compressor` |
| **Direct PDF Link** | 🏷️ Add Watermark to PDF Link | `unifiedtoolspro.xyz/tools/pdf/watermark` |
| **Direct PDF Link** | 🔒 Protect PDF (Encrypt) | `unifiedtoolspro.xyz/tools/pdf/password-protector` |
| **Direct PDF Link** | 🔓 Unlock PDF (Decrypt) | `unifiedtoolspro.xyz/tools/pdf/password-remover` |
| **Direct PDF Link** | ✂️ Split PDF Pages | `unifiedtoolspro.xyz/tools/pdf/splitter` |

---

## 📁 Directory Structure

```text
unifiedtools-pdf-assistant/
├── manifest.json                     # Chrome Manifest V3 configuration
├── index.html                        # Public Landing Page & Live Simulator
├── robots.txt                        # Search Engine Crawler Directives
├── sitemap.xml                       # XML Sitemap for Search Engines
├── .nojekyll                         # GitHub Pages Jekyll bypass
├── PRIVACY.md                        # Formal Privacy Policy (Store compliant)
├── README.md                         # Project documentation
├── unifiedtools-pdf-assistant-v1.0.0.zip # Distribution ZIP package
├── background/
│   └── service-worker.js             # Context menu & background messaging
├── content/
│   └── content.js                    # File injection into dropzones
├── popup/
│   ├── popup.html                    # Glassmorphic GUI dashboard
│   ├── popup.css                     # Stylesheet & micro-interactions
│   └── popup.js                      # Popup controller & event handlers
├── docs/
│   └── landing-page-copy.md          # SEO-optimized documentation copy
└── icons/
    ├── icon16.png                    # Brand assets
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

---

## 🤝 Contributing & Community

Contributions are welcomed! If you would like to improve features, add new tool bridges, or optimize print stylesheets:

1. **Fork the Repository** on GitHub.
2. **Create a Feature Branch:** `git checkout -b feature/awesome-feature`
3. **Commit your changes:** `git commit -m "feat: add awesome feature"`
4. **Push to the branch:** `git push origin feature/awesome-feature`
5. **Open a Pull Request** explaining your enhancements.

---

## 📜 License & Author

Released under the **[MIT License](LICENSE)**. Free to use, modify, and distribute for personal and commercial workflows.

**Developed with ❤️ by [Jahidul Islam](https://github.com/jahidulislamseo)**  
*Senior SEO Specialist, CMS Architect & Full-Stack Developer*

⭐ **If you find this extension helpful, please give it a Star on GitHub!** ⭐