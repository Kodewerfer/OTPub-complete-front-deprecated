angular
  .module('personal.core')
  .factory('personalCourseComment', ['$http', 'urlFixer', function ($http, urlFixer) {
    var sendComment = function (comment) {
      return $http.post(urlFixer.pre + '/User/Usercourse/comment', { data: comment})
    }

    return {
      sendComment: sendComment
    }
  }])
