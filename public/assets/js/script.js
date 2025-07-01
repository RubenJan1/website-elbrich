$(document).ready(function() {
  // Scroll Animation
  $(window).scroll(function() {
    $('.section').each(function() {
      if ($(this).isInViewport()) {
        $(this).addClass('visible');
      }
    });
  });

  // Lightbox for Portfolio
  $('.portfolio-item img').on('click', function() {
    const src = $(this).attr('src');
    const lightbox = $('<div class="lightbox"><img src="' + src + '"><span class="close">×</span></div>');
    $('body').append(lightbox);
    lightbox.show();

    $('.close').on('click', function() {
      lightbox.remove();
    });

    $(document).on('click', function(e) {
      if (!$(e.target).closest('.lightbox img').length) {
        lightbox.remove();
      }
    });
  });

  // Check if element is in viewport
  $.fn.isInViewport = function() {
    const elementTop = $(this).offset().top;
    const elementBottom = elementTop + $(this).outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };
});