cs2 = jQuery.noConflict();

jQuery(window).load(function(){

    jQuery('.row.equal').each(function(){

        var highestBox = 0;
        jQuery(this).find('.teaserbox-container').each(function(){
            if(jQuery(this).height() > highestBox) {
                //console.log(jQuery(this).height()+'px');
                highestBox = jQuery(this).height();
            }
        });

        jQuery(this).find('.teaserbox-container').height(highestBox);

//https://forge.cs2.ch/issues/41134

        if(jQuery(this).find('.oneProductQline2').length > 1){

            var highestBoxQP2 = 0;
            jQuery(this).find('.oneProductQline2').each(function(){
                if(jQuery(this).height() > highestBoxQP2) {
                    highestBoxQP2 = jQuery(this).height();
                }
            });

            jQuery(this).find('.oneProductQline2').height(highestBoxQP2);

        }


//https://forge.cs2.ch/issues/41134
        if(jQuery(this).find('.card.mt-5').length > 1){
            var highestBoxQP2xx = 0;
            jQuery(this).find('.card.mt-5').each(function(){
                if(jQuery(this).height() > highestBoxQP2xx) {
                    highestBoxQP2xx = jQuery(this).height();
                }
            });

            jQuery(this).find('.card.mt-5').height(highestBoxQP2xx);

        }

    });

    jQuery('.row.equal > .sizer-item,.original > .innerwrap,.no-flexbox .flexcontainer, .row.equal .whiteshadowbox').matchHeight();


});

jQuery(document).ready(function(cs2) {

    /* Swiper start*/


    var autoplay = 4500;
    var sliderSpeed = 1200;
    var firstSlide = true;

    function bulletProgress(slidetime) {

        //reset progressbars
        jQuery('.swiper-pagination-bullet > .progress-bar').attr('style', 'width:'+ 0 + '%;');

        var width = 1;
        var id = setInterval( function() {
                if (width >= 100) {
                    clearInterval(id);
                } else {
                    width++;
                    jQuery('.swiper-pagination-bullet-active > .progress-bar').attr('style', 'width:'+ width + '%;');
                }
            },
            slidetime
        );
    }

    var homeSlider = new Swiper('.top-slider', {
        pagination: '.slider-pagination',
        paginationClickable: true,
        setWrapperSize: true,
        nextButton: '.btn-next',
        prevButton: '.btn-prev',
        spaceBetween: 0,
        autoHeight: false,
        virtualTranslate: true,
        effect: 'fade',
        speed: sliderSpeed,
        autoplay: autoplay,
        autoplayDisableOnInteraction: false,
        loop: true,
        paginationType: 'bullets',
        paginationBulletRender: function (swiper, index, className) {
            return '<span class="' + className + '" slide="'+ (index + 1) +'"><div id="bullet-slide-' + (index + 1) + '"  class="progress-bar" style="width:0%" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></span>';
        },
        watchSlidesProgress: true,
        onSlideChangeStart: function (swiper, progress) {
            if(firstSlide === true) {
                bulletProgress( autoplay / 100 );
                firstSlide = false;
            } else {
                bulletProgress((autoplay + sliderSpeed) / 100);
            }

            jQuery('video','.swiper-slide').each(function(){
                jQuery(this).get(0).pause();
            });

            var index = swiper.realIndex+1;
            var videoobj = jQuery('video','.swiper-slide:eq('+index+')');

            if(videoobj.length > 0){
                jQuery(videoobj).get(0).play();
            }

        }
    });

    var deviceSlider = new Swiper('#device-slider', {
        pagination: '.slider-pagination',
        paginationClickable: true,
        nextButton: '.btn-next',
        prevButton: '.btn-prev',
        slidesPerView: 3,
        spaceBetween: 0,
        freeMode: true,
        breakpoints: {
            480: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 2
            }
        }
    });


    jQuery(".swiper-container").hover(function(){
        //console.log(homeSlider.activeIndex)
    }, function(){

    });

    /* Swiper end*/

    //resizefce();

    cs2('select').each(function(){
        seleclabel ='';
        if(!cs2('option:eq(0)',this).val()) {
            seleclabel = cs2('option:eq(0)',this).text();
            cs2('option:eq(0)',this).remove();
        }
        cs2(this).selecter({
            "label": seleclabel
        });
    });

    cs2('select').each(function(){
        if(cs2(this).find('option').size() == 1) {
            cs2(this).selecter("disable");
            cs2(this).next().addClass('hidden-chevron');
        }
    });
    cs2('input[type=checkbox], input[type=radio]').each(function() {
		if (cs2(this).parents('.tx-quicklineproducts3').length === 0) {
			cs2(this).picker();
		}
	});

    cs2("#TSFE_ADMIN_PANEL_FORM input[type=checkbox]").picker("destroy");

    /* Helper FCE */

    cs2(".help-button-in").click(function(){
        cs2(".help-text").addClass("show");
        cs2(".help-close").show(100);
    });

    cs2(".help-close").click(function(){
        cs2(".help-text").removeClass("show");
        cs2(".help-close").hide(100);
    });

    /*https://forge.cs2.ch/issues/41134*/
    //resizeWhitebox();

});


function resizeProductBox() {
    cs2('.size0').each(function(index){
        cs2(this).parents('.tab-pane').css('display','block');
        $ppar = cs2(cs2(this).data('parent'));
        cs2('.price',$ppar).removeClass('pdown');
        cs2('.productbox',$ppar).height('auto');
        $pbox = cs2(this).height()-32;
        cs2(cs2('.productbox',$ppar).get().reverse()).each(function(index,item) {
            $space = 32*(index+1);
            cs2(item).height($pbox+$space);
            cs2('.price',cs2(item)).addClass('pdown');
        });
        cs2(this).parents('.tab-pane').css('display','');
        cs2(this).parents('.tab-pane.active').show();
    });
}

function resizefce() {
    jQuery('.row.equal').each(function(){
        jQuery(this).find('.teaserbox-container,.whiteshadowbox,.csc-uploads-element>.iteminside').height('auto');
        var highestBox = 0;
        var highestUpBox = 0;
        var boxTop = jQuery(this).find('.teaserbox-container:first,.whiteshadowbox:first').offset();
        var eqs = jQuery(this).find('.teaserbox-container:not(:empty),.whiteshadowbox:not(:empty)').filter(function(){
            var curoffset = jQuery(this).offset();
            return (curoffset.top == boxTop.top);
        });
        eqs.each(function(e,item){
            if(jQuery(item).height() > highestBox) {
                highestBox = jQuery(item).height();
            }
        });
        eqs.height(highestBox);
        jQuery(this).find('.teaserbox-container:not(:empty)').height(highestBox);

        var ups = jQuery(this).find('.csc-uploads-element>.iteminside:not(:empty)');
        ups.each(function(e,item){
            if(jQuery(item).height() > highestUpBox) {
                highestUpBox = cs2(item).height();
            }
        });
        ups.height(highestUpBox);
    });
    jQuery('.row.equal > .sizer-item,.original > .innerwrap,.no-flexbox .flexcontainer').matchHeight();
}

function resizeWhitebox() {
    jQuery('.row.equal').each(function(){

        var highestBox = 0;
        jQuery(this).find('.whiteshadowbox').each(function(){

            if(jQuery(this).height() > highestBox) {
                highestBox = jQuery(this).height();
            }

        });

        jQuery(this).find('.whiteshadowbox').height(highestBox);

    });
}


function format(state) {
    var originalOption = state.element;
    return cs2(originalOption).prop('text') + state.text;
}


