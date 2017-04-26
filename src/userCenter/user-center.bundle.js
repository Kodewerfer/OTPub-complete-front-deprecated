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

/**
 * 个人中心组件
 */
// 个人中心 核心服务
require('./ng-personal/core.module')

// 用户中心 - 个人中心模组
require('./ng-personal/personal.module')

// - 主框架
require('./ng-personal/personal.page-frame.component')

// -- 欢迎页面
require('./ng-personal/personal.welcome.component')

// -- 顶部显示
require('./ng-personal/personal.top-bar.component')

// -- 站内信
require('./ng-personal/personal.messages.component')

// -- 站内信 - 阅读
require('./ng-personal/personal.read-message.component')

// -- 修改资料
require('./ng-personal/personal.edit-info.component')

// -- 技术课程
require('./ng-personal/personal.courses.component')

// -- 收藏课程
require('./ng-personal/personal.favourited.component')

// -- 直播预约
require('./ng-personal/personal.broadcast.component')

// -- 预览课程
require('./ng-personal/personal.browsed.component')

// -- 卡包管理
require('./ng-personal/personal.subscription.component')

// -- 我的问答
require('./ng-personal/personal.qna.component')

// -- 我的简历
require('./ng-personal/personal.resume.component')

// -- 我的笔记
require('./ng-personal/personal.notes.component')

// -- 我的发票
require('./ng-personal/personal.receipt.component')

// -- 我的订单
require('./ng-personal/personal.orders.component')

/**
 * 企业中心组件
 */

// 企业中心 核心模组
require('./ng-entp/core.module')
// 企业中心模组定义
require('./ng-entp/entp.module')

// -- 企业中心 主框架
require('./ng-entp/entp.page-frame.component')

// -- 企业中心 顶部显示
require('./ng-entp/entp.top-bar.component')

// -- 企业中心 欢迎页面
require('./ng-entp/entp.welcome.component')

// -- 企业中心 修改资料
require('./ng-entp/entp.edit-info.component')

// -- 企业中心 我的成员
require('./ng-entp/entp.members.component')

// -- 企业中心 我的课程
require('./ng-entp/entp.courses.component')

// -- 企业中心 我的课程 - 查看详情
require('./ng-entp/entp.courses.details.component')

// TODO

/**
 * 厂商中心组件
 */
// TODO
// 厂商中心 - 核心
require('./ng-provider/core.module')
// 厂商中心 - 模组定义
require('./ng-provider/provider.module')

// -- 主框架
require('./ng-provider/provider.page-frame.component')

// -- 顶部显示
require('./ng-provider/provider.top-bar.component')

// -- 欢迎页面
require('./ng-provider/provider.welcome.component')

// -- 修改信息
require('./ng-provider/provider.edit-info.component')

// -- 我的课程
require('./ng-provider/provider.courses.component')

// -- 我的课程 - 成员
require('./ng-provider/provider.courses.details.component')
