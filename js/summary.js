//shows welcome screen
document.addEventListener("DOMContentLoaded", function () {
    const welcomeMessage = document.getElementById("welcome");
    if (window.innerWidth <= 555) {
        welcomeMessage.classList.remove('showWelcome');
        welcomeMessage.classList.add('welcome');
        setTimeout(() => {
            welcomeMessage.classList.add('showWelcome');
            welcomeMessage.classList.remove('welcome');
        }, 2000);
    }
});