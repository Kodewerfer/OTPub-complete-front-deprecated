angular
  .module('userCenter.personal')
  .component('personalReceipt', {
    template: require('./personal.receipt.temp.html'),
    controller: ['personalRecipientService', 'Upload', function (reSrv, $upload) {
      var that = this

      this.$onInit = function () {
        that.fetchData()
      }

      // receipt avaliablity
      this.order = {
        amount: '',
        status: 0
      }
      // the receipt types
      this.recType = {}
      this.recCate = {}
      // the recipient
      this.recipient = null

      // adding and editing 
      this.addEdit = {
        isOpen: false,
        isEditing: false,
        errorMsg: '',
        hideUpload: false,
        uploadMsg: '',
        btnText: '',
        theContent: {}, // empty if it's adding, or the address if edting.
        open: function (isEditing) {
          this.isOpen = true
          this.btnText = '添加'
          // editing
          if (isEditing) {
            this.isEditing = true
            this.btnText = '修改'
            // deep copy the fetch object.
            this.theContent = angular.copy(that.recipient)
          }
        },
        close: function () {
          this.isOpen = false
          this.isEditing = false
          this.theContent = {}
          this.uploadMsg = ''
          this.errorMsg = ''
        },
        uploadImg: function (file, errorFile) {
          var _this = this
          if (file) {
            _this.hideUpload = true
            $upload.upload({
              url: '/User/Userservice/invoice_add_image',
              data: { file: file }
            })
              .then(function (res) {
                res = res.data
                // success
                if (res.status === 'success') {
                  that.replyMsg = false
                  // returned image address
                  _this.theContent.photo = res['file']
                } else {
                  _this.uploadMsg = res.msg
                }
              }, function () {
                // error
                _this.uploadMsg = '上传失败，发送失败。'
              }, function (ev) {
                // notify
                var theProgress = parseInt(100.0 * ev.loaded / ev.total)
                if (theProgress === 100) {
                  _this.uploadMsg = '上传成功'
                  _this.hideUpload = false
                  // that.uploadProgress = 0
                } else {
                  _this.uploadMsg = '上传中'
                  that.uploadProgress = theProgress
                }
              })
          }
        },
        submit: function () {
          var _this = this

          if (this.isEditing) {
            // 修改
            reSrv.edit(_this.theContent).success(function (res) {
              if (res.status !== 'success') {
                _this.errorMsg = res.msg
                return
              }
              _this.isOpen = false
              that.fetchData()
            })
          }

          if (!this.isEditing) {
            // 新增
            reSrv.add(_this.theContent).success(function (res) {
              if (res.status !== 'success') {
                _this.errorMsg = res.msg
                return
              }

              _this.isOpen = false
              // reload              
              that.fetchData()
            })
          }

        }
      }

      // request
      this.isRequestWinOpen = false
      this.requestResult = ''
      this.sendRequest = function () {
        reSrv.request().success(function (res) {
          that.isRequestWinOpen = true
          that.requestResult = res.msg
          that.fetchData()
        })
      }

      // ajax handling.
      this.ajaxErrorMesg = ''
      this.showNoData = false

      this.fetchData = function () {
        that.showNoData = false
        that.ajaxErrorMesg = ''

        reSrv.fetch().then(function (res) {
          res = res.data

          that.order.amount = res['order_amount']
          that.order.status = res['order_status']
          // 
          that.recipient = res['list']
          that.recType = res['types']
          // 
          that.recCate = res['categorys']

          if (res.status === 'fail') {
            that.showNoData = true
            return false
          }


        }, function (errorRes) {
          that.ajaxErrorMesg = errorRes
        })

      }
    }]
  })
