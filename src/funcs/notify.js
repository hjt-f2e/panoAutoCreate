
const axios = require('axios');
const config = require('../config');
const ddApi = config.ddApi;

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

// 计算时间差
function timeDiff(start) {
    const end = new Date();
    const diff = end - start;
    if (diff > 0) {
        // 格式化
        // 小时
        const h = Math.floor(diff / ( 3600 * 1000 ));
        // 分
        const residue2 = diff % (3600 * 1000);
        const m = Math.floor(residue2 / (60 * 1000));
        // 秒
        const residue3 = residue2 % (60 * 1000);
        const s = Math.floor(residue3 / 1000);

        return `${h}小时${m}分${s}秒`;
    } else {
        return '0';
    }
}

const notify = {
    finish(startTime) {
        let str = ''
        str += `## 任务已全部结束 \n`
        str += `${createSumerise()}`
        str += `--- \n`
        str += `> 用时：${timeDiff(startTime)} \n`

        reportToDD(str)
        handlePrintLog()
    },
    error(err, startTime) {
        console.log(err)
        let str = ''
        str += `## 任务出错 \n`
        str += `${createSumerise()}`
        str += `--- \n`
        str += `错误信息：${err} \n`
        str += `> 用时：${timeDiff(startTime)} \n`

        reportToDD(str)
        handlePrintLog()
    },
    progress(cur, total) {
        const step = 4
        if (total >= 4) {
            let str = '';
            str += ` ## 任务进行中... \n`
            const len = Math.ceil(total / step);
            if (cur === len * 1) {
                str += `- 完成进度：${(cur/total * 100).toFixed(2)}%(${cur}/${total})`
                reportToDD(str);
            } else if (cur === len * 2) {
                str += `- 完成进度：${(cur/total * 100).toFixed(2)}%(${cur}/${total})`
                reportToDD(str);
            } else if (cur === len * 3) {
                str += `- 完成进度：${(cur/total * 100).toFixed(2)}%(${cur}/${total})`
                reportToDD(str);
            }
        }
    },
    start() {
        let str = '## 任务开始 \n'
        str += `- 总共：${panoId.getAllIds().length} \n`
        reportToDD(str);
    }
}

module.exports = notify;
