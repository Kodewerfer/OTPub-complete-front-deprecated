

angular
  .module('userCenter.personal')
  .component('personalBrowsed', {
    template: require('./personal.browsed.temp.html'),
    controller: ['personalBrowsedService', function (brsdSrv) {
      var that = this
      this.$onInit = function () {
        that.fetchData()
      }
      // the list datas
      this.theList = []
      this.theListPaged = [] // paged list

      this.dataSlicer = function (start, ends) {
        that.theListPaged = that.theList.slice(start, ends)
      }

      // switches for the pop outs.
      this.showErrorWindow = false
      this.ajaxErrorMesg = ''

      this.topStatus = {
        sendToTop: function (cId) {
          brsdSrv.sendToTop({
            course_id: cId
          }).then(function () {
            that.fetchData()
          }, function () {

          })
        },
        tornItDown: function (cId) {
          brsdSrv.tornItDown(cId).then(function () {
            that.fetchData()
          }, function () {

          })
        }
      }

      // comment window
      this.commentWindow = {
        isOpen: false,
        commentTarget: null,
        commentContents: '',
        closeWindow: function () {
          this.isOpen = false
          this.commentTarget = null
          this.commentContents = ''
        },
        addComment: function (param) {
          this.commentTarget = param
          this.isOpen = true
        },
        sendComment: function () {
          // TODO: SEDN COMMENT TO SERVER
          // reset the commentDatas
          this.isOpen = false
          this.commentTarget = null
          this.commentContents = ''
        }
      }
      var ajaxSuccess = function (res) {
        res = res.data

        if (!res.data || !res.data.length) {
          that.showNoData = true
          return
        }
        that.theList = res.data
      }

      var ajaxError = function (errorRes) {
        that.showErrorWindow = true
        that.ajaxErrorMesg = errorRes
      }

      this.fetchData = function () {
        brsdSrv.getBrowsedList().then(ajaxSuccess, ajaxError)
      }
    }]
  })
