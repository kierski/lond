
var menu = {

  scrollNav: function(items, a) {
    const elems = Array.from(document.querySelectorAll( items ));
    const links = Array.from(document.querySelectorAll( a ));
    const $body = $("html, body");

    links.forEach(panel => panel.addEventListener('click', showSection));

    // Show clicked section
    function showSection(e) {
      e.preventDefault();

      let hash = this.getAttribute('href');
      let section = document.querySelector(hash);

      scrollToSection(section);
    }

    // jQuery animate scroll
    function scrollToSection(section) {
      $body.animate({scrollTop: section.offsetTop}, 850, 'easeInOutBack');
    }
  },

  animateNav: function() {
    const nav = document.querySelector('.nav');
    const navHeight = nav.clientHeight;

    document.addEventListener('scroll', function() {
      let navOffset = nav.getBoundingClientRect().top  + window.scrollY;
      if (navOffset >= navHeight * 2) {
        nav.classList.add('nav__animate--scroll');
      } else {
        nav.classList.remove('nav__animate--scroll');
      }
    });
  },

  animateBar: function() {

    const hamburger = document.querySelector('.nav__bar--hamburger');
    const nav = document.querySelector('.nav');

    hamburger.addEventListener('mouseover', showList);
    nav.addEventListener('mouseleave', hiddenList);

    function showList() {
      hamburger.classList.add('nav__bar--hamburger.animate');
      document.querySelector('.nav__bar--list').classList.add('nav__animate--list');
    }

    function hiddenList() {
      hamburger.classList.remove('nav__bar--hamburger.animate');
      document.querySelector('.nav__bar--list').classList.remove('nav__animate--list');
    }

  },

  arrow: function() {
    const arrow = document.querySelector('.header__arrow');
    const sectionBelowOffset = $('#header').next().offset().top;
    arrow.addEventListener('click', function(e) {
      e.preventDefault();
      $('body').animate({scrollTop: sectionBelowOffset}, 850, 'easeInOutBack');
    });
  },

  init: function() {
    menu.scrollNav('.onepage', '.nav__bar--list a');
    menu.animateNav();
    menu.animateBar();
    menu.arrow();
  }

};
