// // Function to apply inline styles to an element by ID
// function styleElementById(elementId) {
//   console.log("xxx.2.1. element", elementId);

//   const element = document.getElementById(elementId);

//   console.log("xxx.2.2. element", element);

//   if (element) {
//     // Apply inline styles
//     element.style.color = "blue";
//     element.style.fontWeight = "bold";
//     element.style.backgroundColor = "yellow";
//   }
// }

// // Function to add the custom CSS
// function addCustomCSS() {
//   const style = document.createElement("style");
//   style.textContent = `
//     .gtx-body {
//       color: blue !important;
//       font-weight: bold !important;
//       background-color: yellow !important;
//     }

//     .news-content-holder, .news-content, .news-main-detail, .news-detail-text, .subhead, .dropdown-menu {
//       color: red !important;
//       background-color: yellow !important;
//     }
//   `;
//   document.head.appendChild(style);
// }


// Function to inject custom styles into the page
function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    body {
      font-family: system-ui !important;
    }
    [lang="fa"] {
      font-family: system-ui !important;
      direction: rtl !important;
    }
  `;
  document.head.appendChild(style);
}

// Get the current tab URL and check if it matches any of the stored URLs
chrome.storage.sync.get(['urlList'], function (result) {
  const urlList = result.urlList || [];
  const currentUrl = window.location.href;

  // If the current page's URL is in the saved list, inject the styles
  if (urlList.some(url => currentUrl.includes(url))) {
    injectStyles();
  }
});
