const puppeteer = require('puppeteer');
const { sleep } = require('./utils/tools');


(async () => {

    const browser = await puppeteer.launch({
        headless: false, // 是否显示浏览器
        defaultViewport: {
            width: 800,
            height: 600
        }
    });

    const page = await browser.newPage();
    await page.goto('https://pano-manager.huanjutang.com');

    // 输入账号密码
    console.log('正在输入账号密码');
    await page.type('input#userid', 'luoyi');
    await page.type('input[type=password]', 'luo12345');
    await sleep();
    console.log('正在登陆');
    Promise.all([
        page.click('.box input[type="submit"]'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);
    console.log('登录成功');
    // 输入账号密码

    // 进入生成弹窗
    await sleep();
    console.log('进入生成弹窗');
    const panoId = 4433
    await page.goto(`https://pano-manager.huanjutang.com/index.php/member/putout/index/pano_id/${panoId}`)
    // 进入生成弹窗

    // 点击开始生成
    await sleep();
    console.log('点击开始生成');
    await page.click('.blackbutton');
    const finalResponse = await page.waitForResponse(response => {
        if (response.url().includes('/do.php')) {
            console.log(response)
        }
        return response.url().includes('/do.php') && response.status() === 200
    });
    console.log('生成结束')
    // 点击开始生成

    // await page.screenshot({ path: 'example.png'});

    await browser.close();
})();