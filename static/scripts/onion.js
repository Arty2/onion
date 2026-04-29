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
	const lbBase = window.location.origin + '/scripts/simple-lightbox/';
	const lbCss = document.createElement('link');
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
	const scroller = document.getElementById('scroller');
	if (!scroller) return;

	const update = function() {
		if (window.scrollY > 50) {
			scroller.classList.remove('down');
			scroller.classList.add('up');
		}
		else if (document.body.clientHeight > window.innerHeight) {
			scroller.classList.remove('up');
			scroller.classList.add('down');
		}
		else {
			scroller.classList.add('hidden');
		}
	};

	update();
	window.addEventListener('scroll', update, { passive: true });

	scroller.addEventListener('click', function(event){
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
})();

/*--------------------------------------------------------------
Gadget #themer behavior
--------------------------------------------------------------*/
(function(){
	const themer = document.getElementById('themer');
	if (typeof themes === 'undefined' || themes.length === 0 || !themer) return;

	themer.classList.remove('hidden');
	const icurrInit = themes.indexOf(theme) === -1 ? 0 : themes.indexOf(theme);
	const inextInit = icurrInit === themes.length - 1 ? 0 : icurrInit + 1;
	document.querySelector('#themer > span').classList.add(...themes[inextInit].split(' '));

	themer.onclick = function(event) {
		const icurr = themes.indexOf(theme) === -1 ? 0 : themes.indexOf(theme);
		const inext = icurr === themes.length - 1 ? 0 : icurr + 1;
		const iaftr = inext === themes.length - 1 ? 0 : inext + 1;

		document.documentElement.classList.remove(...theme.split(' '));
		document.documentElement.classList.remove(...themes[icurr].split(' '));
		document.documentElement.classList.add(...themes[inext].split(' '));
		document.querySelector('#themer > span').classList.remove(...themes[inext].split(' '));
		document.querySelector('#themer > span').classList.add(...themes[iaftr].split(' '));
		try { localStorage.setItem('theme', themes[inext]); } catch (e) { /* Safari Private Mode throws on localStorage access */ }
		theme = themes[inext];
		event.preventDefault();
	};
})();

/*--------------------------------------------------------------
Piled image galleries
inspired from https://viewfromthisside.superhi.com/
--------------------------------------------------------------*/

(function(){
	const galleries = document.querySelectorAll('div.gallery');
	galleries.forEach(function(element, index){
		let index_current = 0;
		let index = 0;
		let z = 1;

		const figures = element.querySelectorAll('figure');

		figures.forEach(function(figure) {
			figure.setAttribute('data-index', index);
			index = index + 1;
		});

		const slideAnimation = function() {
			index = 0;
			figures.forEach(function(figure) {
				const x = Math.floor(Math.random() * 3);
				const y = Math.floor(Math.random() * 3);
				const z = Math.random() * 2;

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