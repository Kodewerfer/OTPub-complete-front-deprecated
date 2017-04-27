; (function () {
  var validURl = '/User/Reg/doregister'
  var beforeSubmitCheck = require('./logon-submit')

  $(document).ready(function () {
    // the before login check function
    beforeSubmitCheck(validURl)
    $('.agreement').hide()
    $('.protocol').on('click', function () {
      $('.agreement').show()
      
    })
    // $('.protocol').click(function(){
    //   $('.agreement').show()
    // })
    $('.close').click(function () {
      $('.agreement').hide()
    })
  })
})()
