jQuery(document).ready(function($) {

/*--------------------------------------------------------------
Initialize fancybox
via https://simplelightbox.com/
--------------------------------------------------------------*/

var lightbox = new SimpleLightbox('a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]', {
	/* options */
});


/*--------------------------------------------------------------
Hide back #totop if at top of page
--------------------------------------------------------------*/

setInterval(function(){
	if (window.scrollY == 0) {
		document.getElementById('totop').style.color = 'rgba(var(--text-color),0)';
	}
	else {
		document.getElementById('totop').style.color = 'rgba(var(--text-color),1)';
	}
	// console.log("scrolled to first"); // DEBUG
}, 3000);
document.getElementById('totop').addEventListener('click', function(){
	this.style.color = 'rgba(var(--text-color),0)';
});


/*--------------------------------------------------------------
Stacked image galleries
inspired from https://viewfromthisside.superhi.com/
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


	// update gallery with current index
	$(this).attr('data-current', 1);

	// add class to top figure (once)
	$(this).find('figure:first-child').addClass('top');

	// on click show next slide, or clicked slide if not on top
	images.on('click', function () {
		// console.log(index,index_current, images.length);

		index = $(this).data('index');

		z = z + 1;

		if ( index == index_current ) {
			if (index_current + 1 > images.length - 1) { index_current = 0;	}
			else { index_current = index_current + 1; }

			$( images[index_current] ).css('z-index', z);
		}
		else {
			$( images[index] ).css('z-index', z);
			index_current = index;
		}

		// add class to current figure, remove from all others
		$( images ).removeClass('top');
		$( images[index_current] ).addClass('top');

		// update gallery with current index
		$(this).parent().attr('data-current', index_current + 1);

		// animate
		slideAnimation();
	});

/*	images.on('click', function () {
		// console.log(index,index_current, images.length);
		index = 0;
		z = z + 1;

		if (index_current + 1 > images.length - 1) { index_current = 0;	}
		else { index_current = index_current + 1; }

		$( images[index_current] ).css('z-index', z);

		// add class to current figure, remove from all others
		$( images ).removeClass('top');
		$( images[index_current] ).addClass('top');

		// update gallery with current index
		$(this).parent().attr('data-current', index_current + 1);

		// animate
		slideAnimation();
	});*/


	//animate
	slideAnimation();
});
// end image gallery


/*--------------------------------------------------------------
EXPERIMENTAL
Scrollbar width
gets scrollbar width nd sets a CSS variable to accomodate for 100vw bug
--------------------------------------------------------------*/
/*function scrollbarWidth() {
	let width = window.innerWidth - document.querySelector('body').clientWidth;
	document.querySelector('body').style.setProperty('--scrollbar-width', `${width}px`);
	// console.log(width); // DEBUG
}

scrollbarWidth();
window.addEventListener('resize', scrollbarWidth);*/


/*--------------------------------------------------------------
EXPERIMENTAL
skew everything based on mouse position
--------------------------------------------------------------*/
/*var t=document.getElementsByTagName('main')[0];
document.documentElement.onmousemove=function(e){t.style.webkitTransform=t.style.transform='rotate3d(10, 180, -6, '+e.pageX/-20+'deg)';};*/

}); // end document ready