module.exports = [
  {
    files: ['src/**/*.{js,jsx,ts,tsx,vue}'],
    rules: {
      'vue/multi-word-component-names': 'off', // 关闭组件名必须多单词的规则
      'no-console': 'warn', // 在开发中警告使用 console
      'prefer-const': 'error', // 要求使用 const 声明不变的变量
      'eqeqeq': 'error', // 要求使用 === 和 !==
      'curly': 'error' // 要求所有语句使用 { } 包围
    }
  }
];