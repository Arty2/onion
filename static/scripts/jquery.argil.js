jQuery(document).ready(function($) {

/*--------------------------------------------------------------
Initialize fancybox
based on https://viewfromthisside.superhi.com/
--------------------------------------------------------------*/

$('.single article').fancybox({
	selector : 'a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]',
	loop: true,
	buttons: [
		'slideShow',
		'close'
	],
});
// end fancybox

/*--------------------------------------------------------------
Stacked image galleries
based on https://viewfromthisside.superhi.com/
--------------------------------------------------------------*/

$('div.gallery').each( function() {

	// on load, rotate and translate all the images
	var index_current = 0;
	var index = 0
	var z = 1;

	var images = $(this).find('img');

	images.each( function() {
		$(this).data('index', index);
		index = index + 1;
	});

	var slideAnimation = function() {
		images.each( function() {
			const x = Math.floor(Math.random() * 5) * 25 - 50;
			const y = Math.floor(Math.random() * 5) * 25 - 50;
			const deg = Math.random() * 5 - 2.5;

			$(this).css('transform', `translate(${x}px, ${y}px) rotate(${deg}deg)`);
		});
	};

	// on click, show next slide


	// $(this).on('click', function() {		
	// 	if (index_current + 1 > images.length - 1) {
	// 		index_current = 0;
	// 	}
	// 	else {
	// 		index_current = index_current + 1;
	// 	}

	// 	$( images[index_current] ).css('z-index', z);
	// });

	images.on('click', function () {
		console.log(index,index_current, images.length);

		index = $(this).data('index');

		z = z + 1;

		if ( index == index_current) {
			if (index_current + 1 > images.length - 1) { index_current = 0;	}
			else { index_current = index_current + 1; }

			$( images[index_current] ).css('z-index', z);
		}
		else {
			$( images[index] ).css('z-index', z);
			index_current = index;
		}

		slideAnimation();
	});

	slideAnimation();
});
// end image gallery



/*--------------------------------------------------------------
Thread lines - Work in progress
via https://anseki.github.io/leader-line/
--------------------------------------------------------------*/

var linestyles = {
		// middleLabel: LeaderLine.pathLabel({text: 'LABEL', outlineColor: 'rgb(var(--page-color))' }),
		gradient: {
			startColor: 'rgba(var(--accent-color),0.2)',
			endColor: 'rgba(var(--accent-color),0)'
		},
		color: 'rgba(var(--accent-color),0.8)',
		// path: 'arc',
		// path: 'magnet',
		// dash: {len: 2, gap: 5},
		startSocket: 'bottom',
		endSocket:   'top',
		size: 1,
		startPlug: 'disc',
		endPlug: 'behind',
		// endPlug: 'arrow2',
		// startPlugSize: 2,
		// endPlugSize:   2,
	};

var start = 0;
var points = $('article[data-tags*="tag-verse"] pre');

points.each(function(i, start){
	points.each(function(j, end){
		if (i < j) {
			var line = new LeaderLine(
					LeaderLine.pointAnchor(start, {x: '50%', y: '100%'}),
					LeaderLine.pointAnchor(end  , {x: 0, y: 0}),
					linestyles
				);
			// console.log('pairs:', i, j); // DEBUG
		}
	});
});
// end thread lines

/*--------------------------------------------------------------
Drag scrollable
based on https://github.com/lx-s/jquery.dragscrollable/ (this fork has touch events)
--------------------------------------------------------------*/
/*$.ajax({
	cache: true,
	url: '/scripts/jquery.dragscrollable.js',
	dataType: 'script',
	success: function() {
		// console.log('jquery.dragscrollable.js has loaded');
		// if ($( 'main' ).hasClass( 'home' )) {
			$( '.cards' ).wrapInner( '<div class="wrapper"></div>' );
		// }
		// $( '.cards .wrapper' ).css('transform', 'translateZ(0)'); // change CSS stacking order
		$( '.cards .wrapper' ).dragscrollable( {dragSelector: 'article', allowY: false} );
	},
	error: function() { console.log('jquery.dragscrollable.js not loaded') }
});*/
// end Drag scrollable


/*--------------------------------------------------------------
scrollify
via https://github.com/lukehaas/Scrollify
--------------------------------------------------------------*/
/*$.ajax({
	cache: false,
	url: '/scripts/jquery.scrollify.js',
	dataType: 'script',
	success: function() {
		$.scrollify({
			section : '.slide',
			updateHash : false,
			after: function() {
				// disable on last slide
				if ($.scrollify.current().hasClass('fullwidth')){
					$('html, body').animate({
						scrollTop: $( $('.slide:last ~ *')[0] ).offset().top
					}, 1100);
					
					$.scrollify.disable();
				}
			},
		});

		// disable if outside of active slide area

		$(document).on('scroll resize touchstart', function() {
			var safeheight = (( $('.slide').length - 1 ) * $(window).height());

			if ($(document).scrollTop() > safeheight && !$.scrollify.isDisabled()) {
				$.scrollify.disable();
				// console.log('disabled');
			}
			// else if ($(document).scrollTop() < (( $('.slide').length - 2 ) * $(window).height()) && $.scrollify.isDisabled()) {
			// 	$.scrollify.enable();
			// 	$.scrollify.update();
			// 	$.scrollify.next();
			// 	console.log('enabled');
			// }
		});
	},
	error: function() { console.log('jquery.scrollify.js not loaded') }
});*/
// end scrollify


// $('head').append('<link>');
// var css = $('head').children(':last');
// css.attr({ rel: 'stylesheet', type: 'text/css', href: './styles.css' });


/*--------------------------------------------------------------
thumbnail follow
--------------------------------------------------------------*/
/*$( '.articles-list.columned article' ).on( 'mouseover', function() {
	var thumb = $( this ).find( '.thumbnail' );
	thumb.addClass( 'active' );

	$(document).on( 'mousemove', function(event) {
		var mouseX = event.clientX + 10;
		var mouseY = event.clientY + 10;

		// thumb.css({
		// top: mouseY,
		// left: mouseX
		// })
	});

	$( this ).on( 'mouseout', function() {
		thumb.removeClass( 'active' );
		// this unbind should be more specific
		$(document).off( 'mousemove' );
	});
});*/
// end img follow

// skew everything based on mouse position
// var t=document.getElementsByTagName('main')[0];document.documentElement.onmousemove=function(e){t.style.webkitTransform=t.style.transform='rotate3d(10, 180, -6, '+e.pageX/-20+'deg)';};


}); // end document ready