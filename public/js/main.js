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
////////Anchor for footer links
private scrollToFragment(fragment: string): void {
  const element = document.getElementById(fragment);
  if (element) {
    const yOffset = -50; // Adjust this value based on your header height
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
}