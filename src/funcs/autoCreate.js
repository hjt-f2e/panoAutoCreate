/**
 * 打开页面自动点击生成
 */
const { sleep } = require('../utils/tools');
const config = require('../config');
const panoId = require('./panoId')

async function autoCreate(page, id) {
    // 进入生成弹窗
    await sleep();
    console.log(`-----进入生成弹窗 panoId: ${id}-----`);
    await page.goto(`${config.HOST}/index.php/member/putout/index/pano_id/${id}`)
    // 进入生成弹窗

    // 点击开始生成
    await sleep();
    // 先确定场景数量
    const sceneCount = await page.$eval('table>tbody>tr:nth-of-type(2)>td:nth-of-type(2)', tr => tr.innerText);
    if (sceneCount > 0) {
        console.log(`场景数量: ${sceneCount}，点击开始生成`);
        await page.click('.blackbutton');
        const finalResponse = await page.waitForResponse(async response => {
            return response.url().includes('/do.php') && response.status() === 200;
        });
        const finalText = await finalResponse.text();
        if (finalText.includes('downzip')) {
            // 生成成功
            panoId.setSuccess(id);
        } else {
            // 生成失败
            panoId.setDownzipFailed(id);
        }
    } else {
        // 场景数量为0（无权限）
        console.log('场景数量: 0，无权限');
        panoId.setNoPermission(id);
    }
    console.log('生成结束');
    // 进度通知
}

module.exports = autoCreate;