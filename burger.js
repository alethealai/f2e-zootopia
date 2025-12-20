document.addEventListener('DOMContentLoaded', function () {
    const burger = document.getElementById('burger-icon');
    const overlay = document.querySelector('.menu-overlay');
    const overlayLinks = document.querySelectorAll('.overlay-nav a');

    if (!burger || !overlay) return;

    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        overlay.classList.toggle('open');
        // 同步在 body 上切換狀態，讓放在 header 的 svg 也能根據選單狀態觸發動畫
        document.body.classList.toggle('menu-open');
    });

    overlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            overlay.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            burger.classList.remove('open');
            overlay.classList.remove('open');
            document.body.classList.remove('menu-open');
        }
    });

    /* ✏️ SVG 畫線長度自動計算（超重要） */
    document.querySelectorAll('.penguin-svg path').forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
    });
});
