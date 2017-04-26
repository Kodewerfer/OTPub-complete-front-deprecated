angular
  .module('personal.core')
  .factory('personalBroadcastService', ['$http', 'urlFixer', function ($http, urlFixer) {
    var fetchList = function () {
      return $http.get(urlFixer.pre + '/User/Usercourse/user_live' + urlFixer.sub, { cache: true })
    }

    return {
      getBroadcastList: fetchList
    }
  }])
