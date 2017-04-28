  ;
  (function () {
    var validURl = '/api/oauth/registerdo.html'
    var beforeSubmitCheck = require('./parts/logon-submit')
    $(document).ready(function () {
      // the before login check function
      beforeSubmitCheck(validURl)

      $('.type-select').on('click', 'input:radio', function (ev) {
        var type = $(this).data('type')
        if (type === 1) {
          $('.new-account').show();
          $('.exist-account').hide();

        } else if (type === 2) {
          $('.new-account').hide();
          $('.exist-account').show();
        }
      })

    })

  })()