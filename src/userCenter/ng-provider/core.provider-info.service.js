angular
  .module('provider.core')
  .factory('providerInfoService', ['$http', 'urlFixer', function ($http, urlFixer) {
    var getUserInfo = function () {
      return $http.get(urlFixer.pre + '/User/Firms/firminfo' + urlFixer.sub, { cache: true })
    }

    var editUserInfo = function (data) {
      return $http.post(urlFixer.pre + '/User/Firms/edit_firm' + urlFixer.sub, { data: data })
    }

    return {
      getUserInfos: getUserInfo,
      editUserInfo: editUserInfo
    }
  }])
