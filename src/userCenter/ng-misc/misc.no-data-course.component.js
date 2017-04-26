angular
  .module('userCenter.misc')
  .component('noDataCourse', {
    bindings: {
      alertMsg: '@',
      goCourseCenter: '<'
    },
    template: require('./misc.no-data-course.temp.html'),
    controller: function () {
      var that = this
    }
  })
