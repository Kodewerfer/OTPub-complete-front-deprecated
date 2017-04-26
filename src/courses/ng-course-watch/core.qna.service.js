angular
  .module('watchEvo.core')
  .factory('qnaService', ['$http', 'urlFixer', function ($http, urlFixer) {
    // 获取列表
    var fetchData = function (datas) {
      if (urlFixer.sub === '.json') {
        return $http.get(urlFixer.pre + '/User/Userservice/question_list_course' + urlFixer.sub, { cache: false })
      }
      return $http.post(urlFixer.pre + '/User/Userservice/question_list_course' + urlFixer.sub, datas, { cache: false })
    }

    // 添加新项目
    var addNewItem = function (datas) {
      return $http.post(urlFixer.pre + '/User/Userservice/question_add' + urlFixer.sub, { data: datas })
    }

    // 删除项目
    var deleteItem = function (id) {
      return $http.post(urlFixer.pre + '/User/Userservice/question_del' + urlFixer.sub, { id: id })
    }

    return {
      'add': addNewItem,
      'fetch': fetchData,
      'del': deleteItem
    }
  }])
