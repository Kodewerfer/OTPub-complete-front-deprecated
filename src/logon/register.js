; (function () {
  var validURl = '/User/Reg/doregister'
  var beforeSubmitCheck = require('./parts/logon-submit')

  $(document).ready(function () { 
    // the before login check function
    beforeSubmitCheck(validURl)
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
