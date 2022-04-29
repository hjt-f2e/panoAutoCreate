/**
 * 使用账号密码登录
 */
const { sleep } = require('../utils/tools');
const fs = require('fs');
const path = require('path');

let pwdFile = {};
try {
    const pwdFileStr = fs.readFileSync(path.join(__dirname, '../pwd/user.json'), 'utf-8');
    pwdFile = JSON.parse(pwdFileStr);
} catch (err) {
    throw new Error('密码文件读取错误，请查看README文件');
}

async function handleLogin(page) {
    if (pwdFile && pwdFile.username && pwdFile.password) {
        console.log('正在输入账号密码');
        await page.type('input#userid', pwdFile.username);
        await page.type('input[type=password]', pwdFile.password);
        await sleep();
        console.log('正在登陆');
        const [_, waitInfo] = await Promise.all([
            // 点击提交
            page.click('.box input[type="submit"]'),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ]);
        if (waitInfo._url.includes('/member/login')) {
            // 账号密码错误
            throw new Error('账号密码错误');
        }
        console.log('登录成功');
    } else {
        throw new Error('密码文件读取错误')
    }
}

module.exports = handleLogin;