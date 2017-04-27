// video js importing
var vjs = window.videojs = require('videojs/video.min')
require('videojs/ie8/videojs-ie8.min')
require('videojs/video-js.min.css')
require('videojs-sublime-skin/dist/videojs-sublime-skin.min.css')

// scroll functions
require('pefectScroll/perfect-scrollbar.min')
require('pefectScroll/perfect-scrollbar.min.css')

  ; (function () {
    var $theIframe

    // toggle switches.
    $(document).ready(function () {
      // toggling menu.
      $('.course-menu>a').on('click', function (ev) {
        ev.preventDefault()
        $('.course-menu .course-menu-actual').toggle()
      })
      // close menu button.
      $('.course-menu-actual .menu-head>a').on('click', function (ev) {
        ev.preventDefault()
        $('.course-menu-actual').hide()
      })

      // the side bar
      $('.fa-commenting').on('click', function (ev) {
        ev.preventDefault()
        var $wrapper = $('.video-wrapper')
        var $sideBar = $('.side-wrapper')
        if ($wrapper.hasClass('with-side-bar')) {
          $(this).removeClass('active')
          $wrapper.removeClass('with-side-bar')
          $sideBar.hide()
        } else {
          $(this).addClass('active')
          $wrapper.addClass('with-side-bar')
          $sideBar.show()
        }
      })
    })

    //
    $(document).ready(function () {
      // var thePlayer = vjs('coursePlayer')
      // debugger
    })

    /**
     *  iframe.
     */
    $(document).ready(function () {
      $theIframe = $('iframe')[0]
      $('iframe').on('load', function () {
        this.style.height = $(this.contentWindow.document).find('body>div')[0].offsetHeight + 20 + 'px'
      })
    })

    // re-height the iframe when window is resizing.
    $(window).resize(function () {
      if (!$theIframe) {
        return
      }
      $theIframe.style.height = $($theIframe.contentWindow.document).find('body>div')[0].offsetHeight + 20 + 'px'
    })
  })()
