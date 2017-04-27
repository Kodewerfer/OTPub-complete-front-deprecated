// the webpack here is just for loading js files.
var path = require('path')
var webpack = require('webpack')
module.exports = {
  watch: true,
  target: 'web',
  stats: {
    colors: true,
    assets: false,
    errors: true
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }
      ]
    }, {
      test: /\.scss$/,
      use: [{
          loader: 'style-loader'
        },
        {
          loader: 'sass-loader',
          options: {
            importLoaders: 1
          }
        }
      ]
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: [{
        loader: 'url-loader'
      }]
    }]
  },
  // module: {
  //   loaders: [
  //     // css loader
  //     {
  //       test: /\.css$/,
  //       loader: 'style!css'
  //     },
  //     // HTML loader mainly for angular templates.
  //     {
  //       test: /\.html$/,
  //       loader: 'html'
  //     },
  //     // load font and images files
  //     {
  //       test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
  //       loader: 'url-loader?&name=[name]-[hash].[ext]'
  //     }

  //   ]
  // },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  resolve: {
    modules: [
      'node_modules',
      path.resolve('./bower_components')
    ],
    alias: {
      jquery: 'jquery/src/jquery',
      sticky: 'sticky-kit/jquery.sticky-kit.min.js',
      slick: 'slick-carousel/slick/',
      videojs: 'video.js/dist',
      pefectScroll: 'perfect-scrollbar/min',
      ng1: 'angular/angular.min.js',
      ngPostFix: 'angular-post-fix/postfix',
      ngScroll: 'angular-perfect-scrollbar/src/angular-perfect-scrollbar', //angular pefect scroll.
      ngFile: 'ng-file-upload/ng-file-upload.min.js',
      ngAnimate: 'angular-animate/angular-animate.min.js',
      uiRouter: 'angular-ui-router/release/angular-ui-router.min.js',
      ngResource: 'angular-resource/angular-resource.min.js',
      ngMock: 'angular-mocks/angular-mocks.js' // for unit testing.
    }
  }

}