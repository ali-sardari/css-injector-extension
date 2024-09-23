// Inject custom CSS for the current page
function injectCustomCSS(css) {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

// Get the current page URL and check if it matches any stored URLs
chrome.storage.sync.get(['urlList'], function (result) {
  const urlList = result.urlList || [];
  const currentUrl = window.location.origin; // Match the site by its origin (domain)

  // Check if the current page URL matches any in the stored list
  const matchedSite = urlList.find(item => currentUrl.includes(item.url));

  if (matchedSite) {
    injectCustomCSS(matchedSite.css);  // Inject the custom CSS for the matching website
  }
});
