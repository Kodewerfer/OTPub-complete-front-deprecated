angular
  .module('userCenter.misc')
  .component('pagination', {
    bindings: {
      targetData: '<',
      onPagingFinish: '&',
      pageSize: '<'
    },
    template: require('./misc.pagination.temp.html'),
    controller: ['pagerService', '$scope', function (pagerService, $scope) {
      var that = this

      var pager = {}

      this.setPage = function (param) {
        // if there is no page num passed down
        if (!param) {
          param = 1
        }

        // if there is no data to be paged or get undefined.
        if (!that.targetData) {
          return
        }

        // get pager object from service
        that.pager = pagerService.GetPager(that.targetData.length, param, that.pageSize || 6)
        // call parent component, slice data.
        that.onPagingFinish({ $event: { start: that.pager.startIndex, ends: that.pager.endIndex + 1 } })
      }

      // watch the change, so this component re-render every time the data changed.
      $scope.$watch('$ctrl.targetData', function () {
        if (angular.isArray(that.targetData)) {
          that.setPage()
        }
      })
    }]
  })
