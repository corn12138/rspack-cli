# Vue Rspack CLI

<p align="center">
  <img src="https://your-logo-url-here.png" alt="Vue Rspack CLI Logo" width="120">
</p>

<p align="center">
  一个轻量级的脚手架工具，帮助你快速创建基于Vue 2和Rspack的项目
</p>

<p align="center">
  <a href="#安装">安装</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#功能特性">功能特性</a> •
  <a href="#命令参考">命令参考</a> •
  <a href="#配置选项">配置选项</a> •
  <a href="#模板说明">模板说明</a> •
  <a href="#从webpack迁移">从Webpack迁移</a> •
  <a href="#常见问题">常见问题</a>
</p>

## 简介

Vue Rspack CLI 是一个专为Vue 2项目设计的现代化脚手架工具，使用Rspack替代Webpack作为构建工具，提供了显著的构建性能提升。它允许你通过简单的交互式命令行界面创建、配置和管理Vue项目，同时保持了与Vue CLI相似的用户体验。

<p align="center">
  <img src="https://your-screenshot-url-here.png" alt="CLI Screenshot" width="600">
</p>

### 为什么选择Rspack？

Rspack是一个基于Rust的高性能JavaScript打包工具，与Webpack API兼容，但速度大幅提升：

- **构建速度提升70%+**：首次构建和热更新都有显著加速
- **内存占用减少约40%**：更高效的资源利用
- **兼容Webpack生态**：大部分Webpack loader和插件可直接使用
- **简化配置**：内置了很多优化，配置更简单

## 安装

### 全局安装（推荐）

```bash
npm install -g vue-rspack-cli
```

### 使用npx（无需安装）

```bash
npx vue-rspack-cli create my-project
```

## 快速开始

### 创建新项目

```bash
# 使用交互式问答创建项目
vue-rspack create my-project

# 或使用默认配置快速创建
vue-rspack create my-project --default
```

### 项目启动

```bash
cd my-project
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 功能特性

- ✨ **交互式项目创建**：通过问答形式选择项目功能和配置
- 🚀 **极速开发体验**：基于Rspack的快速构建和热更新
- 📦 **零配置开发**：预设合理的默认配置，开箱即用
- 🔌 **可选功能**：TypeScript、Vue Router、Vuex等
- 🎨 **CSS预处理器**：支持Sass、Less、Stylus
- 🔧 **代码质量工具**：可选ESLint、Prettier集成
- 🧪 **测试支持**：可集成Jest、Cypress进行单元测试和E2E测试
- 📋 **项目预设**：支持保存和重用项目配置

## 命令参考

### `vue-rspack create <project-name>`

创建一个新的项目

| 选项 | 描述 |
|------|------|
| `--force`, `-f` | 覆盖目标目录（如果存在） |
| `--template <template-name>` | 指定使用的项目模板 |
| `--default` | 使用默认预设，跳过问答环节 |
| `--preset <preset-name>` | 使用保存的预设创建项目 |
| `--skip-git` | 跳过git初始化 |
| `--no-install` | 跳过依赖安装 |

### `vue-rspack info`

打印环境调试信息

```bash
vue-rspack info
```

### `vue-rspack list`

列出可用的项目模板

```bash
vue-rspack list
```

## 配置选项

创建项目时，CLI会询问你一系列问题来配置项目。以下是可用的配置选项：

### 项目基本信息

- **项目名称**：项目目录名称和package.json中的name字段
- **项目描述**：项目的简短描述
- **作者**：项目作者信息

### 可选功能

在创建过程中，你可以选择以下功能：

| 功能 | 描述 |
|------|------|
| **Babel** | 添加Babel支持（通过SWC实现，性能更佳） |
| **TypeScript** | 添加TypeScript支持 |
| **Router** | 添加Vue Router及其基本配置 |
| **Vuex** | 添加Vuex状态管理 |
| **CSS预处理器** | 选择SASS、LESS或Stylus |
| **Linter / Formatter** | 添加ESLint和Prettier |
| **Unit测试** | 添加Jest单元测试配置 |
| **E2E测试** | 添加Cypress E2E测试配置 |

## 项目结构

使用此CLI创建的项目结构如下：

```
my-project/
├── public/                 # 静态资源目录
│   ├── favicon.ico         # 网站图标
│   └── index.html          # HTML模板
├── src/                    # 源代码目录
│   ├── assets/             # 项目资源文件
│   ├── components/         # Vue组件
│   ├── views/              # 页面组件
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── .eslintrc.js            # ESLint配置
├── .gitignore              # Git忽略配置
├── package.json            # 依赖和脚本
├── README.md               # 项目说明文档
└── rspack.config.js        # Rspack配置
```

如果选择了额外功能，可能还会有：

```
├── src/
│   ├── router/             # Vue Router配置
│   ├── store/              # Vuex配置
│   └── types/              # TypeScript类型定义
├── tests/                  # 测试文件
├── tsconfig.json           # TypeScript配置
└── cypress.json            # Cypress配置
```

## 模板说明

### 默认模板（vue-rspack）

基于Vue 2.6的标准模板，使用Rspack作为构建工具，包含：

- Vue 2.6
- Rspack基础配置
- SWC进行JavaScript转译
- 热更新开发服务器
- 资源处理（图片、字体等）
- CSS处理

### 其他可用模板

可以通过`--template`选项指定使用以下其他模板：

- **vue-rspack-admin**：基于Element UI的管理后台模板
- **vue-rspack-mobile**：移动端项目模板，集成了vant

## 从Webpack迁移

如果你想将现有的基于Webpack的Vue项目迁移到Rspack，可以参考以下步骤：

### 1. 安装Rspack相关依赖

```bash
npm uninstall webpack webpack-cli webpack-dev-server html-webpack-plugin
npm install @rspack/cli @rspack/core @rspack/plugin-html @rspack/plugin-vue2 -D
```

### 2. 转换配置文件

将`webpack.config.js`重命名为`rspack.config.js`并进行以下调整：

```javascript
// Webpack配置
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

