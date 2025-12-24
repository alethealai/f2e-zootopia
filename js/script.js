// 1. 延迟初始化 WOW.js 至 loader 隐藏后，确保滚动监听时 DOM 完全稳定
$(function () {
    const loader = document.getElementById('loader');
    const initWOW = function () {
        if (typeof WOW !== 'undefined') {
            new WOW().init();
        }
    };

    if (loader) {
        // 监听 loader 的过渡动画完成
        const onLoaderHidden = () => {
            initWOW();
            loader.removeEventListener('transitionend', onLoaderHidden);
        };
        loader.addEventListener('transitionend', onLoaderHidden);

        // 备用：如果 transitionend 没有触发，3 秒后强制初始化
        setTimeout(initWOW, 3000);
    } else {
        initWOW();
    }
});

/**
 * Handwriting animation: draw each path sequentially, then fill it
 */
function animateSVGHandwriting(selector = '.fancy-zootopia') {
    const svg = document.querySelector(selector);
    if (!svg) return;

    // 2. 篩選有效的 path
    const raw = Array.from(svg.querySelectorAll('path'));
    const paths = raw.filter(p => {
        const op = p.getAttribute('opacity');
        if (op !== null && parseFloat(op) === 0) return false;

        const d = p.getAttribute('d');
        return d && d.trim().length > 0;
    });

    let cumulativeDelay = 0;
    const gapBetween = 80; // 每個筆畫之間的間隔 (ms)

    paths.forEach((p) => {
        // 3. 取得原始顏色
        const originalFill = p.getAttribute('fill') || window.getComputedStyle(p).fill || '#665541';
        const strokeColor = p.getAttribute('stroke') || window.getComputedStyle(p).stroke || '#665541';
        const strokeW = p.getAttribute('stroke-width') || window.getComputedStyle(p).strokeWidth || '1';

        // 4. 測量路徑長度
        let len = 0;
        try {
            len = p.getTotalLength();
        } catch (e) {
            len = 1000; // 備用方案
        }

        // 5. 初始化樣式 (透明填滿，準備繪製邊框)
        p.style.fill = 'transparent';
        p.style.stroke = strokeColor;
        p.style.strokeWidth = strokeW;
        p.style.strokeLinecap = 'round';
        p.style.strokeLinejoin = 'round';
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        p.style.transition = 'fill 220ms ease';

        // 6. 計算動畫時間 (根據長度調整)
        const duration = Math.max(420, Math.min(2800, Math.round(len * 2)));

        // 7. 使用 Web Animations API 執行繪製
        const anim = p.animate([
            { strokeDashoffset: `${len}` },
            { strokeDashoffset: '0' }
        ], {
            duration: duration,
            delay: cumulativeDelay,
            easing: 'linear',
            fill: 'forwards'
        });

        // 8. 繪製完成後填色
        anim.finished.then(() => {
            p.style.fill = originalFill;
        }).catch(() => {
            p.style.fill = originalFill;
        });

        // 累加延遲，實現順序繪製
        cumulativeDelay += duration + gapBetween;
    });
}

// 9. 啟動動畫
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => animateSVGHandwriting('.fancy-zootopia'));
} else {
    // 如果 DOM 已經加載完畢，直接執行
    animateSVGHandwriting('.fancy-zootopia');
}