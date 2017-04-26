angular.module('userCenter.misc')
  .factory('recommandedService', ['$http', 'urlFixer', function ($http, urlFixer) {
    var getRecom = function () {
      return $http.get(urlFixer.pre + '/User/Like/getguesslike' + urlFixer.sub, { cache: false })
    }

    return {
      getRecom: getRecom
    }
  }])
