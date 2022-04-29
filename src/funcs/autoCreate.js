/**
 * 打开页面自动点击生成
 */
const { sleep } = require('../utils/tools');
const config = require('../config');

async function autoCreate(page, panoId) {
    // 进入生成弹窗
    await sleep();
    console.log('进入生成弹窗');
    await page.goto(`${config.HOST}/index.php/member/putout/index/pano_id/${panoId}`)
    // 进入生成弹窗

    // 点击开始生成
    await sleep();
    console.log('点击开始生成');
    await page.click('.blackbutton');
    // TODO:如果这里失败
    // const msgBoxShow = await page.waitForSelector('.msgbox', {
    //     timeout: 1000
    // });
    // console.log('msgBoxShow', msgBoxShow)
    const finalResponse = await page.waitForResponse(async response => {
        return response.url().includes('/do.php') && response.status() === 200;
    });
    const finalText = await finalResponse.text();
    if (finalText.includes('downzip')) {
        // 成功
    } else {
        // 失败
    }
    console.log('生成结束')
    // 点击开始生成
}

module.exports = autoCreate;