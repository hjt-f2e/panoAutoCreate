const puppeteer = require('puppeteer');
const handleLogin = require('./funcs/login');
const panoId = require('./funcs/panoId');
const autoCreate = require('./funcs/autoCreate');
const config = require('./config');
const notify = require('./funcs/notify');

(async () => {

    const browser = await puppeteer.launch({
        headless: true, // 是否显示浏览器
        defaultViewport: {
            width: 800,
            height: 600
        }
    });

    try {
        const page = await browser.newPage();
        await page.goto(config.HOST);
    
        // 输入账号密码
        await handleLogin(page);
        // 获取pano_id
        const ids = await panoId.getRemoteIds(config.remotePanoIdUrl);

        // 开始串行处理
        for (let i = 0; i < ids.length; i++) {
            await autoCreate(page, ids[i]);
        }

        // 处理结束
        console.log('-----全部结束-----');
    
        browser.close();
        notify.finish();
    } catch (err) {
        // console.log(err);
        notify.error(err.message);
        browser.close();
    }
})();
