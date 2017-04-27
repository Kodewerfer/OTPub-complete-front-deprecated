// import angular
require('ng1')
// HTTP POST FIX
require('ngPostFix')
// angular ui-router
require('uiRouter')
// ngResource
require('ngResource')
// ng animations
require('ngAnimate')
// ng file upload
require('ngFile')

// 用户中心 核心服务
require('./core.module')
// 用户中心 总模组定义
require('./user-center.module')
// 用户中心 路由设置 （ui-router）
require('./user-center.config')


/**
 * 用户中心 - 零散组件
 */
// 零散组件模组
require('./ng-misc/misc.module')

var importAll = function (r) {
  var keys = r.keys()
  // r.keys().forEach(key => cache[key] = r(key));
  for (var i = 0; i < keys.length; i++) {
    r(keys[i])
  }
}
/**
 * 个人中心组件
 */
// // 个人中心 核心服务
require('./ng-personal/core.module')

// // 用户中心 - 个人中心模组
require('./ng-personal/personal.module')

var personalCenter = require.context('./ng-personal/', false, /\.component.js$|\.service.js$|.filter.js$/)
importAll(personalCenter)

/**
 * 企业中心组件
 */

// 企业中心 核心模组
require('./ng-entp/core.module')
// 企业中心模组定义
require('./ng-entp/entp.module')

var personalCenter = require.context('./ng-entp/', false, /\.component.js$|\.service.js$|.filter.js$/)
importAll(personalCenter)

// TODO

/**
 * 厂商中心组件
 */
// TODO
// 厂商中心 - 核心
require('./ng-provider/core.module')
// 厂商中心 - 模组定义
require('./ng-provider/provider.module')

var personalCenter = require.context('./ng-provider/', false, /\.component.js$|\.service.js$|.filter.js$/)
importAll(personalCenter)