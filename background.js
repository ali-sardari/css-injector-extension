// Create a MediaQueryList object
const mediaQueryList = window.matchMedia('(max-width: 600px)');

// Define the callback function
function handleMediaQueryChange(event) {
    if (event.matches) {
        console.log('xxx.The viewport is 600 pixels or less.');
    } else {
        console.log('xxx.The viewport is more than 600 pixels.');
    }
}

// Add the event listener using addEventListener
mediaQueryList.addEventListener('change', handleMediaQueryChange);

// Optionally, you can also remove the event listener if needed
// mediaQueryList.removeEventListener('change', handleMediaQueryChange);
