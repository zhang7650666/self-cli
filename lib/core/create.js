const program = require('commander');
const {createProjectAction, addComponentAction, addPageAndRouter, addStoreModule} = require('./actions')

const createCommands = () => {
    console.log('函数调用没有')
    const opts = program.opts()
    // program
    //     .command('create <project> [others...]')
    //     .description('从远程仓库克隆一个文件夹到本地')
    //     .action(createProjectAction)
    program
        .command('addCpn <component>')
        .description('创建一个vue组件')
        .action((name) => {
            addComponentAction(name, opts.dest || 'src/components')
        })
    program
        .command('addPage <page>')
        .description('创建一个页面')
        .action((name) => {
            addPageAndRouter(name, opts.dest || 'src/pages')
        })
    program
        .command('addStore <store>')
        .description('创建一个store')
        .action((name) => {
            addStoreModule(name, opts.dest || 'src/store/modules')
        })
}

module.exports = createCommands