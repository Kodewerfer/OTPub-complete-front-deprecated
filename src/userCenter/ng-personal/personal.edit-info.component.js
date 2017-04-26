// 修改资料页面
angular
  .module('userCenter.personal')
  .component('personalEditInfo', {
    template: require('./personal.edit-info.temp.html'),
    controller: ['userService', '$timeout', 'Upload', '$interval', function (userSrv, $timeout, $uploadSrv, $interval) {
      var that = this
      this.$onInit = function () {
        that.fetchData()
      }
      this.userInfo = {}
      this.needMobile = false // if the user logined the first time, and a mobile number is needed.
      this.fetchData = function () {
        userSrv.getUserInfos().then(function (res) {
          res = res.data
          that.userInfo = res.data
          // need to fill in a mobile number
          if (!res.data.mobile) {
            that.needMobile = true
          }
        }, function () {

        })
      }

      /**
       * mobile
       */
      this.mobileInfos = {
        mobile: '',
        capcha: ''
      }
      this.isisEditPhoneShown = false
      this.sendBtnText = '发送验证码'
      this.reSendCountDown = '' //count down number
      this.sendSms = function () {
        if (that.sendBtnText === '已发送') {
          return false
        }
        userSrv.sendSms(that.mobileInfos.mobile).success(function (res) {
          if (res.status === 'success') {
            that.sendBtnText = '已发送'
            that.reSendCountDown = 30
            return false
          }
          that.sendBtnText = res.msg

        })
        $timeout(function () {
          that.sendBtnText = '发送验证码'
        }, 30000)
        // count down
        $interval(function () {
          that.reSendCountDown -= 1
          if (that.reSendCountDown === 0) {
            that.reSendCountDown = ''
          }
        }, 1000, 30)
      }
      this.addMobile = function () {
        userSrv.addMobile(that.mobileInfos).success(function (res) {
          if (res.status === 'success') {
            that.isEditPhoneShown = false
            that.fetchData()
            return false
          }
          that.mobileReplyMsg = res.msg
        })
      }

      // generic reply message
      this.replyMsg = ''
      /**
       * Avatar
       */
      this.uploadProgress = 0
      // upload user avatar
      this.uploadAvatar = function (file, errorFile) {
        that.replyMsg = false
        if (errorFile.length) {
          var theFile = errorFile[0]
          if (theFile.$error === 'maxSize') {
            that.replyMsg = '【' + theFile.name + '】 过大！必须小于' + theFile.$errorParam
          }
          return
        }
        if (file) {
          $uploadSrv.upload({
            url: '/User/Usercourse/edit_avatar',
            data: { file: file }
          })
            .then(function (res) {
              // success
              res = res.data
              // success
              if (res.status === 'success') {
                that.fetchData()
                that.replyMsg = false
              } else {
                that.replyMsg = res.msg
              }
            }, function () {
              // error
              that.replyMsg = '服务器错误，上传头像失败！'
            }, function (ev) {
              // notify
              var theProgress = parseInt(100.0 * ev.loaded / ev.total)
              if (theProgress === 100) {
                that.uploadProgress = 0
              } else {
                that.uploadProgress = theProgress
              }
            })
        }
      }

      /**
       * edit user infos
       */
      // send the changed infos to sever
      this.sendChanges = function () {
        // call service to change the datas
        userSrv.editUserInfo({
          'realname': that.userInfo.realname || '',
          'company': that.userInfo.company || '',
          'branch': that.userInfo.branch || ''
        })
          // server reply
          .then(function (res) {
            // success
            that.replyMsg = res.data.msg
          }, function () {
            // error
            that.replyMsg = '数据发送失败！请稍候重试！'
          })
      }
    }]
  })
