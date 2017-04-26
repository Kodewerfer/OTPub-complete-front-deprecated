; (function () {
  var $ = jQuery = require('jquery')

  jQuery.extend(window, window.broadcastBooking,
    {
      broadcastBooking: {
        currentEngage: null
      }
    })

  require('bootstrap-modal/css/bootstrap.modal.css')
  require('bootstrap-modal/js/bootstrap-modal.min.js')
  require('artDialog/css/ui-dialog.css')
  require('artDialog/dist/dialog-min.js')

  $(document).ready(function () {
    // 添加form接口
    jQuery.extend(window, window.formEvo,
      {
        formEvo: {
          ajaxComplete: function () {
            window.broadcastBooking.currentEngage.text('已预约')
            window.broadcastBooking.currentEngage.css('cursor', 'default')
            window.broadcastBooking.currentEngage.removeAttr('data-target')
          }

        }
      })

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

    // 点击我要预约
    $('.engage-btn').off('click.booking')
    $('.engage-btn').on('click.booking', function () {
      var currentTarget = $(this).data('target')
      var currentCourse = $(this).data('identifer')
      $('#videoNumber').val(currentCourse)
      var $videoNumber = $('#videoNumber').val()

      // 缓存当前
      window.broadcastBooking.currentEngage = $(this)
      // 本方法变量
      var $this = $(this)

      //  判断当弹出预约成功框时直接提交视频编号
      if (currentTarget === '#formModal2') {
        $.post(
          '/Home/VhallLive/ajaxOrder.html',
          { 'videoNumber': $videoNumber },
          function (data) {
            var dd = myalert({
              title: '提示',
              content: data.msg,
              okValue: '确定',
              ok: function () {
                if (data.status === 1) {
                  // d.remove()
                  $('.modal').modal('hide')
                  $this.text('已预约')
                  $this.css('cursor', 'default')
                  $this.removeAttr('data-target')
                }
              },

              modal: true
            }).showModal()
          }, 'json')
      }
    })
  })
})()
