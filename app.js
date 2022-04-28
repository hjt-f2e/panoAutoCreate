const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://pano-manager.huanjutang.com');

    // 输入账号密码
    // await page.waitFo;
    await page.type('input#userid', 'luoyi');
    await page.type('input[type=password]', 'luo12345');
    await page.click('input[type=submit]');
    // const response = await page.waitForNavigation({ waitUntil: 'networkidle2' });
    // 输入账号密码

    await page.screenshot({ path: 'example.png'});

    await browser.close();
})();