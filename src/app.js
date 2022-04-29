const puppeteer = require('puppeteer');
const { sleep } = require('./utils/tools');
const handleLogin = require('./funcs/login');
const getIds = require('./funcs/getIds');
const autoCreate = require('./funcs/autoCreate');
const config = require('./config');

(async () => {

    const browser = await puppeteer.launch({
        headless: false, // 是否显示浏览器
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
        const ids = await getIds();

        // 开始批量处理
        for (let i = 0; i < ids.length; i++) {
            await autoCreate(page, ids[i]);
        }

        // // 进入生成弹窗
        // await sleep();
        // console.log('进入生成弹窗');
        // const panoId = 4433
        // await page.goto(`${host}/index.php/member/putout/index/pano_id/${panoId}`)
        // // 进入生成弹窗
    
        // // 点击开始生成
        // await sleep();
        // console.log('点击开始生成');
        // await page.click('.blackbutton');
        // const finalResponse = await page.waitForResponse(response => {
        //     if (response.url().includes('/do.php')) {
        //         console.log(response)
        //     }
        //     return response.url().includes('/do.php') && response.status() === 200
        // });
        // console.log('生成结束')
        // // 点击开始生成
    
        // await page.screenshot({ path: 'example.png'});
    
        // await browser.close();
    } catch (err) {
        console.log(err);
    }
})();