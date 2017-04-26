angular
  .module('personal.core')
  .factory('personalBrowsedService', ['$http', 'urlFixer', function ($http, urlFixer) {
    var fetchList = function () {
      return $http.get(urlFixer.pre + '/User/Usercourse/scanned_course' + urlFixer.sub, { cache: false })
    }

    var sendToTop = function (datas) {
      return $http.post(urlFixer.pre + '/User/Usercourse/scanned_top', datas)
    }

    var tornItDown = function (datas) {
      return $http.post(urlFixer.pre + '/User/Usercourse/cancel_top/course_id/' + datas)
    }

    return {
      getBrowsedList: fetchList,
      sendToTop: sendToTop,
      tornItDown: tornItDown
    }
  }])
