const program = require('commander');

const helpOptions = () => {
    // 增加配置项
    program.option('-w --why', '这里可以添加选项的配置信息');
    program.option('-d --dest <dest>', 'ps: -d /src/components');

    // 增加选项
    // program.on('--help', function() {
    //     console.log('其他配置项')
    // })
}

module.exports = helpOptions;