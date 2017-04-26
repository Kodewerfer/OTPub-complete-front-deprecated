angular
  .module('entp.core')
  .factory('entpMemberService', ['$http', 'urlFixer', function ($http, urlFixer) {
    var fetchMembersList = function () {
      return $http.get(urlFixer.pre + '/User/Company/company_user' + urlFixer.sub, { cache: true })
    }

    var getDownloadAddr = function () {
      return $http.get(urlFixer.pre + '/User/Company/get_company_user' + urlFixer.sub, { cache: true })
    }

    return {
      getMembersList: fetchMembersList,
      getDownloadAddr: getDownloadAddr
    }
  }])
