angular
  .module('userCenter.misc')
  .component('starRating', {
    template: require('./misc.star-rating.temp.html'),
    bindings: {
      'setScore': '&'
    },
    controller: [function () {
      var that = this
      this.$postLink = function () {
        var $ = angular.element

        $(document.querySelectorAll('.stars-rating i')).on('click', function () {
          var starNum = parseInt($(this).attr('data-starNum'))
          // stars that "follows" become solid colored star
          var followerQuerry = ''
          for (var i = 1; i <= starNum; i++) {
            var temp = '.star-' + i
            if (i + 1 <= starNum) {
              temp += ','
            }
            followerQuerry += temp
          }
          if (followerQuerry !== '') {
            var $follower = $(document.querySelectorAll(followerQuerry))
            $follower.removeClass('fa-star-o').addClass('fa-star')
          }
          // stars that "beyound" become hollow.
          var beyoundQuerry = ''
          for (var i = 5; starNum < i; i--) {
            var temp = '.star-' + i
            if (i - 1 > starNum) {
              temp += ','
            }
            beyoundQuerry += temp
          }
          if (beyoundQuerry !== '') {
            var $beyound = $(document.querySelectorAll(beyoundQuerry))
            $beyound.removeClass('fa-star').addClass('fa-star-o')
          }

          // debugger
          // call the parent method, set the star
          that.setScore({
            $event: {
              score: starNum * 2
            }
          })
        })
      }
    }]
  })
