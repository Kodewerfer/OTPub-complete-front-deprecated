var vjs = window.videojs = require('videojs/video')
require('videojs/ie8/videojs-ie8.min')
require('videojs/video-js.css')
require('videojs-sublime-skin/dist/videojs-sublime-skin.min.css')

$(document).ready(function () {

  $('.flush.f-2').on('click', function () {
    if ($(this).hasClass('active')) {
      return;
    }
    $(this).addClass('active')
    vjs('specPlayer').play();
  })

  vjs('specPlayer').on('ended', function () {
    $('.flush.f-2').removeClass('active')
  })
})