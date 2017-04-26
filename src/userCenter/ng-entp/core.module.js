angular
    .module('entp.core', [])

// 企业用户信息获取
require('./core.entp-info.service')
// 企业成员
require('./core.members.service')
// 企业课程
require('./core.entp-courses.service')
require('./core.entp-course.filter')
