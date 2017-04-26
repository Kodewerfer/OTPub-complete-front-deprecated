angular
  .module('userCenter.personal')
  .component('personalNotes', {
    template: require('./personal.notes.temp.html'),
    controller: ['personalNotesService', 'filterFilter', function (nSrv, arrayFilter) {
      var that = this

      this.$onInit = function () {
        fetchData()
      }

      // the message list
      this.dataListMeta = []
      this.dataList = []
      this.dataListPaged = []
      this.dataSlicer = function (start, ends) {
        that.dataListPaged = that.dataList.slice(start, ends)
      }
      this.listFilter = ''
      // ** THE OUTPUT WILL BE PUT INTO THE PAGING COMPONENT
      var filterList = function () {
        that.dataList = arrayFilter(that.dataListMeta, that.listFilter)
      }
      // search function
      this.setFilter = function () {
        filterList()
      }

      /**
       * EDIT
       */
      this.editNote = {
        isOpen: false,
        target: null,
        errorMsg: '',
        isSucceed: false,
        open: function (tar) {
          this.target = tar
          this.isOpen = true
        },
        close: function () {
          this.isOpen = false
          this.target = null
          this.isSucceed = false
          this.errorMsg = ''
        },
        submit: function () {
          var _this = this
          nSrv.edit(_this.target).then(function (res) {
            res = res.data
            if (res.status === 'fail') {
              _this.errorMsg = res.msg
              return
            }

            _this.isSucceed = true

            fetchData()
          }, function (data) {
            _this.errorMsg = '发送数据失败。'
          })

        }
      }


      /**
       * DELETE
       */
      this.deleteNote = function (id) {
        nSrv.del(id).success(function () {
          fetchData()
        })
      }


      // ajax handling.
      this.ajaxErrorMesg = ''
      this.showErrorWindow = false
      this.showNoData = false

      var fetchData = function () {
        nSrv.fetch().then(function (res) {
          res = res.data

          that.dataListMeta = res['list']

          if (!that.dataListMeta.length) {
            that.showNoData = true
            return
          }

          filterList()
        }, function (errorRes) {
          that.showErrorWindow = true
          that.ajaxErrorMesg = errorRes
        })
      }
    }]
  })
