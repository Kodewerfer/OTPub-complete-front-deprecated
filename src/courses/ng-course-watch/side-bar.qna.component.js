angular
  .module('watchEvo')
  .component('sideBarQna', {
    bindings: {
      questionDatas: '<',
      onDelete: '&'
    },
    template: require('./side-bar.qna.temp.html')
  })
