// video
$(document).ready(function() {
    $(".jquery-background-video").hide();
    $(".video_image").show();
    setTimeout(function() {
      $(".jquery-background-video").show();
      $(".video_image").hide();
    }, 13000);
});

// Sticky
$(window).scroll(function() {
	if ($(this).scrollTop() > 1){  
			$('.header__sec').addClass("sticky");
	}
	else{
			$('.header__sec').removeClass("sticky");
	}
});

// Scroll to Top
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {     
        $('#return-to-top').fadeIn(200); 
    } else {
        $('#return-to-top').fadeOut(200);
    }
});
$('#return-to-top').click(function() {   
    $('body,html').animate({
        scrollTop : 0                    
    }, 500);
});

// Offcanvas
$(document).ready(function () {
  var offcanvasEl = $('#offcanvasExample');
  offcanvasEl.on('show.bs.offcanvas', function () {
    $('html').css({
      'overflow': 'hidden',
      'padding-right': '0px'
    });
  });
  offcanvasEl.on('hidden.bs.offcanvas', function () {
    $('html').css({
      'overflow': '',
      'padding-right': ''
    });
  });
});

// Fancybox
function initFancybox() {
  $('[data-fancybox="gallery"]').fancybox({
    buttons: [
      'zoom',
      'slideShow',
      'thumbs',
      'close'
    ],
    loop: true,
    transitionEffect: 'fade'
  });
}

// FAQ Accordion
$(document).ready(function () {
  $('.accordion').on('show.bs.collapse', function (e) {
    $(e.target).closest('.accordion-item').addClass('active');
  });

  $('.accordion').on('hide.bs.collapse', function (e) {
    $(e.target).closest('.accordion-item').removeClass('active');
  });
});
