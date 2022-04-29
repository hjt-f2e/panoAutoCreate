const sleep = (timer = 500) => new Promise(resolve => {
    setTimeout(() => {
        resolve();
    }, timer)
});

module.exports = {
    sleep
}