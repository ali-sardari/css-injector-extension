const urlInput = document.getElementById('urlInput');
const cssInput = document.getElementById('cssInput');
const urlListDiv = document.getElementById('urlList');
const addUrlButton = document.getElementById('addUrlButton');

// Fetch the current URL when the popup loads
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  urlInput.value = new URL(tabs[0].url).origin; // Get the current site’s origin (domain)
});

// Function to render the list of URLs and their CSS
function renderUrlList(urlList) {
  urlListDiv.innerHTML = '';  // Clear the list
  urlList.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'url-item';
    div.innerHTML = `
      <strong>${item.url}</strong>
      <textarea class="css-input">${item.css}</textarea>
      <div class="action-buttons">
        <button class="save-button" data-index="${index}">Save</button>
        <button class="remove-button" data-index="${index}">Remove</button>
      </div>
    `;
    urlListDiv.appendChild(div);
  });

  // Add event listeners to "Save" and "Remove" buttons
  document.querySelectorAll('.save-button').forEach(button => {
    button.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      const newCss = this.parentNode.previousElementSibling.value;
      updateCss(index, newCss);
    });
  });

  document.querySelectorAll('.remove-button').forEach(button => {
    button.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      removeUrl(index);
    });
  });
}

// Add a website with its custom CSS
addUrlButton.addEventListener('click', function () {
  const newUrl = urlInput.value.trim();
  const newCss = cssInput.value.trim();

  if (newUrl && newCss) {
    chrome.storage.sync.get(['urlList'], function (result) {
      const urlList = result.urlList || [];
      urlList.push({ url: newUrl, css: newCss });
      chrome.storage.sync.set({ urlList }, function () {
        renderUrlList(urlList);
      });
    });
    urlInput.value = '';  // Clear the input fields
    cssInput.value = '';
  }
});

// Update the CSS for a specific URL
function updateCss(index, newCss) {
  chrome.storage.sync.get(['urlList'], function (result) {
    const urlList = result.urlList || [];
    urlList[index].css = newCss;  // Update the CSS
    chrome.storage.sync.set({ urlList }, function () {
      renderUrlList(urlList);
    });
  });
}

// Remove a URL and its CSS
function removeUrl(index) {
  chrome.storage.sync.get(['urlList'], function (result) {
    const urlList = result.urlList || [];
    urlList.splice(index, 1);  // Remove the URL and its CSS
    chrome.storage.sync.set({ urlList }, function () {
      renderUrlList(urlList);
    });
  });
}

// Initialize the popup by rendering the stored URLs and their CSS
chrome.storage.sync.get(['urlList'], function (result) {
  const urlList = result.urlList || [];
  renderUrlList(urlList);
});
