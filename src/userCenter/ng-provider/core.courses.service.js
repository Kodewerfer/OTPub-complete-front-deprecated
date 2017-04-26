angular
  .module('provider.core')
  .factory('providerCoursesService', ['$http', 'urlFixer', function ($http, urlFixer) {
    var fetchList = function () {
      return $http.get(urlFixer.pre + '/User/Firms/firm_course' + urlFixer.sub, { cache: true })
    }

    var fetchMembers = function (param) {
      return $http.get(urlFixer.pre + '/User/Firms/course_user/courseid/' + param + urlFixer.sub, { cache: true })

      // return $http.get(urlFixer.pre + '/User/Firms/course_user' + urlFixer.sub, { cache: true })
    }

    var fetcExportFileAddr = function (param) {
      return $http.get(urlFixer.pre + '/User/Firms/get_course_user/courseid/' + param + urlFixer.sub, { cache: true })
    }

    return {
      getCoursesList: fetchList,
      getCoursesParticipant: fetchMembers,
      getExportFileAddr: fetcExportFileAddr

    }
  }])
