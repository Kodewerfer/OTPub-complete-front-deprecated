angular
  .module('personal.core')
  .factory('personalNotesService', ['$http', 'urlFixer', function ($http, urlFixer) {
    // 获取列表
    var fetchData = function (datas) {
      return $http.get(urlFixer.pre + '/User/Userservice/note_list' + urlFixer.sub, { cache: false })
    }

    // 添加新项目
    var addNewItem = function (datas) {
      return $http.post(urlFixer.pre + '/User/Userservice/note_add' + urlFixer.sub, { data: datas })
    }

    // 删除项目
    var deleteItem = function (id) {
      return $http.post(urlFixer.pre + '/User/Userservice/note_del' + urlFixer.sub, { id: id })
    }

    // 修改项目
    var editItem = function (datas) {
      return $http.post(urlFixer.pre + '/User/Userservice/note_edit' + urlFixer.sub, { data: datas })
    }

    return {
      'add': addNewItem,
      'fetch': fetchData,
      'del': deleteItem,
      'edit': editItem
    }
  }])
