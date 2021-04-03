
const path = require('path')
const {promisify} = require('util'); // 把下面的代码装成promise的形式,避免回调地狱
// download('flippidippi/download-git-repo-fixture', 'test/tmp', function (err) {
//     console.log(err ? 'Error' : 'Success')
// })

const download = promisify(require('download-git-repo')); // 从git仓库拉去项目
const open = require('open')
const {vueRepo} = require('../config/repo-confog')
const {commandSpawn} = require('../utils/terminal') // 安装依赖
const {compile, createToFile, createMkDirSync} = require('../utils/compile')
const createProjectAction = async (project, others) => {
    // download('direct:https://gitlab.com/flippidippi/download-git-repo-fixture/repository/archive.zip', 'test/tmp', function (err) {
    //     console.log(err ? 'Error' : 'Success')
    // })
    console.log('开始在安装依赖了')
    // 从远程仓库拉去项目模板
    await download(vueRepo, project, {clone: true})
    // 在模板中安装依赖
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    await commandSpawn(command, ['install'], {cwd: `./${project}`});

    // 运行项目
    commandSpawn(command, ['run serve'], {cwd: `./${project}`});

    // 打开浏览器
    open('http://localhost:8080')

}

// 创建组件
const addComponentAction = async (name, dest) => {
    const res = await compile('vue-component.ejs', {name, lowername: name.toLowerCase()});
    // 创建文件
    const filePath = path.resolve(dest, `${name}.vue`)
    createToFile(filePath, res)
}

// 创建页面
const addPageAndRouter = async(name, dest) => {
    const data = {name, lowername: name.toLowerCase()}
    console.log('dest', dest)
    if(createMkDirSync(`${dest}/${name}`)) {
        const pageRes = await compile('vue-component.ejs', data);
        const pagePath = path.resolve(`${dest}/${name}`, `${name}.vue`);
        const routerRes = await compile('vue-router.ejs', data);
        const routerPath = path.resolve(`${dest}/${name}`, 'router.js');
        createToFile(pagePath, pageRes)
        createToFile(routerPath, routerRes)
    }
}
// 创建store模块
const addStoreModule = async(name, dest) => {
    if(createMkDirSync(`${dest}/${name}`)) {
        const storeRes = await compile('vue-store.ejs', {});
        const storePath = path.resolve(`${dest}/${name}`, `${name}.js`);
        const typeRes = await compile('vue-types.ejs', {});
        const typePath = path.resolve(`${dest}/${name}`, 'type.js');
        createToFile(storePath, storeRes)
        createToFile(typePath, typeRes)
    }
}
module.exports = {
    createProjectAction,
    addComponentAction,
    addPageAndRouter,
    addStoreModule
}