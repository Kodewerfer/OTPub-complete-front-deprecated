angular
  .module('watchEvo')
  .component('sideBarNotes', {
    bindings: {
      noteDatas: '<',
      onEdit: '&',
      onDelete: '&'
    },
    template: require('./side-bar.notes.temp.html'),
    controller: function () {

    }
  })
