// =================================================================
// UnifiedTools Pro - PDF & Document Assistant - Service Worker
// Handles background context menus and deep linking integrations.
// =================================================================

const BASE_URL = "https://unifiedtoolspro.xyz";

function createMenus() {
  chrome.storage.local.get(['settings_menus'], (result) => {
    const enabled = result.settings_menus !== false;
    if (!enabled) return;

    // Parent menu item
    chrome.contextMenus.create({
      id: "unifiedToolsParent",
      title: "UnifiedTools Pro",
      contexts: ["all"]
    });

    // 1. Text Selection context menu (Child)
    chrome.contextMenus.create({
      id: "analyzeText",
      parentId: "unifiedToolsParent",
      title: "📝 Count Words & Analyze Text",
      contexts: ["selection"]
    });

    // 1b. Check Readability context menu (Child)
    chrome.contextMenus.create({
      id: "checkReadability",
      parentId: "unifiedToolsParent",
      title: "📖 Check Readability",
      contexts: ["selection"]
    });

    // 1c. Analyze Keyword Density context menu (Child)
    chrome.contextMenus.create({
      id: "analyzeKeywordDensity",
      parentId: "unifiedToolsParent",
      title: "📊 Analyze Keyword Density",
      contexts: ["selection"]
    });

    // 2. Image context menu (Child)
    chrome.contextMenus.create({
      id: "convertImage",
      parentId: "unifiedToolsParent",
      title: "🖼️ Convert Image Format",
      contexts: ["image"]
    });

    // 3. Link context menu for PDF files (Child)
    chrome.contextMenus.create({
      id: "extractPdfLink",
      parentId: "unifiedToolsParent",
      title: "📄 Extract Text from PDF Link",
      contexts: ["link"],
      targetUrlPatterns: ["*://*/*.pdf", "*://*/*.pdf?*", "*://*/pdf/*"]
    });

    // 3b. Compress PDF context menu (Child)
    chrome.contextMenus.create({
      id: "compressPdfLink",
      parentId: "unifiedToolsParent",
      title: "🗜️ Compress PDF Link",
      contexts: ["link"],
      targetUrlPatterns: ["*://*/*.pdf", "*://*/*.pdf?*", "*://*/pdf/*"]
    });

    // 3c. Add Watermark to PDF context menu (Child)
    chrome.contextMenus.create({
      id: "watermarkPdfLink",
      parentId: "unifiedToolsParent",
      title: "🏷️ Add Watermark to PDF Link",
      contexts: ["link"],
      targetUrlPatterns: ["*://*/*.pdf", "*://*/*.pdf?*", "*://*/pdf/*"]
    });

    // 3d. Protect PDF context menu (Child)
    chrome.contextMenus.create({
      id: "protectPdfLink",
      parentId: "unifiedToolsParent",
      title: "🔒 Protect PDF (Encrypt)",
      contexts: ["link"],
      targetUrlPatterns: ["*://*/*.pdf", "*://*/*.pdf?*", "*://*/pdf/*"]
    });

    // 3e. Unlock PDF context menu (Child)
    chrome.contextMenus.create({
      id: "unlockPdfLink",
      parentId: "unifiedToolsParent",
      title: "🔓 Unlock PDF (Decrypt)",
      contexts: ["link"],
      targetUrlPatterns: ["*://*/*.pdf", "*://*/*.pdf?*", "*://*/pdf/*"]
    });

    // 3f. Split PDF context menu (Child)
    chrome.contextMenus.create({
      id: "splitPdfLink",
      parentId: "unifiedToolsParent",
      title: "✂️ Split PDF Pages",
      contexts: ["link"],
      targetUrlPatterns: ["*://*/*.pdf", "*://*/*.pdf?*", "*://*/pdf/*"]
    });

    // 3g. Edit PDF context menu (Child)
    chrome.contextMenus.create({
      id: "editPdfLink",
      parentId: "unifiedToolsParent",
      title: "✏️ Edit PDF with UnifiedTools Pro",
      contexts: ["link"],
      targetUrlPatterns: ["*://*/*.pdf", "*://*/*.pdf?*", "*://*/pdf/*"]
    });
  });
}

