/**
 * 打开页面自动点击生成
 */
const { sleep } = require('../utils/tools');
const config = require('../config');
const panoId = require('./panoId');
const notify = require('./notify');

async function autoCreate(page, id, index) {
    // 进入之前判断本地时间，如果是6点以后，就停止了，防止占用服务器资源
    const nowHours = new Date().getHours();
    config.notExecTime
    if (nowHours > config.notExecTime[0] && nowHours < config.notExecTime[1]) {
        // 跳出
        throw new Error(`不在执行的时间范围内，最后终止ID：${id}(未执行)`);
    }
    // 进入生成弹窗
    await sleep();
    console.log(`-----进入生成弹窗 panoId: ${id}-----`);
    try {
        await page.goto(`${config.HOST}/index.php/member/putout/index/pano_id/${id}`)
    } catch (_) {
        // 可能跳转失败了，直接放入生成失败的数组
        panoId.setDownzipFailed(id);
    }
    // 进入生成弹窗

    // 点击开始生成
    await sleep();
    // 先确定场景数量
    const sceneCount = await page.$eval('table>tbody>tr:nth-of-type(2)>td:nth-of-type(2)', tr => tr.innerText);
    if (sceneCount > 0) {
        console.log(`场景数量: ${sceneCount}，点击开始生成`);
        await page.click('.blackbutton');
        try {
            const finalResponse = await page.waitForResponse(async response => {
                return response.url().includes('/do.php') && response.status() === 200;
            }, {
                timeout: 50000 // 超时5分钟
            });

            const finalText = await finalResponse.text();
            if (finalText.includes('downzip')) {
                // 生成成功
                panoId.setSuccess(id);
            } else {
                // 生成失败
                panoId.setDownzipFailed(id);
            }
        } catch (_) {
            // 可能超时了
            // 进行记录
            panoId.setTimeoutIds(id);
        }
    } else {
        // 场景数量为0（无权限）
        console.log('场景数量: 0，无权限');
        panoId.setNoPermission(id);
    }
    console.log(`生成结束：${index + 1}/${panoId.getAllIds().length}`);
    // 进度通知
    notify.progress(index + 1, panoId.getAllIds().length);
}

module.exports = autoCreate;