document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('proxy-form');
  const urlInput = document.getElementById('url-input');
  const proxyFrame = document.getElementById('proxy-frame');
  const errorMessage = document.getElementById('error-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous error and reset iframe
    errorMessage.textContent = '';

    let url = urlInput.value.trim();

    // Validate URL
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    try {
      // Validate URL format
      new URL(url);

      // Set iframe source
      proxyFrame.src = url;

      // Add error handling for iframe
      proxyFrame.onerror = () => {
        errorMessage.textContent = 'Failed to load the website. Please check the URL and try again.';
      };
    } catch (error) {
      errorMessage.textContent = 'Invalid URL. Please enter a valid website address.';
    }
  });

  // Handle iframe navigation
  proxyFrame.addEventListener('load', () => {
    try {
      const currentUrl = proxyFrame.contentWindow.location.href;
      urlInput.value = currentUrl;
    } catch (error) {
      // This can happen due to cross-origin restrictions
      console.log('Could not read iframe location');
    }
  });
});
