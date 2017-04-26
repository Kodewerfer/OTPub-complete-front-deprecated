/**
 * THIS FILE IS SELF-CONTAINED.
 */

// importing slicks
require('slick/slick.css')
require('slick/slick-theme.css')
require('slick/slick.js')

  // the page effects.

  ; (function () {
    // jquery
    var $ = window.jQuery = require('jquery')

    require('bootstrap-modal/css/bootstrap.modal.css')
    require('bootstrap-modal/js/bootstrap-modal.min.js')

    var marqueePlug = (function () {
      $.fn.textWidth = function () {
        var calc = '<span style="display:none">' + $(this).text() + '</span>';
        $('body').append(calc);
        var width = $('body').find('span:last').width();
        $('body').find('span:last').remove();
        return width;
      };

      $.fn.marquee = function (args) {
        var that = $(this);
        var textWidth = that.textWidth(),
          offset = that.width(),
          width = offset,
          css = {
            'text-indent': that.css('text-indent'),
            'overflow': that.css('overflow'),
            'white-space': that.css('white-space')
          },
          marqueeCss = {
            'text-indent': width,
            'overflow': 'hidden',
            'white-space': 'nowrap'
          },
          args = $.extend(true, { count: -1, speed: 1e1, leftToRight: false }, args),
          i = 0,
          stop = textWidth * -1,
          dfd = $.Deferred();

        function go() {
          if (!that.length) return dfd.reject();
          if (width == stop) {
            i++;
            if (i == args.count) {
              that.css(css);
              return dfd.resolve();
            }
            if (args.leftToRight) {
              width = textWidth * -1;
            } else {
              width = offset;
            }
          }
          that.css('text-indent', width + 'px');
          if (args.leftToRight) {
            width++;
          } else {
            width--;
          }
          setTimeout(go, args.speed);
        };
        if (args.leftToRight) {
          width = textWidth * -1;
          width++;
          stop = offset;
        } else {
          width--;
        }
        that.css(marqueeCss);
        go();
        return dfd.promise();
      };
    }())

    $(document).ready(function () {
      // the tab function
      $('.tabs-bar').each(function () {
        var $bar = $(this)
        var $theBlock = $(this).parents('.container').first()

        $(this).find('td').on('mouseover', function (ev) {
          ev.preventDefault()

          var tabVal = $(this).data('tabval')

          if (!$(this).hasClass('no-active-state')) {
            $(this).find('>a').addClass('active')
            $(this).siblings().find('>a').removeClass('active')
          }

          $theBlock
            .find('.tab_' + tabVal).removeClass('isHidden').removeClass('active')
            .siblings().not($bar).not('h1,h2')
            .addClass('isHidden')
        })

        $(this).find('td').first().trigger('mouseover')
      })
    })

    // the top slider effect.
    $(document).ready(function () {
      // banners are hidden by default to avoid "picture column" before the slick can takes over.
      $('.banner').show()
      // slider banner
      $('.banner-holder').slick({
        arrows: false,
        dots: true,
        fade: true,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 5500
      })

      // slider banner lower
      $('.lower-roller').marquee()

      // slider videos
      $('.featured-vids-row').slick({
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 3500,
        prevArrow: '<button type="button" class="slider-arrows arrows-prev fa fa-chevron-left fa_7"> </button>',
        nextArrow: '<button type="button" class="slider-arrows arrows-next fa fa-chevron-right fa_7"> </button>',
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [{
          breakpoint: 1200,
          settings: {
            arrows: false
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      })

      $('.featured-vids-row').css('overflow-x', 'visible')
    })

  })()
