angular
  .module('entp.core')
  .factory('entpInfoService', ['$http', 'urlFixer', function ($http, urlFixer) {
    var getInfo = function () {
      return $http.get(urlFixer.pre + '/User/Company/companyinfo' + urlFixer.sub, { cache: true })
    }

    var editUserInfo = function (data) {
      return $http.post(urlFixer.pre + '/User/Company/edit_company' + urlFixer.sub, { data: data })
    }

    return {
      getUserInfos: getInfo,
      editUserInfo: editUserInfo
    }
  }])
