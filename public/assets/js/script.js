(function ($) {
  "use strict";

  // Swiper Slider
  var initSlider = function () {
    $('.swiper-carousel').each(function () {
      var swiper = new Swiper(".swiper-carousel", {
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-carousel .swiper-right',
          prevEl: '.swiper-carousel .swiper-left',
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          300: { slidesPerView: 2 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1200: { slidesPerView: 3, spaceBetween: 30 },
        },
      });
    });

    $('.swiper-slideshow').each(function () {
      var swiper = new Swiper(".swiper-slideshow", {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 700,
        loop: true,
        navigation: {
          nextEl: '.swiper-slideshow .swiper-right',
          prevEl: '.swiper-slideshow .swiper-left',
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    });
  };

  // init Isotope
  var initIsotope = function () {
    $('.grid').each(function () {
      var $buttonGroup = $('.button-group');
      var $checked = $buttonGroup.find('.is-checked');
      var filterValue = $checked.attr('data-filter');

      var $grid = $('.grid').isotope({
        itemSelector: '.portfolio-item',
        filter: filterValue,
      });

      $grid.on('arrangeComplete', function () {
        // AOS.refresh(); // AOS niet gebruikt, verwijderd
      });

      $('.button-group').on('click', 'a', function (e) {
        e.preventDefault();
        filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
      });
    });
  };

  var initScrollNav = function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 200) {
      $('.bg-color').addClass("bg-secondary");
    } else {
      $('.bg-color').removeClass("bg-secondary");
    }
  };

  // init Chocolat light box
  var initChocolat = function () {
    if (typeof Chocolat !== 'undefined') {
      Chocolat(document.querySelectorAll('.image-link'), {
        imageSize: 'contain',
        loop: true,
      });
    }
  };

  // Overlay Menu Navigation
  var overlayMenu = function () {
    if (!$('.nav-overlay').length) return false;

    var body = document.querySelector('body');
    var menu = document.querySelector('.menu-btn');
    if (menu) {
      menu.addEventListener('click', function () {
        body.classList.toggle('nav-active');
      });
    }
  };

  $(document).ready(function () {
    initSlider();
    initScrollNav();
    overlayMenu();
    initChocolat();
    // AOS.init verwijderd, geen AOS gebruikt
  });

  $(window).load(function () {
    initIsotope();
  });

  $(window).scroll(function () {
    initScrollNav();
  });
})(jQuery);