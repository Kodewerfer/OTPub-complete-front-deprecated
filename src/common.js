; (function () {
  $(document).ready(function () {
    $('body').on('click.dropdown', '.upper-dropdown>a', function (ev) {
      ev.preventDefault()

      $(this).parent('.upper-dropdown').find('.dropdown-sub').toggle()
    })
    // click on blank page toggle it off
    $('body').on('click.hideDropDown', function (ev) {
      var $target = $(ev.target)
      if (!$target.parents('.upper-dropdown').length) {
        $('.dropdown-sub').hide()
      }
    })
    // search box
    $('body').on('focus.search', '.search-input>input', function (ev) {
      ev.preventDefault()
      $(this).val('')
      $(this).css('color', '#616161')
    })
    // back to top button
    $('body').on('click.backToTop', '.btn-backToTop', function () {
      $('body,html').animate({
        scrollTop: 0
      })
    })
  })

  // recommand blocks
  $(document).ready(function () {
    $('.recommanded.recom-normal').on('click', '.recommanded-head .refresh', function (ev) {
      ev.preventDefault()
      $.ajax({
        type: 'GET',
        url: '/Course/List/like',
        async: true,
        dataType: 'json',

        success: function (data) {
          if (data.status = 'success') {
            $('.like-course').html(data.data)
          }
        }

      })
    })
  })
})()
