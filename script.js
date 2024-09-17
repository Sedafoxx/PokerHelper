let currentSlide = 0;
const slides = document.querySelectorAll('.slides img');
const totalSlides = slides.length;

// Feature titles and descriptions
const features = [
    { title: "Chip Calulator", description: "Fast and Easy Chip to Money Conversion" },
    { title: "Money Tracker", description: "Visualizing Stack Fluctuation" },
    { title: "Player Tracker", description: "Live Tracking of Preflop Action"},
    { title: "Player Data Base", description: "Storing stats and tagging of known players" },
    { title: "Ranges", description: "Experimenting and looking up for push-fold situations" },
    { title: "Tournament Manager", description: "All in one tool for organizing tournaments"},
    { title: "Tournament Manager", description: "Timer featuring automatic calculation of level duration" },
    { title: "Tournament Manager", description: "Player and Table management with automatic table balancing" },
    { title: "Tournament Manager", description: "Dynamic geometric distribution of prizepool"}
];

// Function to show the next slide and update the text
function showNextSlide() {
    // Increment the slide index and wrap around if necessary
    currentSlide = (currentSlide + 1) % totalSlides;

    // Move the slides container to show the next slide
    document.querySelector('.slides').style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update the feature text
    document.getElementById('feature-title').textContent = features[currentSlide].title;
    document.getElementById('feature-description').textContent = features[currentSlide].description;
}

// Change slide every 3 seconds
setInterval(showNextSlide, 5000);

// Download Button Logic
document.getElementById('download-button').addEventListener('click', () => {
    window.location.href = 'pokerhelper.apk';
});

// Contact Button Logic
document.getElementById('contact-button').addEventListener('click', () => {
    window.location.href = 'mailto:pokerhelper@gmail.com';
});
