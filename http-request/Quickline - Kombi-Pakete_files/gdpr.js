var gdprFormId;
!function($){
	$('.gdpr-check').each(function(){
		$check = $(this);
		$form = $check.closest('form');
		$cegdprFormId = $(this).parents().prev('a[id^="c"]:first').prop('id').substring(1);
		$submit = $form.find('[type="submit"]');
		$submit.on('click',function(){
			gdprFormId = $cegdprFormId;
			if($check.is(':checked')) {
				saveFormConsent($form);
				return false;
			}
		});
	})
}(jQuery);
