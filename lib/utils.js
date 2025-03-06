const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const handlebars = require('handlebars');
const chalk = require('chalk');

/**
 * 读取模板目录中的所有文件
 * @param {string} templateDir - 模板目录路径
 * @returns {Promise<Array>} - 模板文件列表
 */
async function readTemplateFiles(templateDir) {
  return new Promise((resolve, reject) => {
    glob('**/*', {
      cwd: templateDir,
      dot: true,
      nodir: true
    }, (err, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });
}

/**
 * 渲染模板文件到目标目录
 * @param {Array} files - 模板文件列表
 * @param {string} targetDir - 目标目录
 * @param {object} data - 模板数据
 */
async function renderTemplate(files, targetDir, data) {
  const templateDir = path.resolve(__dirname, '../templates/vue-rspack/template');
  
  for (const file of files) {
    const sourcePath = path.join(templateDir, file);
    const content = await fs.readFile(sourcePath, 'utf-8');
    
    // 判断是否需要模板处理
    const isTemplate = file.endsWith('.hbs') || 
                       file.endsWith('package.json') || 
                       file.endsWith('.js') ||
                       file.endsWith('.vue') ||
                       file.endsWith('.md');
    
    // 目标文件路径 (去掉 .hbs 扩展名)
    const targetPath = path.join(targetDir, file.replace(/\.hbs$/, ''));
    
    // 确保目标目录存在
    await fs.ensureDir(path.dirname(targetPath));
    
    if (isTemplate) {
      try {
        // 编译模板
        const template = handlebars.compile(content);
        const result = template(data);
        await fs.writeFile(targetPath, result);
        console.log(`${chalk.green('✓')} 创建文件: ${file.replace(/\.hbs$/, '')}`);
      } catch (err) {
        console.error(`${chalk.red('✗')} 渲染模板失败: ${file}`, err);
        throw err;
      }
    } else {
      // 直接复制非模板文件
      await fs.copyFile(sourcePath, targetPath);
      console.log(`${chalk.green('✓')} 复制文件: ${file}`);
    }
  }
  
  // 可能需要根据用户选择的特性添加或删除特定文件
  await processProjectFeatures(targetDir, data);
}

/**
 * 根据用户选择的特性处理项目文件
 * @param {string} targetDir - 目标目录
 * @param {object} data - 用户选择的特性
 */
async function processProjectFeatures(targetDir, data) {
  // TypeScript 支持
  if (data.features.includes('typescript')) {
    // 可以在这里添加额外的 TypeScript 配置或文件
    console.log(`${chalk.blue('ℹ')} 配置 TypeScript 支持...`);
    // 例如，创建或修改 tsconfig.json
  }
  
  // Vue Router
  if (data.features.includes('router')) {
    console.log(`${chalk.blue('ℹ')} 配置 Vue Router...`);
    // 添加 router 相关文件或配置
  }
  
  // Vuex
  if (data.features.includes('vuex')) {
    console.log(`${chalk.blue('ℹ')} 配置 Vuex...`);
    // 添加 vuex 相关文件或配置
  }
  
  // CSS 预处理器
  if (data.cssPreProcessor) {
    console.log(`${chalk.blue('ℹ')} 配置 ${data.cssPreProcessor} 预处理器...`);
    // 根据选择的预处理器更新相关依赖和配置
  }
}

module.exports = {
  readTemplateFiles,
  renderTemplate
};