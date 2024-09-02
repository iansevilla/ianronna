function updateCountdown() {
    const endDate = new Date('2024-11-30T23:59:59'); // Set target date and time
    const now = new Date();
    const timeRemaining = endDate - now;

    if (timeRemaining <= 0) {
        document.getElementById('countdown').innerHTML = 'The Event has Started!';
        return;
    }

    const padZero = (num) => num.toString().padStart(2, '0');

    const seconds = padZero(Math.floor((timeRemaining / 1000) % 60));
    const minutes = padZero(Math.floor((timeRemaining / (1000 * 60)) % 60));
    const hours = padZero(Math.floor((timeRemaining / (1000 * 60 * 60)) % 24));
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    
    const months = padZero(Math.floor(days / 30));
    const remainingDays = padZero(days % 30);

    document.getElementById('months').querySelector('.time-value').textContent = months;
    document.getElementById('days').querySelector('.time-value').textContent = remainingDays;
    document.getElementById('hours').querySelector('.time-value').textContent = hours;
    document.getElementById('minutes').querySelector('.time-value').textContent = minutes;
    document.getElementById('seconds').querySelector('.time-value').textContent = seconds;
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initialize countdown on page load
updateCountdown();


document.addEventListener('DOMContentLoaded', function() {
    var coverImage = document.getElementById('cover-image-img');

    if (coverImage) {
        coverImage.addEventListener('click', function() {
            var coverDiv = document.getElementById('cover-image');
            if (coverDiv) {
                coverDiv.classList.add('fade-out');
                setTimeout(function() {
                    coverDiv.style.display = 'none';
                }, 500);
            }
        });
    }
    
});

 

document.addEventListener('DOMContentLoaded', function() {
    // Delay to ensure styles are applied properly
    setTimeout(() => {
        document.querySelectorAll('.flower').forEach(flower => {
            const isLeftFlower = flower.id === 'leftFlower';
            const isRightFlower = flower.id === 'rightFlower';

            if (isLeftFlower) {
                flower.style.left = '0';
                flower.style.right = ''; // Clear any right property
            } 
            
            if (isRightFlower) {
                flower.style.right = '0';
                flower.style.left = ''; // Clear any left property
                flower.classList.add('flipped');
                flower.style.top = '80%';
            }
        });
    }, 500); // Adjust delay if needed
});

let currentDragging = null;
document.querySelectorAll('.flower').forEach(function(flower) {
    flower.addEventListener('mousedown', function(event) {
        if (currentDragging) return; // Prevent dragging if another flower is already being dragged

        currentDragging = flower;

        let shiftX = event.clientX - flower.getBoundingClientRect().left;
        let shiftY = event.clientY - flower.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            flower.style.left = pageX - shiftX + 'px';
            flower.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            // Snap to left or right side and flip image if needed
            const flowerRect = flower.getBoundingClientRect();
            const middleOfScreen = window.innerWidth / 2;

            if (flowerRect.left < middleOfScreen) {
                flower.style.left = '0';
                flower.style.right = ''; // Clear any right property
                flower.classList.remove('flipped');
            } else {
                flower.style.right = '0';
                flower.style.left = ''; // Clear any left property
                flower.classList.add('flipped');
            }

            currentDragging = null; // Reset currentDragging when done
        }

        document.addEventListener('mouseup', onMouseUp);

        // Ensure dragging stops when clicking elsewhere
        document.addEventListener('click', function(event) {
            if (currentDragging && !currentDragging.contains(event.target)) {
                // Trigger mouse up handler to stop dragging
                onMouseUp();
            }
        });
    });

    flower.ondragstart = function() {
        return false;
    };
});