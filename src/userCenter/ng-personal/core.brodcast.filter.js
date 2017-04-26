angular
  .module('personal.core')
  .filter('broadcastStatusFilter', function () {
    return function (status) {
      var textStatus = ''

      if (status === 1 || status === '1') {
        textStatus = '未开始'
      }

      if (status === 2 || status === '2') {
        textStatus = '正在直播'
      }

      if (status === 3 || status === '3') {
        textStatus = '已经结束'
      }

      return textStatus
    }
  })
