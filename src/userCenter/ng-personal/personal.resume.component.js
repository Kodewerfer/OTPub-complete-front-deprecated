angular
  .module('userCenter.personal')
  .component('personalResume', {
    template: require('./personal.resume.temp.html'),
    controller: ['Upload', function ($upload) {
      var that = this

      this.replyMsg = false
      this.uploadProgress = 0
      this.openPopout = false
      // upload user avatar
      this.upload = function (file, errorFile) {
        that.replyMsg = false

        if (file) {
          that.openPopout = true
          $upload.upload({
            url: '/User/Userservice/resume_add',
            data: { file: file }
          })
            .then(function (res) {
              res = res.data
              // success
              if (res.status === 'success') {
                that.isSucceed = true
                that.replyMsg = false
              } else {
                that.replyMsg = res.msg
              }
            }, function () {
              // error
              that.replyMsg = '上传失败，发送失败。'
              that.uploadProgress = 100
            }, function (ev) {
              // notify
              var theProgress = parseInt(100.0 * ev.loaded / ev.total)
              that.uploadProgress = theProgress
            })
        }
      }
      this.closePopout = function () {
        that.isSucceed = false
        that.replyMsg = false
        that.uploadProgress = 0
        that.openPopout = false
      }
    }]
  })
