/*--------------------------------------------------------------
Vanilla jQuery(document).ready
--------------------------------------------------------------*/
function ready(fn) {
	if (document.readyState != 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

/*--------------------------------------------------------------
Load script
based on https://stackoverflow.com/a/55451823
--------------------------------------------------------------*/
function load_script(url) {
	return new Promise(function(resolve, reject) {
		let script = document.createElement("script");
		script.onerror = reject;
		script.onload = resolve;
		if (document.currentScript) {
			document.currentScript.parentNode.insertBefore(script, document.currentScript);
		}
		else {
			document.head.appendChild(script)
		}
		script.src = url;
	});
}


/*--------------------------------------------------------------
When DOM is ready */
window.ready(function() {

/*--------------------------------------------------------------
Load and initialize simplelightbox
via https://simplelightbox.com/
--------------------------------------------------------------*/

load_script(window.location.origin + '/scripts/simple-lightbox/simple-lightbox.min.js').then(() => {
	var lightbox = new SimpleLightbox('a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]', {
		/* options */
	});
}).catch((error) => { console.log('simplelightbox failed to load: ' + error); });


/*--------------------------------------------------------------
Gadget #scroller behavior
--------------------------------------------------------------*/

if (document.body.contains(document.getElementById('scroller'))) {
	// if possible to scroll, indicate there is more
	if (window.scrollY == 0 && document.body.clientHeight > window.innerHeight) {
		document.getElementById('scroller').classList.add('down');
	}
	// check periodically for scroll position
	setInterval(function(){
		if (window.scrollY > 0) { // change gadget to scroll down
			// document.getElementById('scroller').style.color = 'rgba(var(--text-color),1)';
			document.getElementById('scroller').classList.remove('hide');
			document.getElementById('scroller').classList.remove('down');
			document.getElementById('scroller').classList.add('up');
		}
		else {
			// document.getElementById('scroller').style.color = 'rgba(var(--text-color),0)';
			if (document.body.clientHeight > window.innerHeight) { // change gadget to scroll up
				document.getElementById('scroller').classList.remove('up');
				document.getElementById('scroller').classList.add('down');
			}
			else { // hide gadget if not possible to scroll
				document.getElementById('scroller').classList.add('hide');
			}
		}
	}, 2000);
	// hide when clicked
	document.getElementById('scroller').addEventListener('click', function(event){
		// this.style.color = 'rgba(var(--text-color),0)';
		if (this.classList.contains('down')) { // move down
			document.getElementById('scroller').classList.remove('down');
			document.getElementById('scroller').classList.add('up');
			window.scroll({
				top: window.innerHeight,
				behavior: 'smooth'
			});
			event.preventDefault();
		}
		else { // return to top
			this.classList.add('hide');
			window.scroll({
				top: 0,
				behavior: 'smooth'
			});
			event.preventDefault();
		}
	});
}


/*--------------------------------------------------------------
Gadget #theme-toggle behavior
--------------------------------------------------------------*/

if (document.body.contains(document.getElementById('theme-toggle'))) {
	var themetoggle = document.getElementById('theme-toggle');

	// update icon if the theme is already dark
	if ( (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches || document.body.classList.contains('scheme-dark')) && !document.body.classList.contains('scheme-light') ) {
		themetoggle.innerHTML = '◑';
	}

	// toggle light / dark scheme manually
	themetoggle.onclick = function() {
		if ( (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) || document.body.classList.contains('scheme-light') ) {
			document.querySelector('body').classList.toggle('scheme-light');
		} else {
			document.querySelector('body').classList.toggle('scheme-dark');
		}

		// toggle the icon accordingly
		if (this.innerHTML == '◑') {
			this.innerHTML = '◐';
		} else {
			this.innerHTML = '◑';
		}
	}
}

/*--------------------------------------------------------------
EXPERIMENTAL
Lazyload transition
based on https://plainjs.com/javascript/manipulation/wrap-an-html-structure-around-an-element-28/
--------------------------------------------------------------*/

/*var lazyimages = document.querySelectorAll('img[loading=lazy]');
lazyimages.forEach(function(img){
	var wrapper = document.createElement('span');
	img.parentNode.insertBefore(wrapper, img);
	wrapper.appendChild(img);
	wrapper.classList.add('lazyloader');
	// wrapper.style.outline = "2px dashed red";
	img.addEventListener('load', function(event){
		// wrapper.style.opacity = 0;
	});
});
*/

/*--------------------------------------------------------------
Piled image galleries
inspired from https://viewfromthisside.superhi.com/
--------------------------------------------------------------*/

(function(){
	var galleries = document.querySelectorAll('div.gallery');
	galleries.forEach(function(element, index){
		var index_current = 0;
		var index = 0;
		var z = 1;

		var figures = element.querySelectorAll('figure');

		figures.forEach(function(figure) {
			figure.setAttribute('data-index', index);
			index = index + 1;
		});

		var slideAnimation = function() {
			figures.forEach(function(figure) {
				const x = Math.floor(Math.random() * 2);
				const y = Math.floor(Math.random() * 2);
				const deg = Math.random() * 5 - 2.5;

				// figure.style.transform = 'translate('+x+'px, '+y+'px) rotate('+deg+'deg)';
				figure.style.setProperty('--rand-x', x);
				figure.style.setProperty('--rand-y', y);
				figure.style.setProperty('--rand-deg', deg);
			});
		};

		// update gallery with current index
		element.setAttribute('data-current', 1);

		// add class to top figure (once)
		element.querySelector('figure:first-child').classList.add('top');

		// on click show next slide, or clicked slide if not on top
		figures.forEach(function(figure) {
			figure.addEventListener('click', function () {
				index = figure.getAttribute('data-index');
				z = z + 1;

				// console.log(index,index_current,figures.length);
				if ( index == index_current ) {
					if (index_current*1 + 1 > figures.length - 1) { index_current = 0;	}
					else { index_current = index_current*1 + 1; }

					figures[index_current].style.zIndex = z;
				}
				else {
					figures[index].style.zIndex = z;
					index_current = index;
				}

				// add class to current figure, remove from all others
				figures.forEach(function(fig) {
					fig.classList.remove('top');
				});
				figures[index_current].classList.add('top');

				// update gallery with current index
				this.parentNode.setAttribute('data-current', index_current*1 + 1);

				// animate
				slideAnimation();
			});
		});

		//animate
		slideAnimation();
	});
})();


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

}); /* end DOM ready 
--------------------------------------------------------------*/