// main.js
document.getElementById('dashboard').addEventListener('click', goToDashboard);
document.getElementById('homepage').addEventListener('click', goToHomepage);


function goToDashboard() {
  window.location.href = '/dashboard';
}

function goToHomepage() {
  window.location.href = '/';
}