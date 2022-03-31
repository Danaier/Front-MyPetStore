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

var config = {
  entry: {
    'common': ['./src/page/common/index.js'],
    'index' : ['./src/page/index/index.js'],
    'login' : ['./src/page/login/index.js']
  },
  output: {
    filename    : 'js/[name].js',
    path        : path.resolve(__dirname, 'dist'),
    publicPath  : '../dist'
  },

  devServer:{
    port   : 8888,
    static : { // static: ['assets']
      directory : path.join(__dirname,'dist')
    },
  },
  
  plugins: [

    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename : 'css/[name].css'
    }),
    //html文件打包
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login')),
    
    //热部署
    new webpack.HotModuleReplacementPlugin(),
  ],

  optimization: {
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

  module: {
         rules: [

          //针对CSS
           {
             //加载css
             test   : /\.css$/,
             use    : [
               //'style-loader',
               {
                 loader : MiniCssExtractPlugin.loader,
                 options : {
                   publicPath : '../'
                 }
               }
               ,
               'css-loader'
             ]
           },

           //针对images
           //启用webpack5新的资源引用方法asset
           {
              test       : /\.(png|jpg|gif|svg)$/,
              type       : 'asset/resource',
              generator  : {
                filename: 'images/[name].[ext]'
              }
            },

            


         ]
       }


};



module.exports = config;
