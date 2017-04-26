angular
  .module('userCenter.misc')
  .component('recommandedContents', {
    template: require('./misc.recommanded.temp.html'),
    controller: ['recommandedService', function (recomSrv) {
      var that = this
      this.$onInit = function () {
        fetchData()
      }
      this.recomList = []

      this.refreshContent = function () {
        fetchData()
      }

      var fetchData = function () {
        recomSrv.getRecom().then(function (res) {
          res = res.data
          if (!res.data.length) {
            return
          }

          // success
          that.recomList = res.data.slice(0, 4)
        })
      }
    }]
  })
