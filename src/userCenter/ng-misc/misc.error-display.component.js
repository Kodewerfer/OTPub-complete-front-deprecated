angular
  .module('userCenter.misc')
  .component('errorDisplay', {
    bindings: {
      errorDetails: '<'
    },
    template: require('./misc.error-display.temp.html'),
    controller: function () {
      var that = this
      this.isDetailsShowing = false

      //  toggle the error details display.
      this.toggleDetails = function () {
        that.isDetailsShowing = !that.isDetailsShowing
      }
    }
  })
