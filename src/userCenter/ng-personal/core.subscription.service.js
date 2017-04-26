angular
  .module('personal.core')
  .factory('personalSubscriptionService', ['$http', 'urlFixer', function ($http, urlFixer) {
    var fetchList = function () {
      return $http.get(urlFixer.pre + '/User/Usercourse/user_cart' + urlFixer.sub, { cache: true})
    }

    return {
      getSubList: fetchList
    }
  }])
