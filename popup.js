// Get references to elements
const urlInput = document.getElementById("urlInput");
const urlListDiv = document.getElementById("urlList");
const addUrlButton = document.getElementById("addUrlButton");

// Function to render the list of URLs
function renderUrlList(urlList) {
  urlListDiv.innerHTML = ""; // Clear the list
  urlList.forEach((url, index) => {
    const div = document.createElement("div");
    div.className = "url-item";
    div.innerHTML = `
      ${url}
      <button data-index="${index}">Remove</button>
    `;
    urlListDiv.appendChild(div);
  });

  // Add event listeners to all remove buttons
  document.querySelectorAll(".url-item button").forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      removeUrl(index);
    });
  });
}

// Add URL to the list
addUrlButton.addEventListener("click", function () {
  const newUrl = urlInput.value.trim();
  if (newUrl) {
    chrome.storage.sync.get(["urlList"], function (result) {
      const urlList = result.urlList || [];
      urlList.push(newUrl);
      chrome.storage.sync.set({ urlList }, function () {
        renderUrlList(urlList);
      });
    });
    urlInput.value = ""; // Clear the input field
  }
});

// Remove URL from the list
function removeUrl(index) {
  chrome.storage.sync.get(["urlList"], function (result) {
    const urlList = result.urlList || [];
    urlList.splice(index, 1); // Remove the URL at the given index
    chrome.storage.sync.set({ urlList }, function () {
      renderUrlList(urlList);
    });
  });
}

// Initialize the popup by rendering the stored URLs
chrome.storage.sync.get(["urlList"], function (result) {
  const urlList = result.urlList || [];
  renderUrlList(urlList);
});
