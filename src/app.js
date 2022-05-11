const puppeteer = require('puppeteer');
const handleLogin = require('./funcs/login');
const panoId = require('./funcs/panoId');
const autoCreate = require('./funcs/autoCreate');
const config = require('./config');
const notify = require('./funcs/notify');
let startTime = 0;

(async () => {


    const browser = await puppeteer.launch({
        headless: true, // 是否不显示浏览器
        defaultViewport: {
            width: 800,
            height: 600
        }
    });

    try {
        const page = await browser.newPage();
        await page.goto(config.HOST);
        // 获取pano_id
        const ids = await panoId.getRemoteIds(config.remotePanoIdUrl);

        notify.start();
        console.log(`-----任务开始，总计：${panoId.getAllIds().length}-----`);
        // 记录开始时间
        startTime = new Date();

        // 输入账号密码
        await handleLogin(page);

        // 开始串行处理
        for (let i = 0; i < ids.length; i++) {
            await autoCreate(page, ids[i], i);
        }

        // 处理结束
        console.log('-----全部结束-----');
    
        browser.close();
        notify.finish(startTime);
    } catch (err) {
        // console.log(err);
        notify.error(err.message, startTime);
        browser.close();
    }
})();

process.on('uncaughtException', (err, origin) => {
    const errMsg = `uncaughtException 全局异常\n捕获的异常：${err}\n异常的来源：${origin}`;
    notify.error(errMsg, startTime);
});

process.on('unhandledRejection', (err, origin) => {
    const errMsg = `unhandledRejection Promise未绑定异常\n捕获的异常：${err}\n异常的来源：${origin}`;
    notify.error(errMsg, startTime);
});
