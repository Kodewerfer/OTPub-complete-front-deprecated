angular
  .module('personal.core')
  .factory('userService', ['$http', 'urlFixer', function ($http, urlFixer) {
    var getUser = function () {
      return $http.get(urlFixer.pre + '/User/Usercourse/userinfo' + urlFixer.sub, { cache: false })
    }

    var editUserInfo = function (data) {
      return $http.post(urlFixer.pre + '/User/Usercourse/edit_userinfo' + urlFixer.sub, { data: data })
    }

    var sendSms = function (phoneNum) {
      return $http.post(urlFixer.pre + '/User/Usercourse/public_sendsms' + urlFixer.sub, { data: phoneNum })
    }

    var addMobile = function (data) {
      return $http.post(urlFixer.pre + '/User/Usercourse/edit_tel' + urlFixer.sub, { data: data })
    }

    return {
      getUserInfos: getUser,
      editUserInfo: editUserInfo,
      sendSms: sendSms,
      addMobile: addMobile
    }
  }])
