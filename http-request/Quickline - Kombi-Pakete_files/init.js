jQuery(document).ready(function (cs2) {
    cs2('#locator_button').click(function(){
        var zipcode = cs2('#plz_oder_ort').val();

        var catA = new Array();
        cs2('input[name="cat[]"]:checked').each(function(index,val) {
            catA.push( cs2(this).val() );
        });

		cs2('#tx_locator_pi1_categories').val( catA.join(',') );

        cs2('#tx_locator_pi1_zipcode').val(zipcode);
        //cs2('#tx_locator_pi1_city').val(zipcode);
    });
	if(cs2('.tx-clipmediacenter').length > 0) {
		cs2('.owl-carousel').owlCarousel({
		    loop: true,
		    margin: 20,
		    stagePadding: 15,
		    nav: true,
			dots: false,
		    responsive: {
		      0: {
		        items: 2
		      },
		      480: {
		        items: 2
		      },
		      600: {
		        items: 3
		      },
		      1000: {
		        items: 4
		      }
		    }
		  });
	}

	//TvFeatures FCE
    cs2('.tv-features .feature-card').click(function() {
		cs2(this).closest('.tv-features').find('.feature-card__popup').fadeOut(300);
        cs2(this).next('.feature-card__popup').fadeIn(300);
    });

    cs2('.tv-features .feature-card__popup').click(function(){
        cs2(this).fadeOut(300);
    });

    //TvSupport FCE
    cs2('.tv-support .tv-support-button').on('click', function(){
        var selected = cs2(this).data('target');
        var element = cs2(this).data('element');
        cs2('.tv-support '+element+' .tv-support-button').removeClass('active');
        cs2(this).addClass('active');

        cs2(element+' .tv-support__content .button_content').hide();

        cs2(selected).fadeIn(300);

    });

    cs2('.tv-support .tv-support-button.active').click();

	jQuery(".button_customer a").click(function(e){
		// animate
		jQuery('html, body').animate({
			scrollTop: jQuery(this.hash).offset().top - 50
		}, 100, function(){});
	});

	//#63711 - because htmlboilerplate removed
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    if( isMobile.any() ) {
    	jQuery('html').addClass('touch');
	}else{
        jQuery('html').addClass('no-touch');
	}
});
