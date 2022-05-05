const config = {
    // pano后台主域名
    HOST: 'https://pano-manager.huanjutang.com',
    // 远端获取pano id地址，如不填写，将默认从本地读取 src/localIDs.json
    remotePanoIdUrl: '',
    // 钉钉机器人webhook地址
    ddApi: 'https://oapi.dingtalk.com/robot/send?access_token=a2119e7a6dc937311811736a1001631551ca8c310c958967b081d43b220f6055',
}

module.exports = config;