angular
  .module('personal.core')
  .factory('personalQuestionService', ['$http', 'urlFixer', function ($http, urlFixer) {
    // 获取列表
    var fetchData = function (datas) {
      return $http.get(urlFixer.pre + '/User/Userservice/question_list' + urlFixer.sub, { cache: false })
    }

    // 删除项目
    var deleteItem = function (id) {
      return $http.post(urlFixer.pre + '/User/Userservice/question_del' + urlFixer.sub, { id: id })
    }

    return {
      'fetch': fetchData,
      'del': deleteItem
    }
  }])
