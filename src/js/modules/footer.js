var footer = {

    selectedField: function() {
        var formInput = $('.footer__form__control--input');

        formInput.on('click', function() {
            var that = $(this),
                siblings = that.siblings('.footer__form__control--label');
            siblings.addClass('animated bounce footer__form__control--label-animated');
        });

    },

    social: function() {
      var ico = $('.footer__social--ico');
      ico.addClass('animated');
      ico.hover(function() {
        $(this).toggleClass('swing');
      });
    },

    animationSection: function() {
        var footer = $('#footer .footer__content'),
            offsetTop = footer.offset().top,
            offsetBottom = offsetTop + footer.outerHeight();
        footer.addClass('animated');

        window.addEventListener('scroll', function(e) {
            let offsetWindowTop = $(document).scrollTop();
            if (offsetWindowTop >= offsetTop) {
                footer.addClass('fadeIn');
                footer.removeClass('fadeOut');
                footer.css('opacity', 1);
            } else {
                footer.addClass('fadeOut');
                footer.removeClass('fadeIn');
            }
        });
    },

    init: function() {
        footer.selectedField();
        footer.social();
        footer.animationSection();
    }

};
