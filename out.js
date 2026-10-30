/* 成品检验发出匹配 —— 单文件版（可直接 <script> 引入） */
(function () {
    'use strict';

    var MENU_TEXT  = '成品检验发出';
    var ROOT_ID    = 'qcFinishProductStockOut-body';
    var FLOAT_ID   = '__match_float__';
    var INPUT_ID   = '__match_input__';
    var BTN_ID     = '__match_btn__';
    var CODE_ID    = '__match_code__';
    var PAUSE_ID   = '__match_pause__';
    var HINT_ID    = '__match_hint__';

    var RENDER_WAIT = 10;
    var POLL_STEP   = 0;
    var SCROLL_STEP = 460;
    var SCROLL_WAIT = 5;

    var PAUSED = false;

    /* ============ 提示 ============ */
    function showToast(t, ms) {
        var el = document.createElement('div');
        el.textContent = t;
        el.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);' +
            'z-index:2147483647;background:rgba(0,0,0,.78);color:#fff;padding:10px 20px;' +
            'border-radius:8px;font-size:14px;opacity:0;transition:opacity .3s ease;pointer-events:none';
        document.body.appendChild(el);
        requestAnimationFrame(function () { el.style.opacity = '1'; });
        setTimeout(function () {
            el.style.opacity = '0';
            setTimeout(function () { el.remove(); }, 300);
        }, ms || 1500);
    }

    function isVisible(el) {
        if (!el) return false;
        var s = window.getComputedStyle(el);
        if (s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) === 0) return false;
        if (el.offsetParent === null && s.position !== 'fixed') return false;
        return el.clientWidth > 0 && el.clientHeight > 0;
    }

    function getRoot() {
        return document.getElementById(ROOT_ID);
    }

    function openSubMenu(menuText, cb) {
        var spans = document.querySelectorAll('li.treeView span');
        var target = null;
        for (var i = spans.length - 1; i >= 0; i--) {
            if (spans[i].textContent.trim() === menuText) { target = spans[i]; break; }
        }
        if (!target) { showToast('未找到子菜单：' + menuText); cb && cb(false); return; }
        var a = target.closest('a');
        if (!a) { showToast('未找到菜单链接'); cb && cb(false); return; }
        a.click();
        showToast('打开：' + menuText);
        cb && cb(true);
    }

    /* ============ 表头判断 ============ */
    function headerTitles(gridEl) {
        var arr = [];
        var hs = gridEl.querySelectorAll('.x-column-header');
        for (var i = 0; i < hs.length; i++) {
            var t = ((hs[i].querySelector('.x-column-header-text') || {}).textContent || '')
                .replace(/\s+/g, '');
            arr.push(t);
        }
        return arr;
    }
    function isMainGridEl(gridEl) {
        var ts = headerTitles(gridEl);
        var score = 0;
        for (var i = 0; i < ts.length; i++) {
            if (ts[i].indexOf('单据编号') > -1) score += 5;
            if (ts[i].indexOf('单据日期') > -1) score += 3;
            if (ts[i].indexOf('单据状态') > -1) score += 3;
            if (ts[i].indexOf('创建时间') > -1) score += 2;
            if (ts[i].indexOf('条码') > -1) score -= 5;
            if (ts[i].indexOf('流水号') > -1) score -= 5;
            if (ts[i].indexOf('行标识') > -1) score -= 5;
        }
        return score >= 5;
    }
    function isDetailGridEl(gridEl) {
        var ts = headerTitles(gridEl);
        var score = 0;
        for (var i = 0; i < ts.length; i++) {
            if (ts[i].indexOf('行标识') > -1) score += 5;
            if (ts[i].indexOf('条码') > -1) score += 4;
            if (ts[i].indexOf('流水号') > -1) score += 4;
            if (ts[i].indexOf('正品') > -1 || ts[i].indexOf('次品') > -1) score += 3;
            if (ts[i].indexOf('缸号') > -1) score += 3;
        }
        return score >= 5;
    }

    function findMainGridCmp() {
        if (typeof Ext === 'undefined' || !Ext.ComponentQuery) return null;
        var root = getRoot();
        if (!root) return null;
        var grids = Ext.ComponentQuery.query('gridpanel, grid');
        var best = null, bestRows = -1;
        for (var i = 0; i < grids.length; i++) {
            var g = grids[i];
            var el = g.el && g.el.dom;
            if (!el || !isVisible(el)) continue;
            if (!root.contains(el)) continue;
            if (!isMainGridEl(el)) continue;
            var st = g.getStore && g.getStore();
            var cnt = st ? st.getCount() : 0;
            if (cnt > bestRows) { bestRows = cnt; best = g; }
        }
        return best;
    }
    function findDetailGridEl() {
        var root = getRoot();
        if (!root) return null;
        var grids = root.querySelectorAll('.x-grid');
        var best = null, bestRows = -1;
        for (var i = 0; i < grids.length; i++) {
            var g = grids[i];
            if (!isVisible(g)) continue;
            if (!isDetailGridEl(g)) continue;
            var n = g.querySelectorAll('.x-grid-item-container tr.x-grid-row').length;
            if (n > bestRows) { bestRows = n; best = g; }
        }
        return best;
    }

    function cellTextByHeader(tr, keyword) {
        if (!tr) return '';
        var tds = tr.querySelectorAll('td.x-grid-cell');
        for (var i = 0; i < tds.length; i++) {
            var colId = tds[i].getAttribute('data-columnid') || '';
            var header = document.querySelector('#' + CSS.escape(colId) + ' .x-column-header-text');
            var title = header ? header.textContent.replace(/\s+/g, '') : '';
            if (title.indexOf(keyword) > -1) {
                var t = (tds[i].textContent || '').trim();
                if (t) return t;
            }
        }
        return '';
    }

    function findDetailScroller(detailEl) {
        if (!detailEl) return null;
        var v = detailEl.querySelector('.x-grid-view');
        if (v && v.scrollHeight > v.clientHeight) return v;
        var cands = detailEl.querySelectorAll('*');
        for (var i = 0; i < cands.length; i++) {
            var c = cands[i];
            if (c.scrollHeight > c.clientHeight + 5 && c.clientHeight > 30) return c;
        }
        return v || null;
    }

    function matchInDetailVisible(keyword) {
        var detail = findDetailGridEl();
        if (!detail) return null;
        var container = detail.querySelector('.x-grid-item-container');
        if (!container) return null;
        var trs = container.querySelectorAll('tr.x-grid-row');
        for (var i = 0; i < trs.length; i++) {
            if (trs[i].classList.contains('x-grid-row-summary')) continue;
            var code = cellTextByHeader(trs[i], '条码');
            var serial = cellTextByHeader(trs[i], '流水号');
            if ((code && code.indexOf(keyword) > -1) ||
                (serial && serial.indexOf(keyword) > -1)) {
                var flag = cellTextByHeader(trs[i], '行标识');
                return { tr: trs[i], flag: flag, code: code, serial: serial };
            }
        }
        return null;
    }

    function scrollAndMatchDetail(keyword, done) {
        var detail = findDetailGridEl();
        if (!detail) { done && done(null); return; }

        var scroller = findDetailScroller(detail);
        if (!scroller) { done && done(matchInDetailVisible(keyword)); return; }

        scroller.scrollTop = 0;

        (function step() {
            if (PAUSED) { setTimeout(step, 100); return; }

            var hit = matchInDetailVisible(keyword);
            if (hit) { done && done(hit); return; }

            var cur = scroller.scrollTop;
            var max = scroller.scrollHeight - scroller.clientHeight;

            if (cur >= max - 2) {
                var hit2 = matchInDetailVisible(keyword);
                done && done(hit2 || null);
                return;
            }

            var next = Math.min(cur + SCROLL_STEP, max);
            scroller.scrollTop = next;

            try {
                scroller.dispatchEvent(new Event('scroll', { bubbles: true }));
            } catch (e) {}

            setTimeout(step, SCROLL_WAIT);
        })();
    }

    function grabPageText() {
        var root = getRoot();
        if (!root) return '';
        var parts = [];

        var fields = root.querySelectorAll('.x-field');
        for (var k = 0; k < fields.length; k++) {
            var f = fields[k];
            if (!isVisible(f)) continue;
            var inp = f.querySelector('input, textarea');
            if (inp && inp.value) parts.push(String(inp.value));
            var disp = f.querySelector('.x-form-display-field');
            if (disp && disp.textContent) parts.push(disp.textContent.trim());
        }

        var grids = root.querySelectorAll('.x-grid');
        for (var i = 0; i < grids.length; i++) {
            var g = grids[i];
            if (!isVisible(g)) continue;
            var rows = g.querySelectorAll('.x-grid-item-container tr.x-grid-row');
            for (var j = 0; j < rows.length; j++) {
                if (rows[j].classList.contains('x-grid-row-summary')) continue;
                parts.push((rows[j].textContent || '').replace(/\s+/g, ' ').trim());
            }
        }

        var panelText = (root.textContent || '').replace(/\s+/g, ' ').trim();
        if (panelText) parts.push(panelText);

        return parts.join(' \u0001 ');
    }

    function pickBillCode(tr) {
        var v = cellTextByHeader(tr, '单据编号');
        if (v) return v;
        var root = getRoot();
        if (!root) return '';
        var fields = root.querySelectorAll('.x-field');
        var norm = function (s) { return String(s || '').replace(/[\s:：\u00a0]/g, ''); };
        for (var k = 0; k < fields.length; k++) {
            var f = fields[k];
            if (!isVisible(f)) continue;
            var lab = f.querySelector('.x-form-item-label');
            if (!lab) continue;
            var labTxt = norm(lab.textContent);
            if (labTxt.indexOf('单据编号') > -1 || labTxt === '单号' || labTxt.indexOf('单据号') > -1) {
                var inp = f.querySelector('input, textarea');
                if (inp && inp.value) return String(inp.value).trim();
                var disp = f.querySelector('.x-form-display-field');
                if (disp && disp.textContent) return disp.textContent.trim();
            }
        }
        return '';
    }

    function realClickRow(tr) {
        if (!tr) return;
        var cell = null;
        var tds = tr.querySelectorAll('td.x-grid-cell');
        for (var i = 0; i < tds.length; i++) {
            var cls = tds[i].className || '';
            if (cls.indexOf('x-grid-cell-row-checker') > -1) continue;
            if (cls.indexOf('x-grid-cell-row-numberer') > -1) continue;
            if (cls.indexOf('x-grid-cell-special') > -1 && tds[i].querySelector('.x-grid-row-checker')) continue;
            cell = tds[i];
            break;
        }
        var target = cell || tr;
        var rect = target.getBoundingClientRect();
        var cx = rect.left + Math.min(20, rect.width / 2);
        var cy = rect.top + rect.height / 2;
        var opts = { bubbles: true, cancelable: true, view: window,
                     clientX: cx, clientY: cy, button: 0, buttons: 1 };
        target.dispatchEvent(new MouseEvent('mouseover', opts));
        target.dispatchEvent(new MouseEvent('mousemove', opts));
        target.dispatchEvent(new MouseEvent('mousedown', opts));
        try { target.focus && target.focus(); } catch (e) {}
        target.dispatchEvent(new MouseEvent('mouseup', opts));
        target.dispatchEvent(new MouseEvent('click', opts));
        if (target !== tr) {
            tr.dispatchEvent(new MouseEvent('mousedown', opts));
            tr.dispatchEvent(new MouseEvent('mouseup', opts));
            tr.dispatchEvent(new MouseEvent('click', opts));
        }
    }

    function setBillCode(code) {
        var el = document.getElementById(CODE_ID);
        if (!el) return;
        el.value = code || '';
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
    }
    function setHint(text) {
        var el = document.getElementById(HINT_ID);
        if (!el) return;
        el.textContent = text || '';
    }

    function runMatch(keyword, cb) {
        var tried = 0;
        var timer = setInterval(function () {
            if (PAUSED) return;
            tried++;
            var grid = findMainGridCmp();
            if (grid || tried > 100) {
                clearInterval(timer);
                if (!grid) { showToast('本容器未找到主列表'); cb && cb(false); return; }
                doRun(grid);
            }
        }, 50);

        function doRun(grid) {
            var store = grid.getStore && grid.getStore();
            var view  = grid.getView && grid.getView();
            if (!store || !view) { showToast('未取到 store/view'); cb && cb(false); return; }

            var total = store.getCount();
            if (total === 0) { showToast('主列表无数据'); cb && cb(false); return; }

            var records = [];
            for (var i = 0; i < total; i++) {
                var r = store.getAt(i);
                if (r) records.push(r);
            }

            showToast('共 ' + records.length + ' 行，开始匹配…');
            var idx = 0;

            (function next() {
                if (PAUSED) { setTimeout(next, 100); return; }

                if (idx >= records.length) {
                    showToast('未找到：' + keyword);
                    cb && cb(false);
                    return;
                }

                var rec = records[idx];

                var node = null;
                try { node = view.getNode(rec); } catch (e) { node = null; }
                if (!node || !isVisible(node)) {
                    try { grid.ensureVisible(rec); } catch (e) {}
                    node = null;
                    try { node = view.getNode(rec); } catch (e) { node = null; }
                    if (!node || !isVisible(node)) {
                        idx++;
                        setTimeout(next, POLL_STEP);
                        return;
                    }
                }

                var mainTr = node;

                realClickRow(mainTr);

                setTimeout(function () {
                    scrollAndMatchDetail(keyword, function (hit) {
                        if (hit) {
                            var code = pickBillCode(mainTr);
                            setBillCode(code);
                            setHint(hit.flag ? ('该条数据在第 ' + hit.flag + ' 条') : '');
                            showToast('已找到');
                            cb && cb(true);
                            return;
                        }
                        var pageText = grabPageText();
                        if (pageText.indexOf(keyword) > -1) {
                            var code2 = pickBillCode(mainTr);
                            setBillCode(code2);
                            setHint('');
                            showToast('已找到');
                            cb && cb(true);
                            return;
                        }
                        idx++;
                        setTimeout(next, POLL_STEP);
                    });
                }, RENDER_WAIT);
            })();
        }
    }

    function getSidebarContainer() {
        var sidebar = document.querySelector('.slimScrollDiv > .sidebar') ||
                      document.querySelector('.sidebar');
        return sidebar;
    }

    function buildFloat() {
        var old = document.getElementById(FLOAT_ID);
        if (old) old.remove();

        var box = document.createElement('div');
        box.id = FLOAT_ID;
        box.style.cssText = 'position:absolute;left:8px;right:8px;bottom:8px;' +
            'z-index:99;background:#374850;border:1px solid #4b565c;border-radius:10px;' +
            'box-shadow:0 6px 20px rgba(0,0,0,.45);color:#fff;font-family:inherit;' +
            'padding:10px 12px;user-select:none;display:flex;flex-direction:column;gap:8px;' +
            'box-sizing:border-box;';

        var head = document.createElement('div');
        head.style.cssText = 'display:flex;justify-content:space-between;align-items:center;';
        var ttl = document.createElement('span');
        ttl.textContent = '成品检验发出匹配';
        ttl.style.cssText = 'font-size:12px;font-weight:600;';
        head.appendChild(ttl);
        var closeBtn = document.createElement('span');
        closeBtn.textContent = '×';
        closeBtn.style.cssText = 'cursor:pointer;color:#8fa3ab;font-size:16px;padding:0 4px;';
        closeBtn.onclick = function () { box.style.display = 'none'; };
        head.appendChild(closeBtn);
        box.appendChild(head);

        var labelCss = 'flex:0 0 auto;color:#fff;font-size:12px;white-space:nowrap;';
        var inputCss = 'flex:1 1 auto;min-width:0;box-sizing:border-box;padding:6px 8px;' +
            'font-size:12px;color:#fff;background:#252c30;border:1px solid #4b565c;' +
            'border-radius:7px;outline:none;font-family:inherit;';

        var row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;gap:6px;';

        var label1 = document.createElement('span');
        label1.textContent = '条码号/流水号：';
        label1.style.cssText = labelCss;

        var input = document.createElement('input');
        input.id = INPUT_ID;
        input.type = 'text';
        input.placeholder = '输入匹配内容';
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('spellcheck', 'false');
        input.style.cssText = inputCss;

        row.appendChild(label1);
        row.appendChild(input);
        box.appendChild(row);

        var row2 = document.createElement('div');
        row2.style.cssText = 'display:flex;align-items:center;gap:6px;';

        var label2 = document.createElement('span');
        label2.textContent = '单据编号：';
        label2.style.cssText = labelCss;

        var codeInput = document.createElement('input');
        codeInput.id = CODE_ID;
        codeInput.type = 'text';
        codeInput.placeholder = '匹配成功后自动填入';
        codeInput.setAttribute('autocomplete', 'off');
        codeInput.setAttribute('spellcheck', 'false');
        codeInput.style.cssText = 'flex:1 1 auto;min-width:0;box-sizing:border-box;padding:6px 8px;' +
            'font-size:12px;color:#9fd3a5;background:#252c30;border:1px solid #4b565c;' +
            'border-radius:7px;outline:none;font-family:inherit;';

        row2.appendChild(label2);
        row2.appendChild(codeInput);
        box.appendChild(row2);

        var btnCss = 'flex:1 1 0;min-width:0;padding:6px 4px;font-size:12px;color:#fff;' +
            'background:#252c30;border:1px solid #4b565c;border-radius:7px;cursor:pointer;' +
            'font-family:inherit;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' +
            'transition:background .15s ease,border-color .15s ease,transform .1s ease;';

        var btnRow = document.createElement('div');
        btnRow.style.cssText = 'display:flex;align-items:center;gap:6px;';

        var btn = document.createElement('button');
        btn.id = BTN_ID;
        btn.type = 'button';
        btn.textContent = '查询';
        btn.style.cssText = btnCss;
        btn.addEventListener('mouseenter', function(){ btn.style.background = '#3a4449'; btn.style.borderColor = '#66737a'; });
        btn.addEventListener('mouseleave', function(){ btn.style.background = '#252c30'; btn.style.borderColor = '#4b565c'; });
        btn.addEventListener('mousedown', function(){ btn.style.transform = 'scale(.98)'; });
        btn.addEventListener('mouseup', function(){ btn.style.transform = 'scale(1)'; });

        btn.addEventListener('click', function () {
            var keyword = (input.value || '').trim();
            if (!keyword) { showToast('请先输入匹配内容'); input.focus(); return; }
            PAUSED = false;
            var pauseBtn = document.getElementById(PAUSE_ID);
            if (pauseBtn) pauseBtn.textContent = '暂停';
            btn.disabled = true;
            btn.style.opacity = '.6';
            setBillCode('');
            setHint('');
            openSubMenu(MENU_TEXT, function (ok) {
                if (!ok) { btn.disabled = false; btn.style.opacity = '1'; return; }
                setTimeout(function () {
                    runMatch(keyword, function () {
                        btn.disabled = false;
                        btn.style.opacity = '1';
                    });
                }, 1000);
            });
        });

        var pauseBtn = document.createElement('button');
        pauseBtn.id = PAUSE_ID;
        pauseBtn.type = 'button';
        pauseBtn.textContent = '暂停';
        pauseBtn.style.cssText = btnCss;
        pauseBtn.addEventListener('mouseenter', function(){ pauseBtn.style.background = '#3a4449'; pauseBtn.style.borderColor = '#66737a'; });
        pauseBtn.addEventListener('mouseleave', function(){ pauseBtn.style.background = '#252c30'; pauseBtn.style.borderColor = '#4b565c'; });
        pauseBtn.addEventListener('mousedown', function(){ pauseBtn.style.transform = 'scale(.98)'; });
        pauseBtn.addEventListener('mouseup', function(){ pauseBtn.style.transform = 'scale(1)'; });

        pauseBtn.addEventListener('click', function () {
            PAUSED = !PAUSED;
            pauseBtn.textContent = PAUSED ? '继续' : '暂停';
            showToast(PAUSED ? '已暂停' : '已继续');
        });

        btnRow.appendChild(btn);
        btnRow.appendChild(pauseBtn);
        box.appendChild(btnRow);

        var hint = document.createElement('div');
        hint.id = HINT_ID;
        hint.textContent = '';
        hint.style.cssText = 'color:#f0c674;font-size:12px;line-height:1.4;white-space:nowrap;padding-left:2px;';
        box.appendChild(hint);

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') { e.preventDefault(); btn.click(); }
        });

        var host = getSidebarContainer();
        if (host) {
            var hs = window.getComputedStyle(host);
            if (hs.position === 'static') host.style.position = 'relative';
            host.appendChild(box);
        } else {
            box.style.position = 'fixed';
            box.style.left = '8px';
            box.style.right = 'auto';
            box.style.bottom = '8px';
            box.style.width = '260px';
            document.body.appendChild(box);
        }

        return box;
    }

    /* ============ 等页面就绪后再挂悬浮窗 ============ */
    function boot() {
        var tries = 0;
        var t = setInterval(function () {
            tries++;
            var host = getSidebarContainer();
            if (host || tries > 100) {
                clearInterval(t);
                buildFloat();
            }
        }, 200);

        var mo = new MutationObserver(function () {
            if (!document.getElementById(FLOAT_ID)) {
                var host = getSidebarContainer();
                if (host) buildFloat();
            }
        });
        mo.observe(document.body, { childList: true, subtree: true });
    }

    boot();
})();