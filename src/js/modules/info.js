
var infoSection = {

    hoverElem: function() {
      const dataContainer = $('.info__data__container');
      const img = $('.info__more--photo');

      dataContainer.hover(function() {
        $(this).toggleClass('animated wobble');
      });

      img.hover(function() {
        $(this).toggleClass('animated rubberBand');
      });

    },

    slideToSection: function() {
        var info = $('#info'),
            offsetTop = info.offset().top,
            offsetBottom = offsetTop + info.outerHeight();

        $(window).on('scroll', function(e) {
            let offsetWindowTop = $(document).scrollTop();
            if (offsetWindowTop >= offsetTop && offsetWindowTop <= offsetBottom) {
                info.addClass('animated zoomIn');
                info.css('opacity', 1);
                info.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function() {
                  infoSection.counting();
                });
                $(window).off('scroll');
            }
        });
    },

    counting: function() {

        const $val = $('.info__data__container--number');

        $val.each(function() {
            var $this = $(this);

            $({
                counter: 0
            }).animate({
                counter: $this.text()
            }, {
                duration: 5000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.ceil(this.counter));
                }
            });

        });

    },

    init: function() {
        infoSection.slideToSection();
        infoSection.hoverElem();
    }

};
