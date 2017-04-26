// some odd and ends, like error displays.
// 零散组件
angular.module('userCenter.misc', [])

// 星级评价
require('./misc.star-rating.component')

// ajax错误
require('./misc.error-display.component')

// 无数据
require('./misc.no-data.component')

// 无课程数据
require('./misc.no-data-course.component')

// 通用分页
require('./misc.pagerService.service')
require('./misc.pagination.component')

// 推荐内容
require('./misc.recommanded.component')
require('./misc.recommanded.service')
