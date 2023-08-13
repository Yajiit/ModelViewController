// main.js
let countdownTimeout;

function startCountdown() {
    // clear previous timer
    clearTimeout(countdownTimeout);


    // start countdown timer
    countdownTimeout = setTimeout(() => {
        // logout route
        fetch('/api/users/logout', {
            method: 'POST',
        })
        .then(() => {
            // redirect to homepage
            window.location.href = '/'; 
        })
        .catch((error) => {
            console.error('Logout failed:', error);
        });
    }, 15 * 60 * 1000); // 15 minutes
}

// reset countdown on mouse or keyboard event
document.addEventListener('mousemove', startCountdown);
document.addEventListener('keydown', startCountdown);

// start countdown when page loads
startCountdown();