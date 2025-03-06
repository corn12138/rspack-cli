#!/usr/bin/env node
const {program} = require('commander');
const chalk = require('chalk');
const {create} = require('../lib/create');
const packageInfo = require('../package.json');
program
  .version(packageInfo.version);

// 创建项目
program
 .command('create <app-name>')
 .description('create a new project')
 .option('-f, --force', 'overwrite target directory if it exists')
 .action((appName, options) => {
    console.log(chalk.blue(`Vue Rspack CLI v${packageInfo.version}`));
    console.log(chalk.blue('✨ 正在创建项目...'));
    create(appName, options);
 });

 //添加帮助信息
 program.on('--help', () => {
    console.log();
    console.log(`  运行 ${chalk.cyan('vue-rspack <command> --help')} 获取特定命令的详细用法`);
    console.log();
    console.log(`  示例:`);
    console.log(`    ${chalk.gray('# 创建一个新项目')}`)
    console.log(`    $ ${chalk.cyan('vue-rspack create my-project')}`);
    console.log();
 });

 // 解析命令行参数
 program.parse(process.argv);

 // 如果没有输入命令，则显示帮助信息
 if (!process.argv.slice(2).length) {
    program.outputHelp();
 } else {
    console.log(chalk.green('命令已成功解析'));
 }