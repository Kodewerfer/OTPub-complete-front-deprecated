;(function () {
  var $ = jQuery = require('jquery')

  require('bootstrap-modal/css/bootstrap.modal.css')
  require('bootstrap-modal/js/bootstrap-modal.min.js')
  require('artDialog/css/ui-dialog.css')
  require('artDialog/dist/dialog-min.js')

  $(document).ready(function () {
    function myalert (option) {
      var options = {
        width: 200,
        autoClose: false,
        timeOut: 2000,
        title: '提示信息',
        content: '',
        quickClose: false,
        okValue: '确 定', //	确定按钮
        ok: function () {}, // 确定返回函数
        modal: true
      }

      $.extend(options, option || {})

      var d = dialog(options)

      if (options.modal)
        d.showModal(); // 模态框显示
      else
        d.show()

      d.width(options.width); // 弹窗宽度
      if (options.autoClose) {
        setTimeout(function () {
          d.close().remove(); // 关闭并销毁弹窗
        }, options.timeOut)
      }
      return d
    }

    function showInfo (obj, str) {
      if ($(obj).hasClass('active')) return
      var id = 'pro_' + str
      $('.table-item').removeClass('active')
      $(obj).addClass('active')
      $("#pro-content>div[id^='pro_']").removeClass('active')
      $('#' + id).addClass('active')
    }

    $('.btn-tryNow').click(function (ev) {
      // var vedio = 
      ev.preventDefault()
      var html = $('#dialog-content').html()
      d = myalert({
        width: 853,
        height: 553,
        outerClass: 'ui-dialog-custom',
        title: ' ',
        content: html,
        quickClose: false,
        ok: false,
        modal: true
      }).showModal()
    })

    $('.submit').on('click', function () {
      var $true_name = $('#true_name').val()
      var $phone_number = $('#phone_number').val()
      var $email = $('#email').val()
      var $company = $('#companyName').val()
      var $position = $('#position').val()
      var $companySize = $('#companySize').val()
      var required = false
      var requiredMsg = ''
      if ($true_name == '') {
        required = true
        requiredMsg = '姓名不能为空'
      } else if ($phone_number == '') {
        required = true
        requiredMsg = '联系方式不能为空'
      } else if ($email == '') {
        required = true
        requiredMsg = '邮箱不能为空'
      } else if ($company == '') {
        required = true
        requiredMsg = '公司名称不能为空'
      }
      if (required) {
        myalert({
          title: '警告',
          content: requiredMsg,
          okValue: '确定',
          ok: function () {},
          modal: true
        }).showModal()
        return false
      }
      $.post(
        'http://www.yuandingit.com/index.php?m=formguide&c=index&a=ajax_emmsub',
        {'info[true_name]': $true_name,'info[phone_number]': $phone_number,'info[email]': $email,'info[company]': $company,'info[position]': $position,'info[companySize]': $companySize},
        function (data) {
          var dd = myalert({
            title: '提示',
            content: data.msg,
            okValue: '确定',
            ok: function () {
              if (data.url != '') {
                //						d.remove()
                $('.modal').modal('hide')
              // window.top.location.href = data.url;	
              }
            },
            modal: true
          }).showModal()
        },
        'json')
    })
  })
})()
