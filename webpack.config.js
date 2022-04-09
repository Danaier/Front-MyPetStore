const path = require('path');


//清理dist文件夹
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

//Webpack5打包-禁止生成LICENSE文件
const TerserPlugin = require("terser-webpack-plugin");

//css打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//html文件打包
const HtmlWebpackPlugin = require('html-webpack-plugin');

//
const webpack = require('webpack');


var getHtmlConfig = function(name){
    return  {

      template  : './src/view/'+name+'.html',
      filename  : 'view/'+name+'.html',
      inject    : true,
      hash      : true,
      chunks    : ['common',name],
      minify    : {
        collapseWhitespace :false,
      }
      
    }
}

//view/catalog下的html请用这个打包
var getCatalogHtmlConfig = function(name){
  return  {

    template  : './src/view/catalog/'+name+'.html',
    filename  : 'view/catalog/'+name+'.html',
    inject    : true,
    hash      : true,
    chunks    : ['common',name],
    minify    : {
      collapseWhitespace :false,
    }
    
  }
}

//view/account下的html请用这个打包
var getAccountHtmlConfig = function(name){
  return  {

    template  : './src/view/account/'+name+'.html',
    filename  : 'view/account/'+name+'.html',
    inject    : true,
    hash      : true,
    chunks    : ['common',name],
    minify    : {
      collapseWhitespace :false,
    }
    
  }
}

var config = {
  //入口
  entry: {
    'common'        : ['./src/page/common/index.js'],
    'index'         : ['./src/page/index/index.js'],
    'catalog-main'  : ['./src/page/catalog/catalog-main/index.js'],
    'signin'        : ['./src/page/account/signin/index.js']
  },
  //出口
  // output: {
  //   filename    : 'js/[name].js',
  //   path        : path.resolve(__dirname, 'dist'),
  //   publicPath  : '../dist'
  // },
  output: {
    filename    : 'js/[name].js',
    path        : path.resolve(__dirname, 'dist'),//打包后存放的地址
    // publicPath  : '..',
    publicPath  :'/dist', //访问文件时用的地址:此属性配置与热部署最终编译后访问有关系
  },
  
  mode: 'development',// 设置mode
  devServer:{
    port    : 8888,
    static  : { // static: ['assets']
      directory : path.join(__dirname,'dist')
    },
    hot     : true,
  },

  stats: {
    // 添加 children 信息
    children      : true,
     // 添加错误信息
    errorDetails  : true,
    // 显示警告/错误的依赖和来源（从 webpack 2.5.0 开始）
    moduleTrace   : true,
    // 添加警告
    warnings      : true,
  },
  
  //插件
  plugins: [

    //new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename : 'css/[name].css'
    }),



    //html文件打包
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    //view/catalog下的html请用这个打包
    new HtmlWebpackPlugin(getCatalogHtmlConfig('catalog-main')),
    //view/account下的html请用这个打包
    new HtmlWebpackPlugin(getAccountHtmlConfig('signin')),

    
    //热部署
    new webpack.HotModuleReplacementPlugin()
  ],

  //优化
  optimization: {
    // runtimeChunk: 'single',
    minimize  : false,
    minimizer : [
        new TerserPlugin({
            extractComments: false,//不将注释提取到单独的文件中
        }),
    ],
    //公共模块提取成独立模块
    splitChunks  : {
      cacheGroups : {
        commons : {
          name        : 'util',
          chunks      : 'all',
          minChunks   : 2,
          minSize     : 0
        }
      }
    } 
  },

  externals:{
    'jquery':'window.jQuery'  //如果在网页里面引用了，webpack把他作为外部变量引入
  },

  //Web部分
  module: {
         rules: [

          //针对CSS
           {
             //加载css
             test   : /\.css$/,
             use    : [
               //'style-loader',
               {
                    loader      : MiniCssExtractPlugin.loader,
                    options     : {
                        publicPath  : '../'
                          }
               },
               'css-loader'
             ]
           },

           //针对images
           //启用webpack5新的资源引用方法asset
           {
              test       : /\.(png|jpg|gif|svg)$/,
              type       : 'asset/resource',
              generator  : {
                  filename  : 'images/[name].[ext]'
              }
            },

             //针对公共htm
           {
            test    : /\.htm$/,
            use     : {
                loader  :'html-loader',
                options :{
                    esModule  :false,
                    minimize   :false
                }
            }
          },
         ]
       },

  //别名
  resolve : {
      alias : {
          util          : __dirname + '/src/util',
          page          : __dirname + '/src/page',
          image         : __dirname + '/src/image',
          service       : __dirname + '/src/service',
          node_modules  : __dirname + '/node_modules'
      }
  }

};



module.exports = config;
