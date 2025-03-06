const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { readTemplateFiles, renderTemplate } = require('./utils');

/**
 * 创建项目
 * @param {string} projectName - 项目名称
 * @param {object} options - 选项
 */
async function create(projectName, options) {
  // 目标目录
  const cwd = process.cwd();
  const targetDir = path.join(cwd, projectName);
  
  // 检查目标目录是否存在
  if (fs.existsSync(targetDir)) {
    if (options.force) {
      await fs.remove(targetDir);
    } else {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: `目标目录 ${chalk.cyan(targetDir)} 已存在。请选择操作:`,
          choices: [
            { name: '覆盖', value: 'overwrite' },
            { name: '取消', value: 'cancel' }
          ]
        }
      ]);
      
      if (action === 'cancel') {
        console.log(chalk.red('✘ 操作取消'));
        return;
      }
      
      if (action === 'overwrite') {
        console.log(`\n${chalk.yellow(`正在删除 ${targetDir}...`)}`);
        await fs.remove(targetDir);
      }
    }
  }
  
  // 收集项目信息
  const answers = await inquirer.prompt([
    {
      name: 'projectName',
      type: 'input',
      message: '项目名称:',
      default: projectName
    },
    {
      name: 'projectDescription',
      type: 'input',
      message: '项目描述:',
      default: `A Vue.js project with Rspack`
    },
    {
      name: 'author',
      type: 'input',
      message: '作者:',
      default: ''
    },
    {
      name: 'features',
      type: 'checkbox',
      message: '选择需要的功能:',
      choices: [
        { name: 'Babel', value: 'babel', checked: true },
        { name: 'TypeScript', value: 'typescript' },
        { name: 'Router', value: 'router' },
        { name: 'Vuex', value: 'vuex' },
        { name: 'CSS Pre-processors', value: 'css-pre-processors' },
        { name: 'Linter / Formatter', value: 'linter' },
        { name: 'Unit Testing', value: 'unit-testing' },
        { name: 'E2E Testing', value: 'e2e-testing' }
      ]
    }
  ]);
  
  // 根据选择的功能进行额外配置
  if (answers.features.includes('css-pre-processors')) {
    const { cssPreProcessor } = await inquirer.prompt([
      {
        name: 'cssPreProcessor',
        type: 'list',
        message: '选择 CSS 预处理器:',
        choices: [
          { name: 'Sass/SCSS', value: 'sass' },
          { name: 'Less', value: 'less' },
          { name: 'Stylus', value: 'stylus' }
        ]
      }
    ]);
    answers.cssPreProcessor = cssPreProcessor;
  }
  
  console.log(chalk.blue('\n✨ 正在生成项目文件...'));
  
  // 创建目标目录
  fs.ensureDirSync(targetDir);
  
  // 获取模板目录
  const templateDir = path.resolve(__dirname, '../templates/vue-rspack/template');
  
  try {
    // 读取并渲染模板文件
    const templateFiles = await readTemplateFiles(templateDir);
    await renderTemplate(templateFiles, targetDir, answers);
    
    console.log(chalk.green('\n✅ 项目创建成功!'));
    console.log('\n要开始使用:');
    console.log(`  ${chalk.cyan('cd')} ${projectName}`);
    console.log(`  ${chalk.cyan('npm install')}`);
    console.log(`  ${chalk.cyan('npm run dev')}`);
    console.log('\n祝您开发愉快! 🎉\n');
  } catch (err) {
    console.error(chalk.red('创建项目时出错:'), err);
    // 清理已创建的目录
    fs.removeSync(targetDir);
  }
}

module.exports = {
  create
};