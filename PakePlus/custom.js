console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
    'color:orangered;font-weight:bolder'
);

// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a');
    const isBaseTargetBlank = document.querySelector('head base[target="_blank"]');
    console.log('origin', origin, isBaseTargetBlank);
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault();
        console.log('handle origin', origin);
        location.href = origin.href;
    } else {
        console.log('not handle origin', origin);
    }
};

document.addEventListener('click', hookClick, { capture: true });


// ==============================
// 强制 cfg.actor = 0 脚本
// ==============================

(function forceActorZero() {
    const interval = setInterval(() => {
        // 找到 cfg 对象后修改 actor
        if (typeof window.cfg === 'object') {
            try {
                Object.defineProperty(window.cfg, 'actor', {
                    value: 0,
                    writable: false,   // 防止被重写
                    configurable: false
                });
                console.log('%c[patch] cfg.actor 强制为 0', 'color: green; font-weight: bold;');
            } catch (err) {
                console.warn('[patch] cfg.actor 设置失败', err);
            }
            clearInterval(interval);
        }
    }, 50); // 检测频率，可以根据页面加载快慢调节
})();