// =================================================================
// UnifiedTools Pro - PDF & Document Assistant - Popup Script
// Handles popup actions, drag-and-drop, and active tab print injection.
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
  const btnPrintPage = document.getElementById('btnPrintPage');
  const btnImportLocalPdf = document.getElementById('btnImportLocalPdf');
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');

  // Settings DOM References
  const btnToggleSettings = document.getElementById('btnToggleSettings');
  const btnCloseSettings = document.getElementById('btnCloseSettings');
  const settingsPanel = document.getElementById('settingsPanel');
  const settingTheme = document.getElementById('settingTheme');
  const settingFolder = document.getElementById('settingFolder');
  const settingCors = document.getElementById('settingCors');
  const settingMenus = document.getElementById('settingMenus');
  const settingsStatus = document.getElementById('settingsStatus');

  // About DOM References
  const btnToggleAbout = document.getElementById('btnToggleAbout');
  const btnCloseAbout = document.getElementById('btnCloseAbout');
  const aboutPanel = document.getElementById('aboutPanel');

  const BASE_URL = "https://unifiedtoolspro.xyz";

  // Check if viewing a local PDF on load to show import action
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (tab && tab.url) {
      const url = tab.url.toLowerCase();
      if (url.startsWith('file:///') && url.endsWith('.pdf')) {
        btnImportLocalPdf.style.display = 'flex';
        btnPrintPage.style.display = 'none'; // hide print page since it is already a PDF
      }
    }
  });

  // Handle local PDF import action click
  btnImportLocalPdf.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab || !tab.url) return;

      const res = await fetch(tab.url);
      const blob = await res.blob();

      const reader = new FileReader();
      reader.onload = function(event) {
        const filePayload = {
          name: tab.url.split('/').pop() || 'local.pdf',
          type: 'application/pdf',
          size: blob.size,
          data: event.target.result
        };

        chrome.storage.local.set({ pending_file: filePayload }, () => {
          chrome.tabs.create({ url: `${BASE_URL}/tools/pdf/editor?src=extension_transfer` });
          window.close();
        });
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error("Local PDF import failed:", err);
      alert("To import local files, please enable 'Allow access to file URLs' in Chrome settings:\n\n1. Open: chrome://extensions\n2. Click 'Details' on UnifiedTools Pro - PDF & Document Assistant\n3. Turn ON the 'Allow access to file URLs' switch.");
    }
  });

  // Load and apply settings
  chrome.storage.local.get(['settings_theme', 'settings_folder', 'settings_cors', 'settings_menus'], (result) => {
    const theme = result.settings_theme || 'dark';
    const folder = result.settings_folder || 'unifiedtools-pdf';
    const cors = result.settings_cors !== false;
    const menus = result.settings_menus !== false;

    // Apply theme on load
    document.body.classList.toggle('light-theme', theme === 'light');
    
    // Set inputs values
    settingTheme.value = theme;
    settingFolder.value = folder;
    settingCors.checked = cors;
    settingMenus.checked = menus;
  });

  // Toggle settings drawer panel visibility
  btnToggleSettings.addEventListener('click', () => {
    aboutPanel.classList.remove('show');
    settingsPanel.classList.add('show');
  });

  btnCloseSettings.addEventListener('click', () => {
    settingsPanel.classList.remove('show');
  });

  // Toggle about drawer panel visibility
  btnToggleAbout.addEventListener('click', () => {
    settingsPanel.classList.remove('show');
    aboutPanel.classList.add('show');
  });

  btnCloseAbout.addEventListener('click', () => {
    aboutPanel.classList.remove('show');
  });

  // Save Settings Helper
  function saveSettings(key, val, callback) {
    chrome.storage.local.set({ [key]: val }, () => {
      settingsStatus.classList.add('show');
      setTimeout(() => settingsStatus.classList.remove('show'), 1500);
      if (callback) callback();
    });
  }

  // Settings event listeners
  settingTheme.addEventListener('change', () => {
    const val = settingTheme.value;
    document.body.classList.toggle('light-theme', val === 'light');
    saveSettings('settings_theme', val);
  });

  settingFolder.addEventListener('input', () => {
    saveSettings('settings_folder', settingFolder.value.trim());
  });

  settingCors.addEventListener('change', () => {
    saveSettings('settings_cors', settingCors.checked);
  });

  settingMenus.addEventListener('change', () => {
    saveSettings('settings_menus', settingMenus.checked, () => {
      // Notify service worker background script to refresh menus
      chrome.runtime.sendMessage({ action: "updateContextMenus" });
    });
  });

  // 1. Webpage to PDF - Trigger native browser print on active tab (with Ad/Nav Clean Print)
  btnPrintPage.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab) return;
      
      // Inject clean print styling and trigger dialog
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const style = document.createElement('style');
          style.id = 'ut-clean-print';
          style.innerHTML = `
            @media print {
              header, footer, nav, aside, 
              .ads, .ad, [class*="ad-"], [class*="sidebar"], [id*="sidebar"], 
              [class*="nav"], [id*="nav"], [class*="menu"], [id*="menu"], 
              [class*="cookie"], [id*="cookie"], .no-print {
                display: none !important;
              }
              main, article, [class*="content"], [id*="content"], body {
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                background: transparent !important;
                color: #000 !important;
                box-shadow: none !important;
              }
            }
          `;
          document.head.appendChild(style);
          window.print();
          // Remove style after print dialog opens
          setTimeout(() => {
            const el = document.getElementById('ut-clean-print');
            if (el) el.remove();
          }, 1000);
        }
      });
      window.close(); // Close extension popup window
    } catch (err) {
      console.error("Print execution failed:", err);
      // Fallback
      window.print();
    }
  });

  // 2. Drag & Drop File Upload
  // Prevent default drag behaviors
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
  });

  // Highlight drop area when item is dragged over it
  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, () => {
      dropzone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, () => {
      dropzone.classList.remove('dragover');
    }, false);
  });

  // Handle dropped files
  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  });

  // Clicking dropzone opens file picker
  dropzone.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', () => {
    handleFiles(fileInput.files);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleFiles(files) {
    if (files.length === 0) return;

    // Handle multiple file drops (e.g., merging multiple PDFs or conversion of multiple images)
    if (files.length > 1) {
      const fileList = Array.from(files);
      const allPdfs = fileList.every(f => f.name.toLowerCase().endsWith('.pdf'));
      const allImages = fileList.every(f => /\.(png|jpe?g|webp|gif|svg)$/i.test(f.name));

      const filePromises = fileList.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({
              name: file.name,
              type: file.type,
              size: file.size,
              data: e.target.result
            });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(filePromises).then(payloads => {
        // Save multiple files array to local storage
        chrome.storage.local.set({ pending_files: payloads }, () => {
          if (allPdfs) {
            chrome.tabs.create({ url: `${BASE_URL}/tools/pdf/merger?src=extension_transfer` });
          } else if (allImages) {
            chrome.tabs.create({ url: `${BASE_URL}/tools/pdf/jpg-to-pdf?src=extension_transfer` });
          } else {
            chrome.tabs.create({ url: BASE_URL });
          }
          window.close();
        });
      });
      return;
    }

    const file = files[0];
    const fileName = file.name.toLowerCase();

    // Read the file as a Base64 data URL
    const reader = new FileReader();
    reader.onload = function(event) {
      const base64Data = event.target.result;
      const filePayload = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: base64Data
      };

      // Save file payload to chrome local storage
      chrome.storage.local.set({ pending_file: filePayload }, () => {
        // Redirect to the correct tool based on file format
        if (fileName.endsWith('.pdf')) {
          chrome.tabs.create({ url: `${BASE_URL}/tools/pdf/editor?src=extension_transfer` });
        } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx') || fileName.endsWith('.txt')) {
          chrome.tabs.create({ url: `${BASE_URL}/tools/pdf-to-text?src=extension_transfer` });
        } else if (/\.(png|jpe?g|webp|gif|svg)$/i.test(fileName)) {
          chrome.tabs.create({ url: `${BASE_URL}/tools/pdf/jpg-to-pdf?src=extension_transfer` });
        } else {
          // General fallback to homepage
          chrome.tabs.create({ url: BASE_URL });
        }
        window.close();
      });
    };
    
    reader.readAsDataURL(file);
  }
});
