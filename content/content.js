// =================================================================
// UnifiedTools Pro - PDF & Document Assistant - Content Script
// Automatically feeds files passed from the extension into the webpage's dropzone.
// =================================================================

(function() {
  'use strict';

  // Check if we came from extension file transfer
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('src') === 'extension_transfer') {
    // Wait for the page file input to be ready
    const interval = setInterval(() => {
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        clearInterval(interval);
        
        // Retrieve file payload from chrome storage
        chrome.storage.local.get(['pending_file', 'pending_files'], (result) => {
          const payload = result.pending_file;
          const payloads = result.pending_files;

          if (payloads && payloads.length > 0) {
            // Clear storage immediately to prevent loop
            chrome.storage.local.remove('pending_files');

            try {
              const dataTransfer = new DataTransfer();

              payloads.forEach(pay => {
                const base64Parts = pay.data.split(',');
                const mime = base64Parts[0].match(/:(.*?);/)[1];
                const bstr = atob(base64Parts[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);
                while (n--) {
                  u8arr[n] = bstr.charCodeAt(n);
                }
                const blob = new Blob([u8arr], { type: mime });
                const file = new File([blob], pay.name, { type: mime });
                dataTransfer.items.add(file);
              });

              // Assign files list to the input
              fileInput.files = dataTransfer.files;
              
              // Trigger change event to notify React / dropzone handlers
              fileInput.dispatchEvent(new Event('change', { bubbles: true }));
              console.log("Multiple files loaded successfully!");
            } catch (err) {
              console.error("Failed to parse and load multiple files:", err);
            }
          }
          else if (payload) {
            // Clear storage immediately to prevent loop
            chrome.storage.local.remove('pending_file');

            try {
              // Convert base64 data URL back to Blob/File
              const base64Parts = payload.data.split(',');
              const mime = base64Parts[0].match(/:(.*?);/)[1];
              const bstr = atob(base64Parts[1]);
              let n = bstr.length;
              const u8arr = new Uint8Array(n);
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
              const blob = new Blob([u8arr], { type: mime });
              const file = new File([blob], payload.name, { type: mime });

              // Construct DataTransfer payload
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(file);
              
              // Assign files list to the input
              fileInput.files = dataTransfer.files;
              
              // Trigger change event to notify React / dropzone handlers
              fileInput.dispatchEvent(new Event('change', { bubbles: true }));
              console.log("File transferred from extension and loaded successfully!");
            } catch (err) {
              console.error("Failed to parse and load file from extension:", err);
            }
          }
        });
      }
    }, 100);

    // Timeout after 10 seconds to clear search parameters/loops
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  }

  // CORS Bypass bridge: listen to window messages from the webpage and route them to extension background script
  window.addEventListener('message', (event) => {
    // Only accept messages from the same page window
    if (event.source !== window) return;

    if (event.data && event.data.source === 'unifiedtools-page' && event.data.action === 'corsFetch') {
      const { url, requestId } = event.data;
      chrome.runtime.sendMessage({ action: "corsFetch", url: url }, (response) => {
        window.postMessage({
          source: 'unifiedtools-extension',
          action: 'corsFetchResponse',
          requestId: requestId,
          response: response
        }, '*');
      });
    }
  });
})();
