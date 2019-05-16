/*
 * jQuery dragscrollable Plugin
 * version: 1.1 (31-May-2016)
 * version: 2 (2018)
 * Copyright (c) 2009 Miquel Herrera
 * Modified 2016 by Alexander Steinhöfer
 * Modified 2018 by Heracles Papatheodorou ( https://heracl.es/ )
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;(function($){ // secure $ jQuery alias

/**
* Adds the ability to manage elements scroll by dragging
* one or more of its descendant elements. Options parameter
* allow to specifically select which inner elements will
* respond to the drag events.
*
* options properties:
* ------------------------------------------------------------------------
*  dragSelector         | jquery selector to apply to each wrapped element
*                       | to find which will be the dragging elements.
*                       | Defaults to '>:first' which is the first child of
*                       | scrollable element
* ------------------------------------------------------------------------
*  acceptPropagatedEvent| Will the dragging element accept propagated
*                      | events? default is yes, a propagated mouse event
*                      | on a inner element will be accepted and processed.
*                      | If set to false, only events originated on the
*                      | draggable elements will be processed.
* ------------------------------------------------------------------------
*  preventDefault       | Prevents the event to propagate further effectivey
*                       | dissabling other default actions. Defaults to true
* ------------------------------------------------------------------------
*
*  usage examples:
*
*  To add the scroll by drag to the element id=viewport when dragging its
*  first child accepting any propagated events
* $('#viewport').dragscrollable();
*
*  To add the scroll by drag ability to any element div of class viewport
*  when dragging its first descendant of class dragMe responding only to
*  evcents originated on the '.dragMe' elements.
* $('div.viewport').dragscrollable({dragSelector:'.dragMe:first',
*                           acceptPropagatedEvent: false});
*
*  Notice that some 'viewports' could be nested within others but events
*  would not interfere as acceptPropagatedEvent is set to false.
*
*/
$.fn.dragscrollable = function( options ){
	var settings = $.extend({
		dragSelector:'>:first',
		acceptPropagatedEvent: true,
		preventDefault: true,
			// Hovav:
			allowY: true
		}, options || {});

	var position = { left: 0, top: 0 };
	var min = { left: 0, top: 0 };
	var padding = { x: 0, y: 0 };

	var dragscroll= {
		startDrag: function(event, x, y) {
			// Initial coordinates will be the last when dragging
			event.data.lastCoord = {left: x, top: y};
		},
		doDrag: function(event, x, y) {
			// How much did the mouse move?
			var delta = {
				left: (x - event.data.lastCoord.left),
				top: ((settings.allowY) ? y - event.data.lastCoord.top : 0)
			};

			speed = 1.5;
			margin = 50;
			position.left = position.left + delta.left * speed;
			padding.x = parseInt($( event.data.scrollable ).css('padding-left')) + parseInt($( event.data.scrollable ).css('padding-right'));
			min.left = -1 * ( event.data.scrollable.prop('scrollWidth') - event.data.scrollable.width() ) + padding.x;

			if ( position.left > 0 ) {
				// adds some inertia
				if ( position.left > margin ) {
					position.left = margin;
				}
				setTimeout(function(){
					position.left = 0;
					event.data.scrollable.css('transform', 'translateX(' + position.left + 'px)');
				}, 300);
			} else if ( position.left < min.left ) {
				// position.left = min.left;
				// adds some inertia
				if ( position.left < min.left - margin ) {
					position.left = min.left - margin;
				}
				setTimeout(function(){
					position.left = min.left;
					event.data.scrollable.css('transform', 'translateX(' + position.left + 'px)');
				}, 300);
			}
			
			event.data.scrollable.css('transform', 'translateX(' + position.left + 'px)');

			// // original code
			// event.data.scrollable.scrollLeft(
			// 				event.data.scrollable.scrollLeft() - delta.left);
			// event.data.scrollable.scrollTop(
			// 				event.data.scrollable.scrollTop() - delta.top);

			// Save where the cursor is
			event.data.lastCoord={ left: x, top: y };
		},

		/* Touch */
		touchStartHandler: function(event) {
			var touch = event.originalEvent.touches[0];
			dragscroll.startDrag(event, touch.pageX, touch.pageY);

			$(document).on('touchend', event.data, dragscroll.touchEndHandler);
			$(document).on('touchcancel', event.data, dragscroll.touchEndHandler);
			$(document).on('touchmove', event.data, dragscroll.touchMoveHandler);
		},
		touchMoveHandler: function(event) {
			var touch = event.originalEvent.touches[0];
			dragscroll.doDrag(event, touch.pageX, touch.pageY);
		},
		touchEndHandler: function(event) {
			$(document).off('touchend', dragscroll.touchEndHandler);
			$(document).off('touchcancel', dragscroll.touchEndHandler);
			$(document).off('touchmove', dragscroll.touchMoveHandler);
		},

		/* Mouse */
		mouseDownHandler : function(event) {
			// mousedown, left click, check propagation
			if (event.which != 1 || (!event.data.acceptPropagatedEvent && event.target != this)){
				return false;
			}

			dragscroll.startDrag(event, event.clientX, event.clientY);

			$(document).on('mouseup', event.data, dragscroll.mouseUpHandler);			
			$(document).on('mousemove', event.data, dragscroll.mouseMoveHandler);

			if (event.data.preventDefault) {
				event.preventDefault();
				return false;
			}
		},
		mouseMoveHandler : function(event) { // User is dragging
			dragscroll.doDrag(event, event.clientX, event.clientY);

			if (event.data.preventDefault) {
				event.preventDefault();
				return false;
			}
		},
		mouseUpHandler : function(event) { // Stop scrolling
			$(document).off('mouseup', dragscroll.mouseUpHandler);			
			$(document).off('mousemove', dragscroll.mouseMoveHandler);

			if (event.data.preventDefault) {
				event.preventDefault();
				return false;
			}
		}
	}

	// set up the initial events
	this.each(function() {
		// closure object data for each scrollable element
		var data = {
			scrollable : $(this),
			acceptPropagatedEvent : settings.acceptPropagatedEvent,
			preventDefault : settings.preventDefault
		};
		// Set mouse initiating event on the desired descendant
		$(this).find(settings.dragSelector).on('mousedown',  data, dragscroll.mouseDownHandler);
		$(this).find(settings.dragSelector).on('touchstart', data, dragscroll.touchStartHandler);

		// momentum-like transition hack, jaggy because left changes too often
		// $(this).css('overflow-x', 'hidden');
		$(this).css('transition', 'transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)');
		// $(this).css('transition', 'transform 0.5s cubic-bezier(0.64, 0.57, 0.67, 1.53)');
		// $(this).css('overscroll-behavior-x', 'contain');
		// to-do: create a wrapper for the scrollable element and set overflow-x to hidden
	});
}; //end plugin dragscrollable


})( jQuery ); // confine scope
