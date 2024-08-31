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
