function toggleContent(id) {
    const content = document.getElementById(id);
    const allContents = document.querySelectorAll('.content');

    // Close all sections except the one that was clicked
    allContents.forEach(section => {
        if (section !== content) {
            section.classList.remove('expanded');
        }
    });

    // Toggle the clicked section
    content.classList.toggle('expanded');

    // Scroll the expanded content into view with adjusted offset
    if (content.classList.contains('expanded')) {
        setTimeout(() => {
            const header = document.querySelector('header');
            const headerHeight = header.offsetHeight;
            const contentTop = content.getBoundingClientRect().top + window.pageYOffset;
            const contentHeight = content.offsetHeight;
            const viewportHeight = window.innerHeight;

            // Adjusted offset to ensure the content is visible below the sticky header
            const offset = headerHeight + 30; // Additional margin to ensure visibility

            // Calculate the desired top position
            const desiredTop = contentTop - offset;

            // Ensure content fits within the viewport
            if (contentHeight > viewportHeight) {
                // When content height is greater than viewport height, scroll to ensure top visibility
                window.scrollTo({
                    top: desiredTop,
                    behavior: 'smooth'
                });
            } else {
                // When content height fits within the viewport, scroll to ensure content is fully visible
                window.scrollTo({
                    top: Math.max(desiredTop, window.pageYOffset),
                    behavior: 'smooth'
                });
            }
        }, 300); // Adjust delay if needed
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

function copyPhoneNumber() {
    const phoneNumber = "+639171327996";
    navigator.clipboard.writeText(phoneNumber).then(() => {
        alert("Phone number copied to clipboard: " + phoneNumber);
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}




// Get the audio element by its ID
