angular
  .module('personal.core')
  .factory('personalCourseService', ['$http', 'urlFixer', function ($http, urlFixer) {
    var fetchList = function () {
      return $http.get(urlFixer.pre + '/User/Usercourse/user_course' + urlFixer.sub)
    }

    return {
      getCourseList: fetchList
    }
  }])
