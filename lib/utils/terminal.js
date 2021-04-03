/**
 * 执行终端相关的代码都放在这里
 */
const {spawn} = require('child_process');
const commandSpawn = (...args) => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn(...args);
        // 将安装依赖的进度展示在当前的进程中
        childProcess.stdout.pipe(process.stdout);
        childProcess.stderr.pipe(process.stderr);
        // 依赖安装完成的回调通知
        childProcess.on('close', () => {
            console.log('依赖安装结束')
            resolve();
        })
    })
    
}
module.exports = {
    commandSpawn
}