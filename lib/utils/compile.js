const fs = require('fs')
const path = require('path');
const ejs = require('ejs');
const { rejects } = require('assert');

const compile = (template, data) => {
    const tempPos = `../templates/${template}`
    const tempPath = path.resolve(__dirname, tempPos);
    return new Promise((resolve, reject) => {
        ejs.renderFile(tempPath, {data}, {}, (err, result) => {
            if(err) {
                rejects(err);
                return;
            };
            resolve(result)
        })
    })
}
// 递归创建文件夹
const createMkDirSync = (pathname) => {
    if(fs.existsSync(pathname)){
        return true;
    } else {
        if(createMkDirSync(path.dirname(pathname))){
            fs.mkdirSync(pathname)
            return true;
        }
    }
}
const createToFile = (path, content) => {
    return fs.promises.writeFile(path, content)
}
module.exports = {
    compile,
    createToFile,
    createMkDirSync
}