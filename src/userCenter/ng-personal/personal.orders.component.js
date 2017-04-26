angular
  .module('userCenter.personal')
  .component('personalMyOrders', {
    template: require('./personal.orders.temp.html'),
    controller: ['personalOrderService', 'filterFilter', 'personalCourseComment', '$timeout', function (orderSrv, arrayFilter, commentSrv, $timeout) {
      var that = this
      // life cycle hooks
      this.$onInit = function () {
        that.fetchData()
      }

      // the list datas
      this.ordersListMeta = [] // ajax fetched result, raw data.
      this.ordersList = [] // filtered list, this wil be what used on the page
      this.ordersListPaged = [] // paged list
      this.orderListFilter = ''
      this.currentFilterType = 0

      // called in the page, set the filter(a ctrl variable)
      this.setListFilter = function (param, filterType) {
        // change the current filter type to change the
        that.currentFilterType = filterType

        that.orderListFilter = param
        // actually filter the datas
        filterData()
      }

      // lower level function, filter the original datas.
      // ONLY CALLED PROGRAMATICALLY
      var filterData = function () {
        that.ordersList = arrayFilter(that.ordersListMeta, that.orderListFilter)
      }

      // paging
      this.dataSlicer = function (start, ends) {
        that.ordersListPaged = that.ordersList.slice(start, ends)
      }

      // switches for the pop outs.
      this.showErrorWindow = false
      this.showDataTable = false
      this.showTopFilters = false
      this.showNoData = false
      this.ajaxErrorMesg = ''

      // comment window
      this.commentWindow = {
        isOpen: false,
        commentTarget: null,
        commentContents: '',
        starScore: false,
        isErrorOccured: false,
        isCommentEmpty: false,
        isCommentComplete: false,
        closeWindow: function () {
          this.isOpen = false
          this.isErrorOccured = false
          this.isErrorOccured = false
        },
        addComment: function (param) {
          this.commentTarget = param
          this.isOpen = true
        },
        sendComment: function () {
          var commentWindow = this
          if (!commentWindow.commentContents.length) {
            commentWindow.isCommentEmpty = true
            return
          }
          commentWindow.isCommentEmpty = false
          // TODO: SEDN COMMENT TO SERVER
          // reset the commentDatas
          commentSrv.sendComment({
            'courseid': commentWindow.commentTarget,
            'content': commentWindow.commentContents,
            'score': commentWindow.starScore
          }).then(function () {
            that.fetchData()
            commentWindow.isErrorOccured = false
            commentWindow.isCommentComplete = true
            // success
            $timeout(function () {
              commentWindow.isOpen = false
              commentWindow.commentTarget = null
              commentWindow.commentContents = ''
              commentWindow.isCommentComplete = false
            }, 2000)
          }, function () {
            // error
            commentWindow.isErrorOccured = true
          })
        }
      }

      var ajaxSuccess = function (res) {
        res = res.data
        if (!res.data || !res.data.length) {
          that.showNoData = true
          return
        }
        // store raw data
        that.ordersListMeta = res.data
        // filter the raw datas by filter
        filterData()
        that.showDataTable = true
        that.showTopFilters = true
      }

      var ajaxError = function (errorRes) {
        that.showErrorWindow = true
        that.showDataTable = false
        that.showTopFilters = false
        that.ajaxErrorMesg = errorRes
      }

      this.fetchData = function () {
        that.showDataTable = false
        that.showTopFilters = false
        orderSrv.getOrderList().then(ajaxSuccess, ajaxError)
      }
    }]
  })
