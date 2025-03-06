import { defineConfig, loadEnv, rspack } from '@rsbuild/core';
import { pluginVue2 } from '@rsbuild/plugin-vue2';
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginLess } from "@rsbuild/plugin-less";
import { pluginSass } from "@rsbuild/plugin-sass";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill"
const { publicVars } = loadEnv({
  prefixes: ['VUE_APP_', "BASE_URL", "NODE_ENV"]
});

import path from 'path';
const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';
export default defineConfig({
  mode: isProduction ? 'production' : 'development',
  plugins: [pluginVue2(), pluginBabel(), pluginLess(), pluginSass(), pluginNodePolyfill()],
  source: {
    // 指定入口文件
    entry: {
      index: './src/main.js',
    },
    define: publicVars,
    include: ['src'],
    exclude: ['node_modules']
  },
  output: {
    path: 'dist',
    filename: 'static/js/[name].[contenthash:8].js',
    distPath: {
      root: 'dist' //dist目录
    },
    clean: true, //清理dist目录
    publicPath: '/',
    polyfill: "usage" // 浏览器兼容性

  },
  resolve: {
    extensions: ['.js', '.vue', '.ts', '.tsx', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  modules: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader', 'postcss-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              config: true // 使用postcss.config.mjs
            }
          }
        }]
      },
      {
        test: /\.(css|less|sass|scss)$/,
        use: ['style-loader', 'css-loader', 'less-loader', 'sass-loader', {
          loader: 'postcss-loader', options: {
            postcssOptions: {
              config: true // 使用postcss.config.mjs
            }
          }
        }],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
        type: 'asset',
        generator: {
          filename: 'static/img/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/font/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules[\\/]core-js/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              target: 'es2020',
            },
            env: {
              mode: 'usage',
              coreJs: '3.26.1',
              targets: [
                'chrome >= 87',
                'edge >= 88',
                'firefox >= 75',
                'safari >= 14',
              ],
            },
            isModule: 'unknown',
            // ...other options
          },
        },
      },
    ]
  },
  html: {
    template: './public/index.html',
  },
  server: {
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000',
        changeOrigin: true,
        // pathRewrite:{
        //   '^/api':''
        // }
        secure: false,
        ws: false,
        logLevel: 'debug',
      }
    ],
    open: true,
    hot: true,
    port: 8080,
  },
  optimization: {
    moduleIds: isProduction ? 'deterministic' : 'named',
    chunkIds: isProduction ? 'deterministic' : 'named',
    mergeDuplicateChunks: true,
    removeEmptyChunks: true,
    runtimeChunk: 'single',
    realContentHash: isProduction,
    innerGraph: isProduction,
    providedExports: isProduction,
    usedExports: isProduction,
    sideEffects: isProduction,
    concatenateModules: isProduction,
    minimize: true,
    minimizer: [
      // new rspack.SwcJsMinimizerRspackPlugin({
      //   extractComments: false, //移除注释
      //   minimizerOptions: {
      //     test: /\.[cm]?js$/,
      //     format: {
      //       comments: false
      //     },
      //     compress: {
      //       passes: 8
      //     }
      //   }
      // }),
      // new rspack.LightningCssMinimizerRspackPlugin({
      //   minimizerOptions: {
      //     errorRecovery: false, // 错误恢复
      //     nonStandard: true, // 非标准语法
      //   }
      // })

    ],
    splitChunks: {
      chunks: 'async',
      minChunks: 1,
      minSize: 20000,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        }
      }
    }
  },
  tools: {
    rspack: {
      plugins: [
        new rspack.optimize.LimitChunkCountPlugin({
          maxChunks: 5
        }),
        new rspack.SwcJsMinimizerRspackPlugin({
          test: /\.[cm]?js$/,
          extractComments: false, //移除注释
          minimizerOptions: {
            
            format: {
              comments: false  // 移除注释
            },
            compress: {
              passes: 8
            }

          }
        }),
        new rspack.LightningCssMinimizerRspackPlugin({
          minimizerOptions: {
            errorRecovery: false, // 错误恢复
            nonStandard: {
              deepSelectorCombinator:true
            }, // 非标准语法
          }
        })
      ]
    }
  }
});