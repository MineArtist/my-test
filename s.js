    // ===== 长按“/”开启/关闭；短按“/”呼出面板（互斥，防重复触发） =====
    let lpTimer = null;
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
