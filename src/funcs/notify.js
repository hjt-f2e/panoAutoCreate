
const axios = require('axios');
const ddApi = 'https://oapi.dingtalk.com/robot/send?access_token=a2119e7a6dc937311811736a1001631551ca8c310c958967b081d43b220f6055';

const panoId = require('./panoId');
const fs = require('fs');
const path = require('path');

// 钉钉通知
function reportToDD(str) {
    axios.post(ddApi, {
        msgtype: 'markdown',
        markdown: {
            title: `pano自动生成`,
            text: str,
        },
    })
}

// 生成通用头
function createSumerise() {
    let str = ''
    str += `- 总共：${panoId.getAllIds().length} \n`
    str += `- 成功：${panoId.getSuccess().length} \n`
    str += `- 生成失败：${panoId.getDownzipFailed().length} \n`
    str += `- 无权限：${panoId.getNoPermission().length} \n`
    return str;
}

// 保存日志记录
function handlePrintLog() {
    const all = panoId.getAllIds();
    const success = panoId.getSuccess();
    const failed = panoId.getDownzipFailed();
    const noPermission = panoId.getNoPermission();

    fs.writeFileSync(path.join(__dirname, `../logs/${new Date().getTime()}.json`), JSON.stringify({
        all,
        success,
        failed,
        noPermission
    }, '', 4));
}

const notify = {
    finish() {
        let str = ''
        str += `## 任务已全部结束 \n`
        str += `${createSumerise()}`

        reportToDD(str)
        handlePrintLog()
    },
    error(err) {
        console.log(err)
        let str = ''
        str += `## 任务出错 \n`
        str += `${createSumerise()}`
        str += `--- \n`
        str += `错误信息：${err} \n`

        reportToDD(str)
        handlePrintLog()
    }
}

module.exports = notify;
