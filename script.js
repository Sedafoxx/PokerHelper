const slidesContainer = document.querySelector('.slides'); // Target the slides container instead of the carousel container
const slides = document.querySelectorAll('.slides img');
const totalSlides = slides.length;
let currentSlide = 0;
let slideInterval; // Interval for automatic sliding
let autoSlideDelay = 5000; // Time in milliseconds for automatic sliding
let isAutoSliding = true; // Flag for auto-sliding state

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;

// Check if the device is mobile
function isMobile() {
    return window.innerWidth <= 600;
}

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
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
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
    isAutoSliding = false;
}

// Resume automatic sliding after a delay
function resumeAutoSlide() {
    if (!isAutoSliding) {
        isAutoSliding = true;
        setTimeout(startAutoSlide, autoSlideDelay);
    }
}

// Drag and swipe functionality for mobile
function addMobileDragHandlers() {
    slidesContainer.addEventListener('touchstart', startDrag);
    slidesContainer.addEventListener('touchend', endDrag);
    slidesContainer.addEventListener('touchmove', drag);
}

function startDrag(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
}

function endDrag() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    const movedBy = currentTranslate - prevTranslate;

    // If moved enough to swipe to the next or previous slide
    if (movedBy < -100 && currentIndex < totalSlides - 1) currentIndex += 1;
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

    setPositionByIndex();
}

function drag(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setCarouselPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setCarouselPosition() {
    slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -slidesContainer.offsetWidth;
    prevTranslate = currentTranslate;
    setCarouselPosition();
    updateSlide(); // Update slide text based on the current slide
}

// Add event listeners based on device type
if (isMobile()) {
    addMobileDragHandlers();
} else {
    // Desktop interactions
    slidesContainer.addEventListener('mousedown', pauseAutoSlide);
    slidesContainer.addEventListener('mouseup', resumeAutoSlide);
    slidesContainer.addEventListener('click', (event) => {
        if (event.clientX < window.innerWidth / 2) {
            showPreviousSlide();
        } else {
            showNextSlide();
        }
        resumeAutoSlide();
    });
}

// Start automatic sliding on page load (only for desktop)
if (!isMobile()) {
    startAutoSlide();
}


// Update cursor appearance for desktop only
if (!isMobile()) {
    const customCursor = document.querySelector('.custom-cursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const speed = 0.7;
    const cursorSize = 40;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;

        customCursor.style.transform = `translate3d(${cursorX - cursorSize / 2}px, ${cursorY - cursorSize / 2 + window.scrollY}px, 0)`;
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.addEventListener('mousedown', () => {
        customCursor.style.background = "url('cursor_large_click.png') no-repeat center center / contain";
    });

    document.addEventListener('mouseup', () => {
        customCursor.style.background = "url('cursor_large.png') no-repeat center center / contain";
    });
}


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