// On installation, create the context menus
chrome.runtime.onInstalled.addListener(() => {
  createMenus();
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "analyzeText" && info.selectionText) {
    const text = encodeURIComponent(info.selectionText.trim());
    const targetUrl = `${BASE_URL}/tools/seo/word-counter?input_text=${text}`;
    chrome.tabs.create({ url: targetUrl });
  }

  else if (info.menuItemId === "checkReadability" && info.selectionText) {
    const text = encodeURIComponent(info.selectionText.trim());
    const targetUrl = `${BASE_URL}/tools/seo/readability-checker?input_text=${text}`;
    chrome.tabs.create({ url: targetUrl });
  }

  else if (info.menuItemId === "analyzeKeywordDensity" && info.selectionText) {
    const text = encodeURIComponent(info.selectionText.trim());
    const targetUrl = `${BASE_URL}/tools/seo/keyword-density?input_text=${text}`;
    chrome.tabs.create({ url: targetUrl });
  }

  else if (info.menuItemId === "convertImage" && info.srcUrl) {
    const imgUrl = encodeURIComponent(info.srcUrl);
    const targetUrl = `${BASE_URL}/tools/image-converter?img_url=${imgUrl}`;
    chrome.tabs.create({ url: targetUrl });
  }

  else if (info.menuItemId === "extractPdfLink" && info.linkUrl) {
    const pdfUrl = encodeURIComponent(info.linkUrl);
    const targetUrl = `${BASE_URL}/tools/pdf-to-text?pdf_url=${pdfUrl}`;
    chrome.tabs.create({ url: targetUrl });
  }

  else if (info.menuItemId === "compressPdfLink" && info.linkUrl) {
    const pdfUrl = encodeURIComponent(info.linkUrl);
    const targetUrl = `${BASE_URL}/tools/pdf/compressor?pdf_url=${pdfUrl}`;
    chrome.tabs.create({ url: targetUrl });
  }

  else if (info.menuItemId === "watermarkPdfLink" && info.linkUrl) {
    const pdfUrl = encodeURIComponent(info.linkUrl);
    const targetUrl = `${BASE_URL}/tools/pdf/watermark?pdf_url=${pdfUrl}`;
    chrome.tabs.create({ url: targetUrl });
  }

  else if (info.menuItemId === "protectPdfLink" && info.linkUrl) {
    const pdfUrl = encodeURIComponent(info.linkUrl);
    const targetUrl = `${BASE_URL}/tools/pdf/password-protector?pdf_url=${pdfUrl}`;
    chrome.tabs.create({ url: targetUrl });
  }

  else if (info.menuItemId === "unlockPdfLink" && info.linkUrl) {
    const pdfUrl = encodeURIComponent(info.linkUrl);
    const targetUrl = `${BASE_URL}/tools/pdf/password-remover?pdf_url=${pdfUrl}`;
    chrome.tabs.create({ url: targetUrl });
  }

  else if (info.menuItemId === "splitPdfLink" && info.linkUrl) {
    const pdfUrl = encodeURIComponent(info.linkUrl);
    const targetUrl = `${BASE_URL}/tools/pdf/splitter?pdf_url=${pdfUrl}`;
    chrome.tabs.create({ url: targetUrl });
  }

  else if (info.menuItemId === "editPdfLink" && info.linkUrl) {
    const pdfUrl = encodeURIComponent(info.linkUrl);
    const targetUrl = `${BASE_URL}/tools/pdf/editor?pdf_url=${pdfUrl}`;
    chrome.tabs.create({ url: targetUrl });
  }
});

// Helper to convert ArrayBuffer to Base64 safely in background worker
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Handle messaging from content script (CORS Bypass Engine)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "corsFetch" && request.url) {
    fetch(request.url)
      .then(res => {
        const contentType = res.headers.get("content-type") || "";
        return res.arrayBuffer().then(buffer => {
          const base64Data = arrayBufferToBase64(buffer);
          return { type: "binary", data: base64Data, mime: contentType };
        });
      })
      .then(result => sendResponse({ success: true, result }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true; // Keep response channel open for async callback
  }
  
  else if (request.action === "updateContextMenus") {
    chrome.contextMenus.removeAll(() => {
      createMenus();
    });
    sendResponse({ success: true });
    return false;
  }
});
