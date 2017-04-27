; (function () {
  require('sticky')

  // tab switch.
  $(document).ready(function () {
    $('.section-head>span').on('click', function (ev) {
      ev.preventDefault()

      $(this).addClass('active').siblings().removeClass('active')

      var $relatedContent = $('.contents-main.' + $(this).data('value'))

      $relatedContent.show().siblings('.contents-main').hide()

      if ($relatedContent.find('iframe').length) {
        var theFrame = $relatedContent.find('iframe')[0]
        theFrame.style.height = $(theFrame.contentWindow.document).find('.contents-main')[0].offsetHeight + 20 + 'px'
      }
    })

    // first tab as defualt one.
    $('.section-head>span').first().trigger('click')

    $('.teacher-float').stick_in_parent({ offset_top: 57 })
    $('.section-head').stick_in_parent({ offset_top: 57 })
      .on('sticky_kit:stick', function (e) {
        $('.section-head .price-buy').show()
      })
      .on('sticky_kit:unstick', function (e) {
        $('.section-head .price-buy').hide()
      })
  })
})()
