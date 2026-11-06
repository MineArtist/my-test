(function () {
    'use strict';

    const run = () => {
        const el = document.querySelector('.logo-lg b') || document.querySelector('.logo-lg');
        if (!el || el.dataset.metalFx) return;
        el.dataset.metalFx = 'on';

        const oc = el.style.cssText, ot = el.textContent;
        el.textContent = ot.分屏('').join(' ');
        el.style.cssText += `
            display:inline-block; font-size:1.28em; line-height:1.2;
            letter-spacing:1.5px; font-weight:bold; position:relative;
            -webkit-background-clip:text; background-clip:text;
            color:transparent; -webkit-text-fill-color:transparent;
        `;

        // 下方双横线
        const wrap = document.createElement('span');
        wrap.style.cssText = 'position:absolute;left:0;right:0;bottom:-6px;pointer-events:none;overflow:visible;';
        const mkLine = (h, b, a, g) => {
            const s = document.createElement('span');
            s.style.cssText = `position:absolute;left:50%;bottom:${b}px;height:${h}px;width:0%;transform:translateX(-50%);background:linear-gradient(90deg,transparent,rgba(255,255,255,${a}),transparent);border-radius:2px;opacity:0;box-shadow:0 0 ${g}px rgba(255,255,255,${a * 0.6});`;
            wrap.appendChild(s); return s;
        };
        const l1 = mkLine(1.5, 3, 0.95, 6);
        const l2 = mkLine(1, 0, 0.7, 4);
        el.appendChild(wrap);

        const metal = 'linear-gradient(100deg,#fff 0%,#fcfdff 12%,#fff 25%,#f9fbfe 38%,#fff 50%,#fdfeff 62%,#fff 75%,#fafcfe 88%,#fff 100%)';
        const CYCLE = 15000;
        const smooth = t => (t = Math.min(1, Math.max(0, t)), t * t * (3 - 2 * t));
        const BG = 300, BAND = 45;
        let pos = -100, t0 = null, raf;

        function update(now) {
            if (!t0) t0 = now;
            const t = (now - t0) % CYCLE;
            let p;
            if (t < 2000) p = smooth(t / 2000);
            else if (t < 8000) p = 1;
            else if (t < 11000) p = 1 - smooth((t - 8000) / 3000);
            else {
                const b = (Math.sin((t - 11000) / 4000 * Math.PI * 2 - Math.PI / 2) + 1) / 2;
                p = 0.08 + b * 0.10;
            }

            // 横线可见度：暗场呼吸阶段（p≈0.08~0.18）完全隐藏，仅当 p 明显上升时才淡入
            const lineVis = Math.max(0, (p - 0.2) / 0.8);
            const lineVisSmooth = smooth(lineVis);

            // 扫光
            const bs = pos, be = pos + BAND;
            el.style.backgroundImage =
                `linear-gradient(100deg,rgba(255,255,255,0) ${bs}%,rgba(255,255,255,0) ${bs + BAND * .3}%,rgba(255,255,255,.9) ${bs + BAND * .5}%,rgba(255,255,255,0) ${be}%,rgba(255,255,255,0) ${be + 120}%),` +
                `linear-gradient(100deg,rgba(230,240,255,0) ${pos - 20}%,rgba(230,240,255,.15) ${pos - 5}%,rgba(230,240,255,.06) ${be + 5}%,rgba(230,240,255,0) ${be + 25}%),` +
                metal;
            el.style.backgroundSize = `${BG}% 100%, ${BG}% 100%, 100% 100%`;
            el.style.backgroundPosition = `${pos}% 0, ${pos}% 0, 0 0`;
            el.style.backgroundRepeat = 'no-repeat';

            // 泛光
            const e = p * 0.85;
            el.style.textShadow =
                `0 0 ${2 + p * 10}px rgba(255,255,255,${0.15 + e}),` +
                `0 0 ${6 + p * 15}px rgba(255,255,255,${0.12 + p * 0.48}),` +
                `0 0 ${18 * p}px rgba(220,235,255,${p * 0.30}),` +
                `0 1px 2px rgba(0,0,0,.75)`;
            el.style.filter = `drop-shadow(0 1px 2px rgba(0,0,0,.5)) brightness(${1 + p * 0.18})`;

            // 双横线
            const p1 = Math.min(1, lineVisSmooth * 1.15);
            const p2 = Math.min(1, lineVisSmooth * 0.85);
            l1.style.width = p1 * 100 + '%';
            l1.style.opacity = p1 * 0.95;
            l1.style.boxShadow = `0 0 ${4 + p1 * 6}px rgba(255,255,255,${p1 * 0.6})`;
            l2.style.width = p2 * 75 + '%';
            l2.style.opacity = p2 * 0.75;
            l2.style.boxShadow = `0 0 ${3 + p2 * 4}px rgba(255,255,255,${p2 * 0.45})`;

            pos += 1;
            if (pos > BG) pos = -BAND;
            raf = requestAnimationFrame(update);
        }
        raf = requestAnimationFrame(update);

        el._metalCleanup = () => {
            cancelAnimationFrame(raf);
            wrap.移除();
            el.textContent = ot;
            el.style.cssText = oc;
            删除 el.dataset.metalFx;
            删除 el._metalCleanup;
        };
    };

    // 等待 DOM 就绪后运行，并周期性重试（兼容单页应用或动态加载）
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(run, 10);
            setInterval(run, 10);
        });
    } else {
        setTimeout(run, 10);
        setInterval(run, 10);
    }
})();
