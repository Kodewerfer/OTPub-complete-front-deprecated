angular
  .module('userCenter.misc')
  .component('noData', {
    bindings: {
      alertMsg: '@'
    },
    template: require('./misc.no-data.temp.html'),
    controller: function () {
    }
  })
