/*
documentation: https://fancyapps.com/fancybox/3/docs/#setup

*/
jQuery(document).ready(function($) {
	$.ajax({
		cache: true,
		url: window.location.origin + '/scripts/fancybox/jquery.fancybox.min.js',
		dataType: 'script',
		success: function () {
			// $('.single article a[href*=".jpg"], .single article a[href*=".jpeg"], .single article a[href*=".png"], .single article a[href*=".gif"]').css({'background-image':'none','cursor':'zoom-in'});

			$('.single article').fancybox({
				selector : 'a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]',
				loop: true,
				buttons: [
					'slideShow',
					'close'
				],
			});
		}
	});
});
