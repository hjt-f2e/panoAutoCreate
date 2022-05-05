/**
 * pano_id管理
 */
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 所有ID
let allIds = [];
// 成功的ID
const successIds = [];
// 生成失败的ID
const downzipFailedIds = [];
// 没有权限的ID
const noPermissionIds = [];

const panoId = {
    // 获取panoId
    getRemoteIds: async function(url = '') {
        try {
            // 远程请求或读取本地数据
            if (url.includes('http')) {
                // 远端
                const res = await axios.get(url);
                allIds = res.data;
            } else {
                // 本地
                const idsStr = fs.readFileSync(path.join(__dirname, '../localIDs.json'), 'utf-8');
                allIds = JSON.parse(idsStr);
            }
            return allIds;
        } catch(err) {
            throw new Error('获取panoId失败');
        }
    },
    getAllIds() {
        return allIds;
    },
    getSuccess() {
        return successIds;
    },
    setSuccess(id) {
        successIds.push(id);
    },
    getDownzipFailed() {
        return downzipFailedIds;
    },
    setDownzipFailed(id) {
        downzipFailedIds.push(id);
    },
    getNoPermission() {
        return noPermissionIds;
    },
    setNoPermission(id) {
        noPermissionIds.push(id);
    }
}

module.exports = panoId;