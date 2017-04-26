angular
  .module('personal.core')
  .filter('subStatusTextFilter', function () {
    return function (param) {
      return param ? '已开通' : '服务未开通'
    }
  })
  .filter('subStatusActionFilter', function () {
    return function (param) {
      return param ? '续费' : '购买'
    }
  })
