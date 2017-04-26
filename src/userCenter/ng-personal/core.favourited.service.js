angular
  .module('personal.core')
  .factory('personalFaviCoursesService', ['$http', 'urlFixer', function ($http, urlFixer) {
    var fetchList = function () {
      return $http.get(urlFixer.pre + '/User/Usercourse/user_favorite' + urlFixer.sub, { cache: false })
    }

    var deleteItem = function (params) {
      return $http.post(urlFixer.pre + '/User/Usercourse/del_favorite', { data: params })
    }

    return {
      getFaviList: fetchList,
      deleteItem: deleteItem
    }
  }])
