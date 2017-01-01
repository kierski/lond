
var introSection = {

  intro: function() {
    var offsetTop = $('#intro').offset().top;
    var navHeight = $('.nav').height();
    var intro = $('#intro');

    $(window).on('scroll', function(e) {
      let offsetWindowTop = $(document).scrollTop();
      if ( offsetWindowTop >= (offsetTop - navHeight) ) {
        intro.css({
          'margin-top': 0,
          'padding-top': (navHeight * 2) + 'px'
        }).addClass('animated jello');
      } else if (true) {
        intro.removeClass('animated jello');
        intro.css({
          'margin-top': '2em',
          'padding-top': 0
        });
      }
    });
  },

  features: function() {
    var box = $('.intro__features__box');
    box.hover(function() {
      $(this).toggleClass('animated tada');
    });
  },

  init: function() {
    introSection.intro();
    introSection.features();
  }

};
