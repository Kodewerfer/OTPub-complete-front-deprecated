/**
 *  该文件纯粹为其他JS提供公用代码，不需上传SVN/被页面引入
 * by LIJIALIN
 */

; (function () {
  require('bootstrap-modal/css/bootstrap.modal.css')
  require('bootstrap-modal/js/bootstrap-modal.min.js')
  require('artDialog/css/ui-dialog.css')
  require('artDialog/dist/dialog-min.js')
$(document).ready(function () {
  var myalert = function (option) {
    var options = {
      width: 200,
      autoClose: false,
      timeOut: 2000,
      title: '提示信息',
      content: '',
      quickClose: false,
      okValue: '确 定', //	确定按钮
      ok: function () { }, // 确定返回函数
      modal: true
    }

    $.extend(options, option || {})

    var d = dialog(options)

    if (options.modal) {
      d.showModal()
    } // 模态框显示
    else {
      d.show()
    }

    d.width(options.width) // 弹窗宽度
    if (options.autoClose) {
      setTimeout(function () {
        d.close().remove() // 关闭并销毁弹窗
      }, options.timeOut)
    }
    return d
  }

  // 点击提交按钮

  $('form').on('submit', function (ev) {
    ev.preventDefault()
    var required = false
    var requiredMsg = ''
    $(this).children().find('.is-require').each(function () {
      if ($(this).val() === '') {
        required = true
        requiredMsg = $(this).data('require')
        return false
      }
    })

    

    if (required) {
      myalert({
        title: '警告',
        content: requiredMsg,
        okValue: '确定',
        ok: function () { },
        modal: true
      }).showModal()
      return false
    }

    $.ajax({
      type: 'POST',
      url: '/User/Login/resetpwdstep2',
      data: $(this).serialize(),
      dataType: 'json',
      success: function (data) {
        if (data.status == 0) {
          // 成功后直接跳转
          window.location.href = data.url
          return
        } else {
          myalert({
            title: '警告！',
            content: data.msg
          })
        }
      }
    })
  })
})
})()
