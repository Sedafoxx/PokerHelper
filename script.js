// Carousel controls
let currentSlide = 0;
const slides = document.querySelectorAll('.slides img');
const totalSlides = slides.length;
let slideInterval; // Variable to hold the interval for automatic sliding
let autoSlideDelay = 5000; // Time in milliseconds for automatic sliding
let isAutoSliding = true; // Flag to track if auto-sliding is currently running

// Feature titles and descriptions
const features = [
    { title: "Chip Calculator", description: "Fast and Easy Chip to Money Conversion" },
    { title: "Money Tracker", description: "Visualizing Stack Fluctuation" },
    { title: "Player Tracker", description: "Live Tracking of Preflop Action" },
    { title: "Player Data Base", description: "Storing stats and tagging of known players" },
    { title: "Ranges", description: "Experimenting and looking up for push-fold situations" },
    { title: "Tournament Manager", description: "All in one tool for organizing tournaments" },
    { title: "Tournament Manager", description: "Timer featuring automatic calculation of level duration" },
    { title: "Tournament Manager", description: "Player and table management with automatic table balancing" },
    { title: "Tournament Manager", description: "Dynamic geometric distribution of prize pool" },
    { title: "Odds Calculator", description: "Calculating multiway all-in situations with side pots and expected values" }
];

// Show the next slide
function showNextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
}

// Show the previous slide
function showPreviousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
}

// Update the slide and feature text
function updateSlide() {
    document.querySelector('.slides').style.transform = `translateX(-${currentSlide * 100}%)`;
    document.getElementById('feature-title').textContent = features[currentSlide].title;
    document.getElementById('feature-description').textContent = features[currentSlide].description;
}

// Automatic slide control
function startAutoSlide() {
    if (isAutoSliding) {
        clearInterval(slideInterval); // Clear any existing interval
        slideInterval = setInterval(showNextSlide, autoSlideDelay);
    }
}

// Pause automatic sliding
function pauseAutoSlide() {
    clearInterval(slideInterval);
    isAutoSliding = false; // Set the flag to indicate auto-sliding is paused
}

// Resume automatic sliding after a delay
function resumeAutoSlide() {
    if (!isAutoSliding) {
        isAutoSliding = true; // Set the flag to indicate auto-sliding will resume
        setTimeout(startAutoSlide, autoSlideDelay); // Resume auto-sliding after the specified delay
    }
}

// Event listeners for user interaction
const carouselContainer = document.querySelector('.carousel-container');

carouselContainer.addEventListener('mousedown', pauseAutoSlide);
carouselContainer.addEventListener('mouseup', resumeAutoSlide);
carouselContainer.addEventListener('touchstart', pauseAutoSlide);
carouselContainer.addEventListener('touchend', resumeAutoSlide);

// Manual slide control (left and right arrows)
carouselContainer.addEventListener('click', (event) => {
    if (event.clientX < window.innerWidth / 2) {
        showPreviousSlide();
    } else {
        showNextSlide();
    }
    resumeAutoSlide(); // Restart the auto slide after manual control
});

// Start automatic sliding on page load
startAutoSlide();

// Download Button Logic
document.getElementById('download-button').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'pokerhelper.apk';
    link.download = 'pokerhelper.apk';
    link.click();
});


// Contact Button Logic
document.getElementById('contact-button').addEventListener('click', () => {
    window.location.href = 'mailto:pokerhelper@gmail.com';
});


const customCursor = document.querySelector('.custom-cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
const speed = 0.7; // Adjust this value to control the "floatiness"
const cursorSize = 40; // Set this to the size of your custom cursor

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    // Adjust cursor position to center it on the mouse, accounting for scroll
    customCursor.style.transform = `translate3d(${cursorX - cursorSize / 2}px, ${cursorY - cursorSize / 2 + window.scrollY}px, 0)`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Change cursor image on click
document.addEventListener('mousedown', () => {
    customCursor.style.background = "url('cursor_large_click.png') no-repeat center center / contain";
});

// Change cursor image back on release
document.addEventListener('mouseup', () => {
    customCursor.style.background = "url('cursor_large.png') no-repeat center center / contain";
});