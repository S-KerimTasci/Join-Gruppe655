//shows welcome screen
document.addEventListener("DOMContentLoaded", function () {
    const welcomeMessage = document.getElementById("welcome");
    if (window.innerWidth <= 555) {
        welcomeMessage.classList.remove('d-none');
        welcomeMessage.classList.add('welcome');
        setTimeout(() => {
            welcomeMessage.classList.add('d-none');
            welcomeMessage.classList.remove('welcome');
        }, 2000);
    }
});

