angular
  .module('personal.core')
  .filter('payStatusFilter', function () {
    return function (payed) {
      return payed ? '已付款' : '未付款'
    }
  })
  .filter('commentStatusFilter', function () {
    return function (payed) {
      return payed ? '已评论' : '未评论'
    }
  })
  .filter('actionTextFilter', function () {
    return function (payed) {
      return payed ? '学习课程' : '立即购买'
    }
  })
