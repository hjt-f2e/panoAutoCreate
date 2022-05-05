# vr720后台自动生成脚本

## 填入账号密码

创建文件 `/pwd/user.json`

```json
{
    "username": "",
    "password": ""
}
```

## 配置文件

`src/config.js` 中配置`pano后台主域名`、`数据地址`、`钉钉机器人webhook`

```js
const config = {
    // pano后台主域名
    HOST: 'https://pano-manager.huanjutang.com',
    // 远端获取pano id地址，如不填写，将默认从本地读取 src/localIDs.json
    remotePanoIdUrl: '',
    // 钉钉机器人webhook地址
    ddApi: 'https://oapi.dingtalk.com/robot/send?access_token=a2119e7a6dc937311811736a1001631551ca8c310c958967b081d43b220f6055',
}
```

- 本地ID

本地id在下面的路径中获取，没有请自行创建

src/localIDs.json

```json
[
    3720,
    3718,
    3719
]
```

- 远端ID

直接填写remotePanoIdUrl，直接返回数组数据即可

```json
[
    3720,
    3718,
    3719
]
```
