angular
  .module('personal.core')
  .factory('personalOrderService', ['$http', 'urlFixer', function ($http, urlFixer) {
    var fetchList = function () {      
      return $http.get(urlFixer.pre + '/User/Userservice/userorder' + urlFixer.sub)
    }

    return {
      getOrderList: fetchList
    }
  }])
