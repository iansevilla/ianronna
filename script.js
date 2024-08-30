// Toggle content function
function toggleContent(id) {
    const content = document.getElementById(id);
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
    } else {
        content.classList.add('expanded');
    }
}

let currentIndex = 0;
const slideshow = document.querySelector('.slideshow');
const images = document.querySelectorAll('.slideshow img');
const totalImages = images.length;
const interval = 3000; // Interval in milliseconds (e.g., 3000ms = 3 seconds)

let startX;

// Function to update slide position
function updateSlide() {
    const offset = -currentIndex * 100;
    slideshow.style.transform = `translateX(${offset}%)`;
}

// Function to go to the next image
function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateSlide();
}

// Function to go to the previous image
function prevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateSlide();
}

// Autoplay functionality
let slideInterval = setInterval(nextImage, interval);

// Optional: Clear interval on user interaction (e.g., hover)
const slideshowContainer = document.querySelector('.slideshow-container');
slideshowContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
slideshowContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextImage, interval);
});

// Swipe functionality
slideshowContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slideshowContainer.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) { // Threshold to determine swipe distance
        if (diffX > 0) {
            nextImage(); // Swipe left
        } else {
            prevImage(); // Swipe right
        }
    }
});
