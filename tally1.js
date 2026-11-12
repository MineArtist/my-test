// 表格数据全量主动统计(多表隔离极速版) - 纯JS单文件版
// 版本: 9.0
// 说明: 多表隔离并行，精准读取真实条数，彻底移除汇总行干扰；
//       长按"+"开启/关闭并持久化，动态显示状态提示
// 使用: 直接保存为 .js 文件，在目标页面通过 <script> 引入或在控制台执行
// 注意: 本脚本依赖页面中已存在的 ExtJS 框架及全局 Ext 对象

(function () {
    'use strict';

    // ========== 配置 ==========
    const LP_DELAY = 600; // 长按延迟(毫秒)
    const STORAGE_KEY = 'statsEnabled'; // localStorage 存储键名

    // ========== 状态管理(替代 GM_getValue/GM_setValue) ==========
    const storage = {
        get(key, defaultValue) {
            try {
                const val = localStorage.getItem(key);
                if (val === null) return defaultValue;
                return JSON.parse(val);
            } catch (e) {
                return defaultValue;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                // 忽略存储异常
            }
        }
    };

    let enabled = storage.get(STORAGE_KEY, true);

    // ========== 提示框(toast) ==========
    const toast = (t) => {
        const x = document.createElement('div');
        x.textContent = t;
        x.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2147483647;background:#334155;color:#f1f5f9;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:500;opacity:0;transition:opacity .3s;pointer-events:none;box-shadow:0 8px 24px rgba(0,0,0,.3);border:1px solid #475569;';
        document.body.appendChild(x);
        requestAnimationFrame(() => x.style.opacity = '1');
        setTimeout(() => { x.style.opacity = '0'; setTimeout(() => x.remove(), 300); }, 1200);
    };

    // ========== 悬浮提示框 ==========
    const tooltip = document.createElement('div');
    tooltip.style.cssText = 'position: fixed; background: rgba(0,0,0,0.9); color: #fff; padding: 6px 12px; border-radius: 4px; font-size: 13px; pointer-events: none; z-index: 2147483647; display: none; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.3); will-change: left, top;';
    document.body.appendChild(tooltip);

    // ========== 全局变量 ==========
    let currentTd = null, lastX = 0, lastY = 0;
    let hoverTimer = null, isMoving = false, heartbeat = null;

    const storeCache = new Map();

    // ========== 工具函数 ==========
    const cleanStr = (s) => String(s == null ? '' : s).substring(0, 200).replace(/<[^>]*>|&nbsp;|[\s\u200b\ufeff]/g, '').trim();

    const getRecords = (d) => {
        if (!d) return [];
        if (Array.isArray(d)) return d;
        for (let k of ['Rows', 'rows', 'Data', 'data', 'List', 'list']) if (Array.isArray(d[k])) return d[k];
        for (let k in d) if (Array.isArray(d[k]) && d[k].length && typeof d[k][0] === 'object') return d[k];
        return [];
    };

    const getRealTotalCount = (store, gridEl) => {
        let count = store.getTotalCount();
        const localCount = store.getRange().length;

        if (localCount > 0 && count > localCount) {
            const domRows = gridEl.querySelectorAll('.x-grid-item-container > table.x-grid-item').length;
            if (domRows === localCount) return localCount;
        }

        if (count > 0) return count;

        try {
            const pagingEl = gridEl.querySelector('.x-toolbar-docked-bottom, .x-toolbar-docked-top');
            if (pagingEl) {
                const txt = pagingEl.textContent || '';
                const match = txt.match(/共\s*(\d+)\s*条/);
                if (match) return parseInt(match[1], 10);
            }
        } catch (e) { }

        const rows = gridEl.querySelectorAll('.x-grid-item-container > table.x-grid-item').length;
        return rows > 0 ? rows : 1;
    };

    const getCtx = (td) => {
        try {
            const gridEl = td.closest('.x-panel.x-grid');
            const grid = Ext.getCmp(gridEl?.id);
            const rec = grid?.getView()?.getRecord(td);
            const col = grid?.getView()?.getHeaderByCell?.(td) || grid?.getView()?.getGridColumns()?.[td.cellIndex];
            if (rec && col) {
                let raw = rec.get(col.dataIndex);
                if (raw === null || raw === undefined) raw = '';
                return { dataIndex: col.dataIndex || 'unknown', raw: String(raw), dom: (td.textContent || '').replace(/\s+/g, '').trim() };
            }
        } catch (e) { }
        return null;
    };

    const buildCache = (records) => {
        const cache = new Map();
        records.forEach(rec => {
            const data = rec.getData ? rec.getData() : rec;
            if (!data) return;

            for (let k in data) {
                if (typeof data[k] === 'object' && data[k] !== null) continue;
                const val = cleanStr(data[k]);
                if (!cache.has(k)) cache.set(k, new Map());
                const m = cache.get(k);
                m.set(val, (m.get(val) || 0) + 1);
            }
        });
        return cache;
    };

    const initStore = (store) => {
        let state = storeCache.get(store);
        if (!state) {
            state = { map: new Map(), total: 0, progress: 0, isFetching: false, token: 0 };
            storeCache.set(store, state);

            if (store.on) {
                const reset = () => {
                    state.map.clear();
                    state.total = 0;
                    state.progress = 0;
                    state.isFetching = false;
                    state.token++;
                    if (currentTd && Ext.getCmp(currentTd.closest('.x-panel.x-grid')?.id)?.getStore() === store) {
                        tooltip.style.display = 'none';
                        currentTd = null;
                        clearInterval(heartbeat);
                        clearTimeout(hoverTimer);
                    }
                };
                store.on('load', reset);
                store.on('datachanged', reset);
            }
        }
        return state;
    };

    const fetchAll = async (store, count, state) => {
        if (state.isFetching) return;
        state.isFetching = true;
        const token = ++state.token;
        state.progress = 0;
        let allData = [];

        if (count <= 200) {
            allData = getRecords(store.getRange());
            state.progress = allData.length;
        } else {
            const url = new URL(store.getProxy().getUrl(), location.href).href;
            const q = (store.getProxy().getExtraParams() || {}).listingQuery || {};
            const pageSize = 3000, pages = Math.ceil(count / pageSize);

            for (let p = 1; p <= pages; p++) {
                if (token !== state.token) return;
                try {
                    const resp = await fetch(url, {
                        method: 'POST', credentials: 'include',
                        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                        body: JSON.stringify({ listingQuery: { ...q, PageSize: pageSize, PageCount: p }, page: p, start: (p - 1) * pageSize })
                    });
                    if (token !== state.token) return;

                    const json = await resp.json();
                    const inner = json.GetBillListingNewResult ? JSON.parse(json.GetBillListingNewResult) : json;
                    const pageData = getRecords(inner);
                    if (pageData.length) allData = allData.concat(pageData);

                    state.progress = allData.length;

                    let shouldYield = false;
                    if (currentTd) {
                        const currentStore = Ext.getCmp(currentTd.closest('.x-panel.x-grid')?.id)?.getStore();
                        const currentState = storeCache.get(currentStore);
                        if (currentState && currentState.isFetching && currentStore !== store) {
                            shouldYield = true;
                        }
                    }

                    await new Promise(r => setTimeout(r, shouldYield ? 150 : 10));
                } catch (e) { break; }
            }
        }

        if (token !== state.token) return;
        state.map = buildCache(allData);
        state.isFetching = false;
    };

    const ensureFetchStarted = (store, count, state) => {
        if (state.total !== count) {
            state.total = count;
            state.map.clear();
            if (!state.isFetching) fetchAll(store, count, state);
        } else if (!state.isFetching && state.map.size === 0) {
            fetchAll(store, count, state);
        }
    };

    const refresh = (ctx, state) => {
        if (!currentTd || !ctx) return;

        if (state.isFetching && !state.map.has(ctx.dataIndex)) {
            const pct = state.total > 0 ? Math.min(99, Math.round((state.progress / state.total) * 100)) : 0;
            tooltip.textContent = `后台极速统计中... [${'■'.repeat(Math.round(pct / 10))}${'□'.repeat(10 - Math.round(pct / 10))}] ${pct}%`;
            return;
        }

        const map = state.map.get(ctx.dataIndex);
        let n = 0;
        if (map) {
            const cands = [cleanStr(ctx.raw), cleanStr(ctx.dom)].filter(c => c !== null);
            for (let c of cands) {
                if (map.has(c)) { n = map.get(c); break; }
            }
            if (n === 0 && cands.length > 1) {
                for (let [k, v] of map.entries()) {
                    if (k !== '' && (k.includes(cands[1]) || cands[1].includes(k))) { n = v; break; }
                }
            }
        }
        let display = ctx.dom || ctx.raw || '(空)';
        tooltip.textContent = `「${display}」共 ${n} 条 / 全量 ${state.total} 条`;
    };

    const moveTooltip = (x, y) => {
        let left = x + 14, top = y + 20;
        if (x + 280 > window.innerWidth) left = x - 280;
        if (y + 60 > window.innerHeight) top = y - 50;
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    };

    const clearHover = () => {
        tooltip.style.display = 'none';
        currentTd = null;
        clearTimeout(hoverTimer);
        clearInterval(heartbeat);
    };

    // ========== 鼠标移动监听 ==========
    document.addEventListener('mousemove', (e) => {
        if (!enabled) return;

        let td = e.target.closest?.('td.x-grid-cell');

        if (!td || td.querySelector('.x-grid-row-checker, .x-grid-cell-row-checker') || td.closest('.x-grid-row-summary')) {
            if (tooltip.style.display !== 'none') tooltip.style.display = 'none';
            currentTd = null; clearTimeout(hoverTimer); clearInterval(heartbeat);
            return;
        }

        const gridEl = td.closest('.x-panel.x-grid');
        const gridCmp = Ext.getCmp(gridEl?.id);
        const store = gridCmp?.getStore();
        if (!store) return;

        const state = initStore(store);
        const ctx = getCtx(td);
        if (!ctx) return;

        lastX = e.clientX; lastY = e.clientY;
        if (!isMoving) {
            isMoving = true;
            requestAnimationFrame(() => {
                if (tooltip.style.display === 'block') moveTooltip(lastX, lastY);
                isMoving = false;
            });
        }

        if (currentTd !== td) {
            currentTd = td;
            tooltip.style.display = 'none';
            clearInterval(heartbeat);
            clearTimeout(hoverTimer);

            const count = getRealTotalCount(store, gridEl);
            ensureFetchStarted(store, count, state);

            hoverTimer = setTimeout(() => {
                if (currentTd !== td || !enabled) return;
                moveTooltip(lastX, lastY);
                refresh(ctx, state);
                tooltip.style.display = 'block';
                heartbeat = setInterval(() => {
                    if (currentTd === td && enabled) refresh(getCtx(td), state);
                }, 100);
            }, 10);
        }
    }, true);

    // ========== 状态提示栏 ==========
    const hintText = () => `【计数显示：长按"+"开启或关闭 ${enabled ? '(已开启)' : '(已关闭)'}】`;

    const updateHint = () => {
        const h = document.querySelector('.stats-hint');
        if (h) h.textContent = hintText();
    };

    const addHint = () => {
        const c = document.querySelector('div.taskbtn-row');
        if (!c) return;
        const exist = c.querySelector('.stats-hint');
        if (exist) {
            if (exist.textContent !== hintText()) exist.textContent = hintText();
            return;
        }
        const el = document.createElement('div');
        el.className = 'stats-hint';
        el.textContent = hintText();
        el.style.cssText = 'color:#94a3b8;font-size:12px;padding:6px 8px;text-align:left;letter-spacing:.3px;';
        c.appendChild(el);
    };

    new MutationObserver(addHint).observe(document.body, { childList: true, subtree: true });
    addHint();

    // ========== 长按 "+" 切换开关 ==========
    let lpTimer = null;
    let lpArmed = false;

    const setEnabled = (v) => {
        enabled = v;
        storage.set(STORAGE_KEY, enabled);
        if (!enabled) clearHover();
        updateHint();
        toast(enabled ? '计数显示已开启' : '计数显示已关闭');
    };

    const isPlusKey = (e) => e.key === '+' || e.code === 'NumpadAdd' || (e.key === '=' && e.shiftKey);

    document.addEventListener('keydown', (e) => {
        const a = document.activeElement;
        if (a && (['INPUT', 'TEXTAREA'].includes(a.tagName) || a.isContentEditable)) return;

        if (!isPlusKey(e)) return;
        if (lpArmed) return;
        lpArmed = true;
        lpTimer = setTimeout(() => {
            lpTimer = null;
            setEnabled(!enabled);
        }, LP_DELAY);
    }, true);

    document.addEventListener('keyup', (e) => {
        if (!isPlusKey(e)) return;
        if (lpTimer) {
            clearTimeout(lpTimer);
            lpTimer = null;
        }
        lpArmed = false;
    }, true);
})();