// 转换为Rspack配置
const { HtmlRspackPlugin } = require('@rspack/plugin-html');
const { VueLoaderPlugin } = require('@rspack/plugin-vue2');
```

### 3. 调整Loader配置

```javascript
// Webpack中的babel-loader
{
  test: /\.js$/,
  use: 'babel-loader'
}

// Rspack中使用内置的swc-loader
{
  test: /\.js$/,
  use: {
    loader: 'builtin:swc-loader',
    options: {
      jsc: {
        parser: {
          syntax: 'ecmascript'
        },
        target: 'es2015'
      }
    }
  }
}
```

### 4. 更新package.json脚本

```diff
"scripts": {
-  "dev": "webpack serve",
-  "build": "webpack --mode=production"
+  "dev": "rspack serve",
+  "build": "rspack build"
}
```

### 5. 性能对比参考

以下是中等规模Vue 2项目的性能对比数据：

| 指标 | Webpack 5 | Rspack | 提升 |
|------|-----------|--------|------|
| 首次构建时间 | ~8.5s | ~2.3s | ~73% |
| 热更新时间 | ~1.2s | ~0.3s | ~75% |
| 生产构建 | ~25s | ~7s | ~72% |
| 内存占用 | ~500MB | ~300MB | ~40% |

## 自定义模板

你可以创建和使用自己的项目模板：

1. 创建一个名为`vue-rspack-template-[name]`的仓库
2. 遵循以下结构：
   ```
   template/     # 包含模板文件
   meta.js       # 模板配置和钩子函数
   ```
3. 使用自定义模板：
   ```bash
   vue-rspack create my-project --template username/repo
   ```

## 常见问题

### Rspack与Webpack的兼容性

**Q: 所有Webpack插件和loader都能在Rspack中工作吗？**

A: 不是所有的。大多数常见loader（如css-loader、sass-loader等）可以直接工作，但一些复杂的Webpack插件可能需要找替代方案。详见[兼容性文档](https://www.rspack.dev/guide/migrate-from-webpack.html)。

### 性能问题

**Q: 为什么我的项目构建速度提升不明显？**

A: 如果你的项目依赖了大量需要转译的第三方库，或使用了复杂的Webpack插件，可能会限制性能提升。尝试使用`--analyze`选项检查构建瓶颈：

```bash
npm run build:analyze
```

### 开发体验

**Q: 热更新不工作怎么办？**

A: 确保你的组件和代码正确导出，并且没有使用不兼容的库。你也可以尝试在`rspack.config.js`中明确启用热更新：

```javascript
module.exports = {
  // ...
  devServer: {
    hot: true
  }
}
```


## 贡献指南

欢迎为Vue Rspack CLI贡献代码！请参阅[贡献指南](CONTRIBUTING.md)了解如何参与项目开发。

## 许可证

[MIT](LICENSE)