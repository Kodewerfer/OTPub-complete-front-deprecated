angular
  .module('entp.core')
  .factory('entpCoursesService', ['$http', 'urlFixer', function ($http, urlFixer) {
    var fetchCoursesList = function () {
      return $http.get(urlFixer.pre + '/User/Company/company_course' + urlFixer.sub, { cache: true })
    }

    var fetchCourseDetails = function (param) {
      return $http.get(urlFixer.pre + '/User/Company/company_course_user/courseid/' + param + urlFixer.sub, { cache: true })
      // return $http.get(urlFixer.pre + '/User/Company/company_course_user' + urlFixer.sub, { cache: true })
    }

    var fetchGradeFileAddr = function (param) {
      return $http.get(urlFixer.pre + '/User/Company/company_course_user/courseid/' + param + urlFixer.sub, { cache: true })
    }

    return {
      getCoursesList: fetchCoursesList,
      getDetails: fetchCourseDetails,
      getGradeFileAddr: fetchGradeFileAddr
    }
  }])
