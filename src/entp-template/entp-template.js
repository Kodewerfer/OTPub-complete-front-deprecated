;(function () {
  $(document).ready(function () {
    $('.blockies-two').hover(function () {
      $(this).find('.bg1').attr('src', require('../../images/entp-template/bg4.png'))
    }).mouseleave(function () {
      $(this).find('.bg1').attr('src', require('../../images/entp-template/bg1.png'))
    })
  })
})()
