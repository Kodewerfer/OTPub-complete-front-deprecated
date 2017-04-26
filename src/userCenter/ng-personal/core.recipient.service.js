angular
  .module('personal.core')
  .factory('personalRecipientService', ['$http', 'urlFixer', function ($http, urlFixer) {

    // 获取列表
    var fetchData = function (datas) {
      return $http.get(urlFixer.pre + '/User/Userservice/invoice' + urlFixer.sub, { cache: false })
    }

    // 删除收件人
    var deleteItem = function (id) {
      return $http.post(urlFixer.pre + '/User/Userservice/invoice_del' + urlFixer.sub, { id: id })
    }

    // 增加收件人
    var addItem = function (data) {
      return $http.post(urlFixer.pre + '/User/Userservice/invoice_add' + urlFixer.sub, { data: data })
    }

    // 修改收件人
    var editItem = function (data) {
      return $http.post(urlFixer.pre + '/User/Userservice/invoice_edit' + urlFixer.sub, { data: data })
    }

    // 提交开发票请求
    var sendRequest = function () {
      return $http.get(urlFixer.pre + '/User/Userservice/invoice_user' + urlFixer.sub)
    }

    return {
      'fetch': fetchData,
      'del': deleteItem,
      'add': addItem,
      'edit': editItem,
      'request': sendRequest
    }
  }])
