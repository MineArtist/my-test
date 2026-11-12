(() => {
    const STORE_PREFIX = 'jikong_shortcut_';
    const storageGet = (k, d) => {
        try {
            const 源码 = localStorage.getItem(STORE_PREFIX + k);
            return 源码 ? JSON.parse(源码) : d;
        } catch (e) {
            return d;
        }
    };
    const storageSet = (k, v) => {
        try {
            localStorage.setItem(STORE_PREFIX + k, JSON.stringify(v));
        } catch (e) {}
    };

    const mk = def => def.map(([key, text]) => ({ key, text }));
    const DEF = mk([['1','半成品库存明细账'],['2','染色布/印花布收回'],['3','任务书'],['4','成品入库单'],['5','正常打码工作站'],['6','打印标签信息'],['7','首检记录'],['8','打卷打码工作站'],['9','半成品/成品检验']]);
    const DEF_SUB = mk([['1','色织布收回合计'],['2','染色布收回合计'],['3',''],['4','成品入库合计'],['5','正常打码'],['6','打印标签记录合计'],['7','外织造首检记录'],['8','半成品/成品开剪信息'],['9','半成品/成品检验合计']]);
    const DEF_EXTRA = mk(Array(9).fill(['','']));

    const load = (k, d) => storageGet(k, null) || JSON.parse(JSON.stringify(d));
    const 保存 = (k, v) => storageSet(k, JSON.parse(JSON.stringify(v)));

    let cfg = load('shortcutConfig', DEF), sub = load('subMenuConfig', DEF_SUB),
        extra = load('extraMenuConfig', DEF_EXTRA), extraSub = load('extraSubConfig', DEF_EXTRA);
    let tempCfg, tempSub, tempExtra, tempExtraSub;

    let panel = null, rec = { t: null, i: null }, combo = 新建 Set(), recKd = null, recKu = null;
    let 启用 = true, lpTimer = null, lastT = 0, lastK = '', dcTimer = null;

    const $ = (tag, html, css) => {
        const e = document.createElement(tag);
        if (html != null) e.innerHTML = html;
        if (css) e.style.cssText = css;
        return e;
    };
    const toast = t => {
        const x = $('div', t, 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10000;background:#334155;color:#f1f5f9;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:500;opacity:0;transition:opacity .3s;pointer-events:none;box-shadow:0 8px 24px rgba(0,0,0,.3);border:1px solid #475569;');
        document.内容.appendChild(x);
        requestAnimationFrame(() => x.style.opacity = '1');
        setTimeout(() => { x.style.opacity = '0'; setTimeout(() => x.移除(), 300); }, 1200);
    };

    const fmt = keys => {
        const mods = { control: 'Ctrl', shift: 'Shift', alt: 'Alt', meta: 'Win' };
        const sp = { ' ': '空格', enter: '回车', escape: 'Esc', backspace: '退格', tab: 'Tab', arrowup: '↑', arrowdown: '↓', arrowleft: '←', arrowright: '→' };
        const modArr = [], charArr = [], numArr = [], spArr = [];
        keys.filter(Boolean).forEach(k => {
            if (mods[k]) modArr.push(mods[k]);
            else if (/^[0-9]$/.test(k)) numArr.push(k);
            else if (k.length === 1) charArr.push(k.toUpperCase());
            else spArr.push(sp[k] || k.toUpperCase());
        });
        const res = [...modArr];
        if (charArr.length) res.push(`字符：${charArr.join('+')}`);
        if (numArr.length) res.push(`数字：${numArr.join('+')}`);
        if (spArr.length) res.push(spArr.join('+'));
        return res.join(' + ');
    };

    const spans = () => document.querySelectorAll('li.treeView span');
    const findSpan = text => {
        const a = spans();
        for (let i = a.length - 1; i >= 0; i--) if (a[i].textContent.trim() === text) return a[i];
    };
    const hintText = () => `【快捷菜单：按“/”键弹出面板 · 长按“/”开启或关闭 ${enabled ? '(已开启)' : '(已关闭)'}】`;
    const getTempArr = t => t === 'sub' ? tempSub : t === 'extra' ? tempExtra : t === 'extraSub' ? tempExtraSub : tempCfg;
    const on = (el, enter, leave) => {
        el.onmouseenter = () => Object.assign(el.style, enter);
        el.onmouseleave = () => Object.assign(el.style, leave);
    };
    const clone = o => JSON.parse(JSON.stringify(o));
    const stopRec = () => {
        if (recKd) document.removeEventListener('keydown', recKd, true);
        if (recKu) document.removeEventListener('keyup', recKu, true);
        recKd = recKu = null;
        rec = { t: null, i: null };
        combo.clear();
    };

    const finishRec = () => {
        const { t, i } = rec;
        if (i === null) return;
        const keys = [...combo];
        const arr = getTempArr(t);
        if (arr && arr[i]) arr[i].key = keys.join('+');
        stopRec();
        render(true);
        panel.style.display = 'flex';
        toast(`已录制快捷键：${fmt(keys)}`);
    };
    const startRec = (t, i, btn) => {
        btn.textContent = '请按下...';
        btn.style.borderColor = '#ef4444';
        btn.style.color = '#f87171';
        stopRec();
        rec = { t, i };
        recKd = e => {
            if (rec.t === t && rec.i === i) {
                e.preventDefault();
                combo.add(e.key.toLowerCase());
            }
        };
        recKu = e => {
            if (rec.t === t && rec.i === i) {
                e.preventDefault();
                finishRec();
            }
        };
        document.addEventListener('keydown', recKd, true);
        document.addEventListener('keyup', recKu, true);
    };

    const COLW = 72;
    const PANEL_W = 1130;
    const COL_PAD = 16;
    const COL_GAP = 14;
    const NAME_MAXW = 260;

    const STY = {
        col: `background:#334155;padding:${COL_PAD}px;border-radius:14px;border:1px solid #475569;display:flex;flex-direction:column;min-width:0;`,
        title: 'font-weight:600;color:#f1f5f9;margin-bottom:14px;font-size:14px;text-align:center;letter-spacing:.5px;',
        row: `display:grid;grid-template-columns:${COLW}px 1fr;gap:8px;align-items:center;padding:5px 0;text-align:center;`,
        btn: 'padding:6px 4px;border:1px solid #475569;border-radius:8px;font-size:12px;cursor:pointer;width:100%;background:#1e293b;color:#cbd5e1;transition:all .15s;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;',
        inp: `padding:6px 10px;border:1px solid #475569;border-radius:8px;font-size:13px;outline:none;width:100%;max-width:${NAME_MAXW}px;box-sizing:border-box;background:#1e293b;color:#f1f5f9;transition:border-color .15s;`
    };
    const HOVER = { bg: '#475569', fg: '#f1f5f9' };
    const NORMAL = { bg: '#1e293b', fg: '#cbd5e1' };

    const renderCol = (items, type, title) => {
        const col = $('div', null, STY.col);
        col.appendChild($('div', title, STY.title));
        const isSub = type === 'sub' || type === 'extraSub';
        const header = $('div', null, `display:grid;grid-template-columns:${COLW}px 1fr;gap:8px;align-items:center;padding:0 0 10px;margin-bottom:4px;border-bottom:1px solid #475569;font-size:13px;color:#94a3b8;font-weight:500;text-align:center;`);
        header.innerHTML = `<div>按键</div><div>${isSub ? '完整子菜单名称' : '完整菜单名称'}</div>`;
        col.appendChild(header);

        items.forEach((it, idx) => {
            const row = $('div', null, STY.row);
            const kb = $('button', it.key ? fmt(it.key.split('+')) : '未设置', STY.btn);
            on(kb, HOVER, NORMAL);
            kb.onclick = () => startRec(type, idx, kb);
            const inp = $('input', null, STY.inp);
            inp.type = 'text';
            inp.value = it.text;
            inp.oninput = () => items[idx].text = inp.value;
            inp.onfocus = () => inp.style.borderColor = '#60a5fa';
            inp.onblur = () => inp.style.borderColor = '#475569';
            row.append(kb, inp);
            col.appendChild(row);
        });
        return col;
    };

    const render = (keepDraft = false) => {
        if (panel) panel.remove();
        if (!keepDraft) {
            tempCfg = clone(cfg);
            tempSub = clone(sub);
            tempExtra = clone(extra);
            tempExtraSub = clone(extraSub);
        }
        panel = $('div', null, `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999;background:#1e293b;padding:28px;border-radius:20px;box-shadow:0 24px 64px rgba(0,0,0,.45);width:min(${PANEL_W}px,95vw);max-height:85vh;overflow-y:auto;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;box-sizing:border-box;display:none;flex-direction:column;border:1px solid #334155;`);

        const tw = $('div', null, 'display:flex;justify-content:center;align-items:center;position:relative;margin-bottom:22px;');
        tw.innerHTML = `<h3 style="margin:0;font-size:17px;color:#f8fafc;font-weight:600;">快捷键菜单配置</h3>`;
        const cx = $('button', '×', 'position:absolute;right:0;border:none;background:#334155;border-radius:10px;width:32px;height:32px;cursor:pointer;font-size:18px;color:#94a3b8;display:flex;align-items:center;justify-content:center;transition:all .15s;');
        on(cx, { background: '#475569', color: '#e2e8f0' }, { background: '#334155', color: '#94a3b8' });
        cx.onclick = () => {
            panel.style.display = 'none';
            stopRec();
        };
        tw.appendChild(cx);
        panel.appendChild(tw);

        const cols = $('div', null, `display:grid;grid-template-columns:repeat(4, 1fr);gap:${COL_GAP}px;`);
        cols.append(
            renderCol(tempCfg, 'main', '【单击按键】'),
            renderCol(tempSub, 'sub', '【双击按键】'),
            renderCol(tempExtra, 'extra', '【备用单击】'),
            renderCol(tempExtraSub, 'extraSub', '【备用双击】')
        );
        panel.appendChild(cols);

        const bw = $('div', null, 'display:flex;gap:24px;justify-content:flex-end;margin-top:24px;');
        bw.innerHTML = `<button id="kb-reset" style="background:#334155;color:#cbd5e1;border:1px solid #475569;padding:9px 24px;border-radius:10px;cursor:pointer;font-size:14px;font-weight:500;transition:all .15s;">重置默认</button><button id="kb-save" style="background:#3b82f6;color:#fff;border:none;padding:9px 24px;border-radius:10px;cursor:pointer;font-size:14px;font-weight:500;transition:all .15s;">保存配置</button>`;
        const rb = bw.querySelector('#kb-reset'), sb = bw.querySelector('#kb-save');
        on(rb, HOVER, NORMAL);
        on(sb, { background: '#2563eb' }, { background: '#3b82f6' });
        rb.onclick = () => {
            tempCfg = 克隆(DEF);
            tempSub = 克隆(DEF_SUB);
            tempExtra = 克隆(DEF_EXTRA);
            tempExtraSub = 克隆(DEF_EXTRA);
            toast('已重置为默认（点“保存配置”后生效）');
            render(true);
            panel.style.display = 'flex';
        };
        sb.onclick = () => {
            cfg = tempCfg;
            sub = tempSub;
            extra = tempExtra;
            extraSub = tempExtraSub;
            保存('shortcutConfig', cfg);
            保存('subMenuConfig', sub);
            保存('extraMenuConfig', extra);
            保存('extraSubConfig', extraSub);
            toast('已成功保存配置');
            panel.style.display = 'none';
        };
        panel.appendChild(bw);
        document.内容.appendChild(panel);
    };

    const togglePanel = () => {
        if (!panel) {
            render(false);
            panel.style.display = 'flex';
            return;
        }
        if (panel.style.display === 'none') {
            render(false);
            panel.style.display = 'flex';
        } else {
            panel.style.display = 'none';
            stopRec();
        }
    };

    const addHint = () => {
        const c = document.querySelector('div.taskbtn-row[data-v-061470f5][data-v-64041f50]');
        if (!c || c.querySelector('.keybind-hint')) return;
        c.appendChild($('div', hintText(), 'color:#94a3b8;font-size:12px;padding:6px 8px;text-align:left;letter-spacing:.3px;')).className = 'keybind-hint';
    };
    新建 MutationObserver(addHint).observe(document.内容, { childList: true, subtree: true });
    addHint();

    const openSub = text => {
        const s = findSpan(text);
        if (s && s.closest('a')) {
            s.closest('a').click();
            toast(`打开子菜单：${text}`);
        } else toast(`未找到子菜单：${text}`);
    };

    const handleCombo = (cs, e) => {
        const now = 日期.now();
        if (cs === lastK && now - lastT < 300) {
            e.preventDefault();
            const m = sub.find(i => i.key === cs && i.text) || extraSub.find(i => i.key === cs && i.text);
            if (m) openSub(m.text);
            lastT = 0;
            lastK = '';
            if (dcTimer) { clearTimeout(dcTimer); dcTimer = null; }
            return;
        }
        lastT = now;
        lastK = cs;
        if (dcTimer) { clearTimeout(dcTimer); dcTimer = null; }
        dcTimer = setTimeout(() => {
            dcTimer = null;
            const m = cfg.find(i => i.key === cs && i.text) || extra.find(i => i.key === cs && i.text);
            if (!m) return;
            e.preventDefault();
            Array.from(spans()).filter(x => x.textContent.trim() === m.text).pop()?.closest('a')?.click();
        }, 300);
    };

    // ===== 长按“/”开启/关闭；短按“/”呼出面板（互斥，防重复触发） =====
    let lpArmed = false;   // 本次物理按键是否已启动计时器（防止 OS 自动重复反复切换）
    let lpFired = false;   // 本次物理按键是否已触发长按切换

    const toggleEnabled = () => {
        启用 = !启用;
        toast(启用 ? '快捷菜单已开启' : '快捷菜单已关闭');
        const h = document.querySelector('.keybind-hint');
        if (h) h.textContent = hintText();
    };

    document.addEventListener('keydown', e => {
        const a = document.activeElement;
        if (['INPUT', 'TEXTAREA'].includes(a.tagName) || a.isContentEditable || rec.i !== null) return;

        if (e.key === '/') {
            e.preventDefault();
            if (lpArmed) return;          // 已按着，忽略自动重复
            lpArmed = true;
            lpFired = false;
            lpTimer = setTimeout(() => {
                lpTimer = null;
                lpFired = true;           // 标记：本次是长按，松开时不再呼面板
                toggleEnabled();          // 到点只切换一次
            }, 600);
            return;
        }

        if (!启用) return;
        const keys = 新建 Set();
        if (e.ctrlKey) keys.添加('control');
        if (e.shiftKey) keys.添加('shift');
        if (e.altKey) keys.添加('alt');
        if (e.metaKey) keys.添加('meta');
        keys.添加(e.key.toLowerCase());
        handleCombo([...keys].join('+'), e);
    });

    document.addEventListener('keyup', e => {
        if (e.key !== '/') return;
        if (!lpArmed) return;             // 不是我们按下的那个键，忽略
        lpArmed = false;                  // 松开复位，下一次长按才能再触发

        if (lpTimer) {
            // 未到长按时间就松开 → 短按，呼出/收起面板
            clearTimeout(lpTimer);
            lpTimer = null;
            if (!lpFired) togglePanel();
        }
        // 长按场景（lpFired=true）：计时器已触发切换，松开时什么都不做，绝不呼面板
        lpFired = false;
    });

    render(false);
    panel.style.display = 'none';
})();
