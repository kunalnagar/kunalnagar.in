(function() {

	'use strict';

	var _interval = setInterval(function() {
		_checkIfGoogleAnalyticsLoaded();
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