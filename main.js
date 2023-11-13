import { StaticNaviMenu } from './staticNaviMenu.js';
document.addEventListener('DOMContentLoaded', () => {
    const settings = {
        btn: '.navi__inner button',
        target: '.circle',
        bgArea: 'body',
        diameter: 40,
        interval: 5
    };
    try {
        const startTime = performance.now();
        const menu = new StaticNaviMenu(settings);
        menu.addEvent();
        const endTime = performance.now();
        console.log(endTime - startTime);
    }
    catch (e) {
        console.error(e);
    }
});
