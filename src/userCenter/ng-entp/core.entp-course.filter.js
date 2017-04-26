angular
  .module('entp.core')
  .filter('importStatusFilter', function () {
    return function (param) {
      if (!param) {
        return '导入学员'
      }
      if (param === 1) {
        return '已导入'
      }
      if (param === 2) {
        return '导入失败'
      }
    }
  })
