let bg = document.getElementById("bg");
let moon = document.getElementById("moon");
let mountain = document.getElementById("mountain");
let road = document.getElementById("road");
let text = document.getElementById("text");

window.addEventListener('scroll', function () {
    var value = window.scrollY; // 取得滾動距離

    // 1. 月球動態：向左移動並輕微上升
    moon.style.left = -value * 0.5 + 'px';
    moon.style.top = -value * 0.2 + 'px';

    // 2. 山脈動態：向上漂移
    mountain.style.top = -value * 0.15 + 'px';

    // 3. 背景動態：向下慢移增加層次感
    bg.style.top = value * 0.5 + 'px';

    // 4. 文字動態：向下移動
    // 因為道路 (road) 在前面，文字往下移就會看起來像沉入地平線
    text.style.marginTop = value * 1.5 + 'px';

    // 5. 道路動態：輕微向下移動保持穩定感
    road.style.top = value * 0.15 + 'px';
});