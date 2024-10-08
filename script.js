// script.js
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

// Define the features array
const features = [
    { title: "Learn Poker", description: "Complete Library of Texas Hold-em Knowledge from Beginner to Pro" },
    { title: "Chip Calculator", description: "Fast and Easy Chip to Money Conversion" },
    { title: "Money Tracker", description: "Visualizing Stack Fluctuation" },
    { title: "Player Tracker", description: "Live Tracking of Preflop Action" },
    { title: "Player Database", description: "Storing stats and tagging of known players" },
    { title: "Ranges", description: "Experimenting and looking up push-fold situations" },
    { title: "Tournament Manager", description: "All-in-one tool for organizing tournaments" },
    { title: "Timer", description: "Featuring automatic calculation of level duration" },
    { title: "Table Management", description: "Player and table management with automatic table balancing" },
    { title: "Prize Distribution", description: "Dynamic geometric distribution of prize pool" },
    { title: "Odds Calculator", description: "Calculating multiway all-in situations with side pots and expected values" }
];


// Create dots for the carousel
const dotsContainer = document.querySelector('.dots-container');
let dots = [];

function createDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentSlide) dot.classList.add('active'); // Set the first dot as active
        dotsContainer.appendChild(dot);
        dots.push(dot);

        // Add click event to each dot for manual slide control
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateSlide();
            setPositionByIndex();
        });
    }
}

function updateActiveDot() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

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
    updateActiveDot(); // Update active dot based on the current slide
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
    if (movedBy < -100 && currentSlide < totalSlides - 1) currentSlide += 1;
    if (movedBy > 100 && currentSlide > 0) currentSlide -= 1;

    setPositionByIndex();
    updateSlide(); // Update slide text and dots after dragging
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
    currentTranslate = currentSlide * -slidesContainer.offsetWidth;
    prevTranslate = currentTranslate;
    setCarouselPosition();
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

// Create dots when the page loads
createDots();

// Update cursor appearance for desktop only
if (!isMobile()) {
    const customCursor = document.querySelector('.custom-cursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const speed = 1.0;
    const cursorSize = 10;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;

        customCursor.style.transform = `translate3d(${cursorX - cursorSize / 2 - 7}px, ${cursorY - cursorSize / 2 + window.scrollY + 3}px, 0)`;
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

document.getElementById('submit-button').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission and page reload

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Basic validation
    if (!name || !email) {
        document.getElementById('confirmation-message').textContent = 'Please enter both name and email!';
        document.getElementById('confirmation-message').style.display = 'block';
        return;
    }

    // Create the message to send
    const message = `Sign Up: Name - ${name}, Email - ${email}`;

    // First fetch call: Send data to Netlify function
    fetch('https://pokerhelper.ddns.net/.netlify/functions/store-and-send-email3', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, email: email }) // Send name and email
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            console.log('Netlify Function Success:', data.message);
            document.getElementById('confirmation-message').textContent = data.message;

            // Show money rain animation on success
            document.getElementById('money-rain').style.display = 'block';
            
            // Optionally hide the money rain after a few seconds
            setTimeout(() => {
                document.getElementById('money-rain').style.display = 'none';
            }, 5000); // Hides the animation after 5 seconds
        } else {
            console.error('Netlify Function Error:', data.error);
            document.getElementById('confirmation-message').textContent = 'Error: ' + data.error;
        }
        document.getElementById('confirmation-message').style.display = 'block';
    })
    .catch(error => {
        console.error('Netlify Function Error:', error);
        document.getElementById('confirmation-message').textContent = 'Error: Unable to send data to Netlify function.';
        document.getElementById('confirmation-message').style.display = 'block';
    });

    // Second fetch call: Send data to external server
    fetch('https://pokerhelper.ddns.net/.netlify/functions/proxy-send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, email: email }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('confirmation-message').textContent = data.message || 'Sign-up successful!';
        document.getElementById('confirmation-message').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('confirmation-message').textContent = 'Error: Unable to send data.';
        document.getElementById('confirmation-message').style.display = 'block';
    });
});






document.getElementById('check-password').addEventListener('click', (event) => {
    event.preventDefault();
    const password = document.getElementById('password').value;

    // Hard-coded password check
    if (password === 'IAMALLIN') {
        const apkLink = document.getElementById('apk-link');
        apkLink.style.display = 'block'; // Show download link
        apkLink.href = 'https://e.pcloud.link/publink/show?code=XZFIkCZC4hu1srdqgLXVFP0yhWj34Ky5cvX';
        // Show money rain animation
        document.getElementById('money-rain').style.display = 'block';
        
        // Optionally hide the money rain after a few seconds
        setTimeout(() => {
            document.getElementById('money-rain').style.display = 'none';
        }, 5000); // Hides the animation after 5 seconds
    } else {
        alert('Incorrect password');
    }
});

// Contact Button Logic
document.getElementById('contact-button').addEventListener('click', () => {
    window.location.href = 'mailto:pokerhelper@proton.me';
});

