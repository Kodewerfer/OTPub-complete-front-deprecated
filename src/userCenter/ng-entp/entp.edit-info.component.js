// 修改资料页面
angular
  .module('userCenter.entp')
  .component('entpEditInfo', {
    template: require('./entp.edit-info.temp.html'),
    controller: ['entpInfoService', 'Upload', '$timeout', function (EInSrv, $uploadSrv, $timeout) {
      var that = this
      this.$onInit = function () {
        fetchData()
      }
      this.userInfo = {}
      // display switches.
      this.replyMsg = ''
      this.isEditingPass = false // pop out triggerer
      this.editPassMsg = false
      this.newPassword = {}
      this.onChangePass = function () {
        // when change password in the pop out window

        if (that.newPassword.pass !== that.newPassword.repass) {
          // password not matched
          that.editPassMsg = '新密码与确认密码不一致，请重新输入。'
          return
        }

        // save the change, pre for send
        that.isEditingPass = false
        that.editPassMsg = false
        that.userInfo.newPass = that.newPassword.pass
      }
      this.onCancelChangePass = function () {
        that.isEditingPass = false
        that.editPassMsg = false
        that.newPassword.repass = ''
        that.newPassword.pass = ''
      }

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

        $uploadSrv.upload({
          url: '/User/Company/edit_avatar',
          data: { file: file }
        })
          .then(function (res) {
            // success
            that.userInfo.avatar = res.data && res.data.file
            that.replyMsg = false
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
      // send the changed infos to sever
      this.sendChanges = function () {
        // call service to change the datas
        EInSrv.editUserInfo({
          'user': that.userInfo.user || '',
          'mobile': that.userInfo.mobile || '',
          'password': that.userInfo.newPass || false
        })
          // server reply
          .then(function (res) {
            // success
            that.replyMsg = res.data.msg

            $timeout(function () {
              that.replyMsg = false
            }, 2000)
          }, function () {
            // error
            that.replyMsg = '数据发送失败！请稍候重试！'
            that.isChangeSaved = true
          })
      }

      // fetch user infos
      var fetchData = function () {
        EInSrv.getUserInfos().then(function (res) {
          res = res.data
          that.userInfo = res.data
        }, function () { })
      }
    }]
  })
