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


/*==============================================================
When DOM is ready */
window.ready(function() {

/*--------------------------------------------------------------
Load and initialize simplelightbox — only on pages that actually
contain image links (avoids shipping ~50 kB of JS/CSS everywhere).
via https://simplelightbox.com/
--------------------------------------------------------------*/
if (document.querySelector('a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]')) {
	var lbBase = window.location.origin + '/scripts/simple-lightbox/';
	var lbCss = document.createElement('link');
	lbCss.rel = 'stylesheet';
	lbCss.href = lbBase + 'simple-lightbox.min.css';
	document.head.appendChild(lbCss);
	load_script(lbBase + 'simple-lightbox.min.js').then(() => {
		new SimpleLightbox('a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]', {
			closeText: '×',
			navText: ['←','→'],
			overlayOpacity: 1
		});
	}).catch((error) => { console.log('simple-lightbox failed to load: ' + error); });
}


/*--------------------------------------------------------------
Gadget #scroller behavior
--------------------------------------------------------------*/
(function(){
	if (document.body.contains(document.getElementById('scroller'))) {
		// if possible to scroll, indicate there is more
		if (window.scrollY == 0 && document.body.clientHeight > window.innerHeight) {
			document.getElementById('scroller').classList.add('down');
		}
		// check periodically for scroll position
		setInterval(function(){
			if (window.scrollY > 50) { // change gadget to scroll down
				document.getElementById('scroller').classList.remove('down');
				document.getElementById('scroller').classList.add('up');
			}
			else {
				if (document.body.clientHeight > window.innerHeight) { // change gadget to scroll up
					document.getElementById('scroller').classList.remove('up');
					document.getElementById('scroller').classList.add('down');
				}
				else { // hide gadget if not possible to scroll
					document.getElementById('scroller').classList.add('hidden');
				}
			}
		}, 1000);
		// hide when clicked
		document.getElementById('scroller').addEventListener('click', function(event){
			if (this.classList.contains('down')) { // move down
				window.scroll({
					top: window.innerHeight,
					behavior: 'smooth'
				});
				event.preventDefault();
				this.classList.remove('down');
				this.classList.add('up');
			}
			else { // return to top
				window.scroll({
					top: 0,
					behavior: 'smooth'
				});
				event.preventDefault();
			}
		});
	}
})();

/*--------------------------------------------------------------
Gadget #themer behavior
--------------------------------------------------------------*/
(function(){
	if (typeof themes !== 'undefined' && themes.length > 0 && (themer = document.getElementById('themer'))) {
		themer.classList.remove('hidden');
		var icurr = (themes.indexOf(theme) == -1?0:themes.indexOf(theme));
		var inext = (icurr == themes.length - 1?0:icurr + 1)
		document.querySelector('#themer > span').classList.add(...themes[inext].split(' '));

		themer.onclick = function() {
			var icurr = (themes.indexOf(theme) == -1?0:themes.indexOf(theme));
			var inext = (icurr == themes.length - 1?0:icurr + 1)
			var iaftr = (inext == themes.length - 1?0:inext + 1);

			document.documentElement.classList.remove(...theme.split(' '));
			document.documentElement.classList.remove(...themes[icurr].split(' '));
			document.documentElement.classList.add(...themes[inext].split(' '));
			document.querySelector('#themer > span').classList.remove(...themes[inext].split(' '));
			document.querySelector('#themer > span').classList.add(...themes[iaftr].split(' '));
			localStorage.setItem('theme', themes[inext]);
			theme = themes[inext];
			event.preventDefault();
		}
	}
})();

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
			index = 0;
			figures.forEach(function(figure) {
				var x = Math.floor(Math.random() * 3);
				var y = Math.floor(Math.random() * 3);
				var z = Math.random() * 2;

				figure.style.setProperty('--rand-x', 0);
				figure.style.setProperty('--rand-y', 0);
				figure.style.setProperty('--rand-z', z);
				figure.style.setProperty('--index', index);
				index = index + 1;
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

}); /* end DOM ready 
==============================================================*/