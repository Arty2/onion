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

	var images = $(this).find('figure');

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

	$(this).find('figure:first-child').addClass('top');

	// on click show next slide, or clicked slide if not on top
	images.on('click', function () {
		console.log(index,index_current, images.length);

		index = $(this).data('index');

		z = z + 1;

		if ( index == index_current) {
			if (index_current + 1 > images.length - 1) { index_current = 0;	}
			else { index_current = index_current + 1; }

			$( images[index_current] ).css('z-index', z);

			$( images ).removeClass('top');
			$( images[index_current] ).addClass('top');
		}
		else {
			$( images[index] ).css('z-index', z);
			index_current = index;
			
			$( images ).removeClass('top');
			$( images[index] ).addClass('top');
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
/*
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
*/

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