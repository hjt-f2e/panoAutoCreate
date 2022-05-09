const config = {
    // pano后台主域名
    HOST: 'https://pano-manager.huanjutang.com',
    // 远端获取pano id地址，如不填写，将默认从本地读取 src/localIDs.json
    remotePanoIdUrl: '',
    // 钉钉机器人webhook地址
    ddApi: 'https://oapi.dingtalk.com/robot/send?access_token=f067e1707d42d2bea89a1febda9bd1cf9faf984d046cc69b2f68b768f827dc08',
}

module.exports = config;