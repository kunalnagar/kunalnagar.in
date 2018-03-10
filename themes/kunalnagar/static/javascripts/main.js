(function() {

	'use strict';

	var _interval = setInterval(function() {
		_checkIfGoogleAnalyticsLoaded();
	}, 100);

	var _loadCSSInterval = setInterval(function() {
		if(loadCSS !== undefined) {
			clearInterval(_loadCSSInterval);
			var _cssSource = document.getElementsByClassName('field-source-css')[0].value;
			loadCSS('https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,700,800');
			loadCSS(_cssSource);
		}
	}, 100);

	var _hljsInterval = setInterval(function() {
		if(hljs !== undefined) {
			clearInterval(_hljsInterval);
			hljs.initHighlightingOnLoad();
		}
	}, 100);

	function _checkIfGoogleAnalyticsLoaded() {
		if(window.ga && ga.create) {
			clearInterval(_interval);
			_addEventListeners();
		}
	};

	var _addClickEventListener = function(el, cb) {
		if(el !== null) {
			el.addEventListener('click', cb());
		}
	};

	function _addEventListeners() {
		_addClickEventListener(document.getElementById('btn_link_home'), function() {
			ga('send', { hitType: 'event', eventCategory: 'Link:Internal', eventAction: 'navigation', eventLabel: 'Link:Home' });
		});
		_addClickEventListener(document.getElementById('btn_link_current_job'), function() {
			ga('send', { hitType: 'event', eventCategory: 'Link:External', eventAction: 'navigation', eventLabel: 'Link:Current Job' });
		});
		_addClickEventListener(document.getElementById('btn_link_about'), function() {
			ga('send', { hitType: 'event', eventCategory: 'Link:Internal', eventAction: 'navigation', eventLabel: 'Link:About' });
		});
		_addClickEventListener(document.getElementById('btn_link_about'), function() {
			ga('send', { hitType: 'event', eventCategory: 'Link:Internal', eventAction: 'navigation', eventLabel: 'Link:Blog' });
		});
		_addClickEventListener(document.getElementById('btn_link_os'), function() {
			ga('send', { hitType: 'event', eventCategory: 'Link:External', eventAction: 'navigation', eventLabel: 'Link:Open Source' });
		});
		_addClickEventListener(document.getElementById('btn_link_linkedin'), function() {
			ga('send', { hitType: 'event', eventCategory: 'Link:External', eventAction: 'navigation', eventLabel: 'Link:LinkedIn' });
		});
		_addClickEventListener(document.getElementById('btn_link_twitter'), function() {
			ga('send', { hitType: 'event', eventCategory: 'Link:External', eventAction: 'navigation', eventLabel: 'Link:Instagram' });
		});
		_addClickEventListener(document.getElementById('btn_link_contact'), function() {
			ga('send', { hitType: 'event', eventCategory: 'Link:Internal', eventAction: 'navigation', eventLabel: 'Link:Contact' });
		});
		_addClickEventListener(document.getElementById('btn_link_resume'), function() {
			ga('send', { hitType: 'event', eventCategory: 'Link:External', eventAction: 'navigation', eventLabel: 'Link:Resume' });
		});
		_addClickEventListener(document.getElementById('btn_link_resume'), function() {
			ga('send', { hitType: 'event', eventCategory: 'Link:External', eventAction: 'navigation', eventLabel: 'Link:Resume' });
		});
		var _btnLinksBlogSingle = document.getElementsByClassName('btn-link-blog-single');
		if(_btnLinksBlogSingle.length > 0) {
			for(var i = 0; i < _btnLinksBlogSingle.length; i++) {
				_addClickEventListener(_btnLinksBlogSingle[i], function() {
					var blogUrl = _btnLinksBlogSingle[i].href;
					ga('send', { hitType: 'event', eventCategory: 'Link:Blog', eventAction: 'navigation', eventLabel: blogUrl});
				});
			}
		}
	};
})();

/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
(function(w){
	"use strict";
	/* exported loadCSS */
	var loadCSS = function( href, before, media ){
		// Arguments explained:
		// `href` [REQUIRED] is the URL for your CSS file.
		// `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
		// By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
		// `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
		var doc = w.document;
		var ss = doc.createElement( "link" );
		var ref;
		if( before ){
			ref = before;
		}
		else {
			var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
			ref = refs[ refs.length - 1];
		}

		var sheets = doc.styleSheets;
		ss.rel = "stylesheet";
		ss.href = href;
		// temporarily set media to something inapplicable to ensure it'll fetch without blocking render
		ss.media = "only x";

		// wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
		function ready( cb ){
			if( doc.body ){
				return cb();
			}
			setTimeout(function(){
				ready( cb );
			});
		}
		// Inject link
			// Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
			// Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
		ready( function(){
			ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
		});
		// A method (exposed on return object for external use) that mimics onload by polling document.styleSheets until it includes the new sheet.
		var onloadcssdefined = function( cb ){
			var resolvedHref = ss.href;
			var i = sheets.length;
			while( i-- ){
				if( sheets[ i ].href === resolvedHref ){
					return cb();
				}
			}
			setTimeout(function() {
				onloadcssdefined( cb );
			});
		};

		function loadCB(){
			if( ss.addEventListener ){
				ss.removeEventListener( "load", loadCB );
			}
			ss.media = media || "all";
		}

		// once loaded, set link's media back to `all` so that the stylesheet applies once it loads
		if( ss.addEventListener ){
			ss.addEventListener( "load", loadCB);
		}
		ss.onloadcssdefined = onloadcssdefined;
		onloadcssdefined( loadCB );
		return ss;
	};
	// commonjs
	if( typeof exports !== "undefined" ){
		exports.loadCSS = loadCSS;
	}
	else {
		w.loadCSS = loadCSS;
	}
}( typeof global !== "undefined" ? global : this ));