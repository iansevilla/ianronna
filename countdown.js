// countdown.js

function updateCountdown() {
    const endDate = new Date('2024-11-30T23:59:59'); // Set target date and time
    const now = new Date();
    const timeRemaining = endDate - now;

    if (timeRemaining <= 0) {
        document.getElementById('countdown').innerHTML = 'The Event has Started!';
        return;
    }

    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    
    // Approximate months
    const months = Math.floor(days / 30);

    document.getElementById('months').innerHTML = `<strong>${months}</strong>`;
    document.getElementById('days').innerHTML = `<strong>${days % 30}</strong>`;
    document.getElementById('hours').innerHTML = `<strong>${hours}</strong>`;
    document.getElementById('minutes').innerHTML = `<strong>${minutes}</strong>`;
    document.getElementById('seconds').innerHTML = `<strong>${seconds}</strong>`;
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initialize countdown on page load
updateCountdown();