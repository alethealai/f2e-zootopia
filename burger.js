document.addEventListener('DOMContentLoaded', function () {
    const burger = document.getElementById('burger-icon');
    const overlay = document.querySelector('.menu-overlay');
    const overlayLinks = document.querySelectorAll('.overlay-nav a');

    if (!burger || !overlay) return;

    // Toggle burger and overlay when clicking burger icon
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        overlay.classList.toggle('open');
    });

    // Close overlay when clicking any link inside it
    overlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            overlay.classList.remove('open');
        });
    });

    // Close overlay when clicking the overlay background itself
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            burger.classList.remove('open');
            overlay.classList.remove('open');
        }
    });
});



