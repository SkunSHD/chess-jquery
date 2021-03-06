/*global jQuery:false */
(function ($) {

	var wow = new WOW(
	  {
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       0,          // distance to the element when triggering the animation (default is 0)
		mobile:       false       // trigger animations on mobile devices (true is default)
	  }
	);
	wow.init();

	//jQuery to collapse the navbar on scroll
	$(window).scroll(function() {
		if ($(".navbar").offset().top > 50) {
			$(".navbar-fixed-top").addClass("top-nav-collapse");
			$(".top-area").addClass("top-padding");
			$(".navbar-brand").addClass("reduce");

			$(".navbar-custom ul.nav ul.dropdown-menu").css("margin-top","11px");

		} else {
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
			$(".top-area").removeClass("top-padding");
			$(".navbar-brand").removeClass("reduce");

			$(".navbar-custom ul.nav ul.dropdown-menu").css("margin-top","16px");

		}
	});


	function collapseNavbar() {
		$('.navbar-toggle').click();
	}

	$('.nav a').on('click', collapseNavbar);
	$('section').on('click', function() {
		if($('.navbar-collapse').css('display') !== 'none') {
			collapseNavbar();
		}
	});


	//scroll to top
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollup').fadeIn();
			} else {
			$('.scrollup').fadeOut();
		}
	});
	$('.scrollup').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 1000);
			return false;
	});
	


	//jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$('.navbar-nav li a').bind('click', function(event) {
			var $anchor = $(this);
			var nav = $($anchor.attr('href'));
			if (nav.length) {
			$('html, body').stop().animate({				
				scrollTop: $($anchor.attr('href')).offset().top				
			}, 1500, 'easeInOutExpo');
			
			event.preventDefault();
			}
		});
		$('.page-scroll a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
	});

	//nivo lightbox
	$('.gallery-item a').nivoLightbox({
		effect: 'fadeScale',                        // The effect to use when showing the lightbox
		theme: 'default',                           // The lightbox theme to use
		keyboardNav: true,                          // Enable/Disable keyboard navigation (left/right/escape)
		clickOverlayToClose: true,                  // If false clicking the "close" button will be the only way to close the lightbox
		onInit: function(){},                       // Callback when lightbox has loaded
		beforeShowLightbox: function(){},           // Callback before the lightbox is shown
		afterShowLightbox: function(lightbox){},    // Callback after the lightbox is shown
		beforeHideLightbox: function(){},           // Callback before the lightbox is hidden
		afterHideLightbox: function(){},            // Callback after the lightbox is hidden
		onPrev: function(element){},                // Callback when the lightbox gallery goes to previous item
		onNext: function(element){},                // Callback when the lightbox gallery goes to next item
		errorMessage: 'The requested content cannot be loaded. Please try again later.' // Error message when content can't be loaded
	});

    // add animation
    $.fn.extend({
        animateCss: function(animationName, callback) {
            var animationEnd = (function(el) {
                var animations = {
                    animation: 'animationend',
                    OAnimation: 'oAnimationEnd',
                    MozAnimation: 'mozAnimationEnd',
                    WebkitAnimation: 'webkitAnimationEnd',
                };

                for (var t in animations) {
                    if (el.style[t] !== undefined) {
                        return animations[t];
                    }
                }
            })(document.createElement('div'));

            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);

                if (typeof callback === 'function') callback();
            });

            return this;
        }
    });

	// Submit client message
    function postClientMessage(data, callback) {
        $.post(
            "https://chess-lessons-kiev.firebaseapp.com/sendemail",
            // "http://localhost:5000/chess-lessons-kiev/us-central1/sendemail", // debug mode
            data,
            'json'
        ).done(function (data) {
            // console.log('post ok! resp:', data);
            callback();
        });
	}

	function validateForm(formFields) {
        var isValid = formFields.every(function(formField) {
        	if(!formField.value.length) {
        		var warningEl = $('<span/>', {
        			text: 'Это поле обязательное для заполнения',
					class: "warning-" + formField.name,
					css: { color: 'darkRed' }
				}).animateCss('flipInX');

                var input;
                if(formField.name === 'contact') {
                    input = $("input[name='contact']");
				} else {
                    input = $("textarea[name='message']");
				}

				if(!$(".warning-" + formField.name).length) {
                    input.css('border-color', 'rgb(255, 0, 0)').after(warningEl);
                }

				// clean validation
                input.keypress(function() {
                    if(input.css('border-color') === 'rgb(255, 0, 0)') {
                        input.css('border-color', '');
					}
                    warningEl.remove();
                });
                return false;
            }
            return true;
        });

        return isValid;
	}

	function addAlert(submitBtn) {
        var closeSpan = $('<span>&times;</span>', {
            css: {
                size: '30px'
            }
        }).attr('aria-hidden', 'true');
        var closeBtn = $('<button/>', {
            class: 'close'
        }).attr({
            'data-dismiss': 'alert',
            'aria-label': 'Close'
        });
        var alert = $('<div/>',{
            class: 'alert alert-success alert-dismissible',
            text: 'Ваше сообщение успешно отправлено!'
        }).attr({
            role: 'alert'
        });

        closeBtn.append(closeSpan)
        alert.append(closeBtn);
        submitBtn.after(alert);
        submitBtn.remove();
	}

    $('#sendMessageButton').on('click', function(event) {
        event.preventDefault();
        var formData = $("form[name='sendEmail']").serializeArray();
        var isValid = validateForm(formData);
        if(!isValid) return;

        var $submitBtn = $(this).button('loading');

        var mappedFormData = {};
        formData.forEach(function(obj) {
            mappedFormData[obj.name] = obj.value;
		});

        postClientMessage(mappedFormData, function() {
            addAlert($submitBtn);
        });
    });


})(jQuery);
$(window).load(function() {
	$(".loader").delay(100).fadeOut();
	$("#page-loader").delay(100).fadeOut("fast");
});

	
