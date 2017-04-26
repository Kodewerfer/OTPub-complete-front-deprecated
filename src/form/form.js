; (function () {
  var $ = jQuery = require('jquery')

  require('bootstrap-modal/css/bootstrap.modal.css')
  require('bootstrap-modal/js/bootstrap-modal.min.js')
  require('artDialog/css/ui-dialog.css')
  require('artDialog/dist/dialog-min.js')

  $(document).ready(function () {
    function myalert(option) {
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

      if (options.modal) { d.showModal() } // 模态框显示
      else { d.show() }

      d.width(options.width) // 弹窗宽度
      if (options.autoClose) {
        setTimeout(function () {
          d.close().remove() // 关闭并销毁弹窗
        }, options.timeOut)
      }
      return d
    }

    // 点击提交按钮
    $('form').off('submit.booking')
    $('form').on('submit.booking', function (ev) {
      ev.preventDefault()
      var required = false
      var requiredMsg = ''

      $(this).find('.is-require').each(function () {
        if (!$(this).val()) {
          required = true
          requiredMsg = $(this).data('require')
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
        url: $(this).attr('action'),
        data: $(this).serialize(),
        dataType: 'json',
        success: function (data) {
          if (data.status) {
            var dialog = myalert({
              title: '提醒！',
              content: data.msg,
              quickClose: false,
              okValue: '确 定',
              ok: function () {
                if (data.status === 1) {
                  dialog.remove()
                  $('.modal.fade').modal('hide')
                  $('.modal-backdrop.in').hide()

                  // ** 接口 ** 表单完成后运行额外内容
                  if (!window.formEvo || !window.formEvo.ajaxComplete || typeof window.formEvo.ajaxComplete !== 'function') {
                    return false
                  }
                  // 运行扩展方法
                  window.formEvo.ajaxComplete()
                }
              },
              modal: true
            })
            dialog.showModal()
          } else {
            myalert('警告！', data.message)
          }
          // ** 接口 ** 表单提交后『一定』运行的内容
        }
      })
    })
  })
})()
