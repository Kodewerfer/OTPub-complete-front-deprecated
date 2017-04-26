angular
  .module('personal.core')
  .factory('personalMessagesService', ['$http', 'urlFixer', function ($http, urlFixer) {
    var fetchList = function () {
      return $http.get(urlFixer.pre + '/User/Message/index' + urlFixer.sub, { cache: false })
    }

    var getMessage = function (id) {
      return $http.get(urlFixer.pre + '/User/Message/shows/id/' + id + urlFixer.sub, { cache: false })
    }

    return {
      getMessageList: fetchList,
      getMessage: getMessage
    }
  }])
