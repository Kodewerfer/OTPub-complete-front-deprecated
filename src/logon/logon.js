; (function () {
  var validURl = '/User/Login/dologin'
  var $ = jQuery = require('jquery')
  var beforeSubmitCheck = require('./logon-submit')

  $(document).ready(function () {
    // the before login check function
    beforeSubmitCheck(validURl)
    $('.form-block').on('click.changePlaceHolder', 'input:radio', function (ev) {
      var $theTag = $(this).next('span')
      var $uNameInp = $('input:text[name=username]')

      if ($theTag.text() === '个人用户') {
        $uNameInp.attr('placeholder', '请输入邮箱/手机号')
      } else {
        $uNameInp.attr('placeholder', '请输入公司名')
      }
    })
  })
})()
