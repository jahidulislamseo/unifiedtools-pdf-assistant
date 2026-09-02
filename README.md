# UnifiedTools Pro - PDF & Document Assistant

A productivity-focused Chrome Extension to streamline document operations and integrate directly with UnifiedTools Pro utilities.

## Features

### 📄 Save Webpage as PDF
- Trigger native print/PDF export on the active browser tab with one click directly from the popup dashboard.

### 🖱️ Context Menu Shortcuts (Right-Click)
- **Text Selection:** Highlight text on any website, right-click, and select "Count Words & Analyze Text" to instantly open the text in UnifiedTools Pro's word-counter tool.
- **Image Files:** Right-click any image on the web and convert it via UnifiedTools Pro.
- **PDF Documents:** Right-click a PDF file link to instantly open and extract text from it.

### 📥 Drag & Drop Hub
- Drag a PDF or image file directly into the popup to open the file in the corresponding converter tool on `unifiedtoolspro.xyz`.

---

## Directory Structure

```text
unifiedtools-pdf-assistant/
├── manifest.json         # Manifest V3 Configuration
├── PRIVACY.md            # Privacy policy (Chrome Web Store requirement)
├── README.md             # Documentation
├── background/
│   └── service-worker.js # Background script for context menus
├── popup/
│   ├── popup.html        # Premium glassmorphic GUI Dashboard
│   ├── popup.css         # Style guide and micro-interactions
│   └── popup.js          # Control logic and event listeners
└── icons/
    ├── icon16.png        # Transparent brand icons
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

---

## Local Installation (For Testing)

1. Open Google Chrome.
2. Go to **`chrome://extensions/`**.
3. Toggle the **Developer mode** switch (top-right corner) to **ON**.
4. Click the **"Load unpacked"** button (top-left).
5. Select this `unifiedtools-pdf-assistant` folder.
6. Pin it to your Chrome toolbar and test right-click behaviors!
