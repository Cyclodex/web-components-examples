jQuery(document).ready(function() {

	jQuery('input[name="cat[]"]').on('click',function(index,val) {
//		if(jQuery(this).is(':checked')) {
			jQuery('form[name="locator"]').submit();
//		}
	});

	/* workaround :-( */
	jQuery('div#main').addClass('store-locator');
  
	/* Google Maps / Vertriebspartner */
	jQuery('a.ShowTheMarker').click(function(e){
		e.preventDefault();

		var ALink = jQuery(this);
		var MarkerID = parseInt(ALink.data('gmid'));

		/* close all previously opened windows */
		jQuery.each(infoWindow,function( intIndex, objValue ){
			if( objValue ){ objValue.close(); }
		});

		google.maps.event.trigger(marker[MarkerID],'click');
		marker[MarkerID].setMap(map);
		map.setZoom(13);
	
		/* jump to the map ... */
		window.location.href = window.location.href.replace(/#map/,'')+'#map';
		
	});

	jQuery('div#MapsGoBacktoSearch').click(function(){
		var href = window.location.href.replace(/#map/i,'');
		var rand = String(Math.random()).replace(/0\./,'');
		window.location.href = href+'?' + rand;
	});
	
	jQuery('input#plz_oder_ort').change(function(e){
		jQuery('input#plz_oder_ort').removeClass('error');
	});

	var zip = jQuery('#tx_locator_pi1_zipcode').val();
	var city = jQuery('#tx_locator_pi1_city').val();
	if(zip){
		jQuery('#plz_oder_ort').val(zip);
	} else if(city) {
		jQuery('#plz_oder_ort').val(city);
	}


	jQuery('form[name="locator"]').submit(function(e){

		var cz = jQuery('input#plz_oder_ort');
		var czval = cz.val().replace(/(^\s+)|(\s+$)/g,''); /* trim function 8-) */
		var catA = new Array();
		jQuery('input[name="cat[]"]:checked').each(function(index,val) { 
			catA.push( jQuery(this).val() );
		});
		jQuery('#tx_locator_pi1_categories').val( catA.join(',') );
	//	console.log( jQuery('#tx_locator_pi1_categories').val() );
		
		//if( czval.length < 2 ){
		//	cz.addClass('error');
		//	e.preventDefault();
		//}else{
			var zipMatch = czval.match(/^[0-9]+$/);
			
			if( zipMatch && czval.length==4 ){
				jQuery('#tx_locator_pi1_zipcode').val( czval );
			}
			if( zipMatch && czval.length != 4 ){
				cz.addClass('error');
				e.preventDefault();
			}
			if( !zipMatch ){
				jQuery('#tx_locator_pi1_city').val( czval );
			}
		
		//}

// e.preventDefault();

	});
	
});

$ = jQuery.noConflict();