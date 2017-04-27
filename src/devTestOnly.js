; (function () {
    var $wrapper = $('.page-contents-wrapper');

    $(document).ready(function () {
        $.get('/html/_header_footer/header.html').then(function (data) {
            $('.page-contents-wrapper').before(data);
        })

        $.get('/html/_header_footer/footer.html').then(function (data) {
            $('.page-contents-wrapper').after(data);
        })

    });
})();