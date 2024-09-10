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
                playAudio();
                setVolume(.67);
                hideCoverPage();
                setTimeout(function() {
                    coverDiv.style.display = 'none';
                }, 500);
            }
        });
    }
    
});

 

document.addEventListener('DOMContentLoaded', function() {
    // Delay to ensure styles are applied properly
    showCoverPage();
    setTimeout(() => {
        document.querySelectorAll('.flower').forEach(flower => {
            const isLeftFlower = flower.id === 'leftFlower';
            const isRightFlower = flower.id === 'rightFlower';

            if (isLeftFlower) {
                flower.style.left = '0';
                flower.style.right = ''; // Clear any right property
                flower.style.top = '0%';
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

// Function to start dragging
function startDragging(flower, event) {
    if (currentDragging) return; // Prevent dragging if another flower is already being dragged

    currentDragging = flower;
    event.preventDefault(); // Prevent default behavior to avoid issues on touch devices

    let shiftX, shiftY;
    const rect = flower.getBoundingClientRect();
    if (event.type === 'touchstart') {
        shiftX = event.touches[0].clientX - rect.left;
        shiftY = event.touches[0].clientY - rect.top;
    } else {
        shiftX = event.clientX - rect.left;
        shiftY = event.clientY - rect.top;
    }

    function moveAt(pageX, pageY) {
        // Center the flower at the cursor/touch point
        flower.style.left = (pageX - shiftX) + 'px';
        flower.style.top = (pageY - shiftY) + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.clientX, event.clientY);
    }

    function onTouchMove(event) {
        moveAt(event.touches[0].clientX, event.touches[0].clientY);
    }

    function onEnd() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onEnd);
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onEnd);

        // Snap to left or right side
        if (parseInt(flower.style.left) < window.innerWidth / 2) {
            flower.style.left = '0';
            flower.style.transform = 'rotate(0deg)'; // Ensure image is not flipped
        } else {
            flower.style.left = (window.innerWidth - flower.offsetWidth -7) + 'px'; // Right edge
            flower.style.transform = 'scaleX(-1)'; // Flip image horizontally
        }

        currentDragging = null;
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onEnd);
}

// Attach event listeners
document.querySelectorAll('.flower').forEach(function(flower) {
    flower.addEventListener('mousedown', function(event) {
        startDragging(flower, event);
    });

    flower.addEventListener('touchstart', function(event) {
        startDragging(flower, event);
    });
});

// Handle click outside
document.addEventListener('mousedown', function(event) {
    if (currentDragging && !currentDragging.contains(event.target)) {
        currentDragging.style.left = ''; // Reset position if click outside
        currentDragging.style.top = '';
        currentDragging = null;
    }
});

document.addEventListener('touchstart', function(event) {
    if (currentDragging && !currentDragging.contains(event.target)) {
        currentDragging.style.left = ''; // Reset position if click outside
        currentDragging.style.top = '';
        currentDragging = null;
    }
});


const bgmPlayer = document.getElementById('bgm-player');

// Function to play the audio
function playAudio() {
    bgmPlayer.play();
    bgmPlayer.loop = true;
}

// Function to pause the audio
function pauseAudio() {
    bgmPlayer.pause();
}

// Function to stop the audio (pause and reset to start)
function stopAudio() {
    bgmPlayer.pause();
    bgmPlayer.currentTime = 0; // Reset to the start of the audio
}

// Function to set the volume (0.0 to 1.0)
function setVolume(volume) {
    bgmPlayer.volume = volume;
}

function showCoverPage() {
    document.body.classList.add('no-scroll');
    // Your code to display the cover page
}

// Function to disable cover page
function hideCoverPage() {
    document.body.classList.remove('no-scroll');
    // Your code to hide the cover page
}



window.addEventListener('scroll', function() {
    var headerDate = document.querySelector('.header-date');
    var footer = document.querySelector('footer');
    var footerRect = footer.getBoundingClientRect();
    var viewportHeight = window.innerHeight;

    if (footerRect.top <= viewportHeight) {
        var overlap = (viewportHeight - footerRect.top);
        headerDate.style.bottom = `${Math.max(overlap, 0)}px`; // Move up if overlapping
    } else {
        headerDate.style.bottom = '0'; // Default position
    }
});

document.addEventListener('contentToggle', function(event) {
    const sectionId = event.detail.sectionId;
    const expanded = event.detail.expanded;

    console.log(`Section ${sectionId} was toggled. Expanded: ${expanded}`);

    // Example: if a specific section is expanded, trigger some action
    if (sectionId === 'videoPrenup') {
        if(expanded)
        {
            if (player) {
                player.playVideo();
            }
        }
        else
        {
           // bgmPlayer.play();
            player.pauseVideo();
        }

        // You can call functions or manipulate the DOM based on the event here
    }
    else
    {
        //bgmPlayer.play();
        player.pauseVideo();
    }
    
});

let player; // Declare the player variable globally

// Load the YouTube IFrame API and create a player instance
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-video', {
        height: '390',
        width: '640',
        videoId: 'vZVZMuK2cac', // Replace with your YouTube video ID
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// Player ready event
function onPlayerReady(event) {
    console.log('YouTube Player is ready');
}

// Player state change event
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        console.log('Video is playing');
        bgmPlayer.pause();
    }
    else
    {
        bgmPlayer.play();
    }
}

// Pause the video when the window/tab goes out of focus
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        if (player && player.getPlayerState() == YT.PlayerState.PLAYING) {
            player.pauseVideo();
            console.log('Video paused due to tab/window out of focus');
        }
    }
});