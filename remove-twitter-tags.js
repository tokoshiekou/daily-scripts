// ==UserScript==
// @name         Remove Specific Links
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove a tags with specific href attributes on page load
// @author       Tokoshiekou
// @match        https://x.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
	// Remove redundant tags from Twitter navigation bar
  const hrefsToRemove = [
      '/i/verified-orgs-signup',
      '/i/premium_sign_up',
      '/i/grok',
      '/settings/monetization',
      '/jobs',
      '/i/monetization',
      '/messages',
      '/<YOURUSERNAME>/communities',
      '/<YOURUSERNAME>/lists',
      '/i/chat',
      'https://ads.x.com/?ref=gl-tw-tw-twitter-ads-rweb',
      '/i/spaces/start'
  ];

  const deleEleArray = [
      // Remove right side prime ad
      '.css-175oi2r.r-1kqtdi0.r-1q9bdsx.r-rs99b7',
      // Remove Icon
      '.css-175oi2r.r-dnmrzs.r-1559e4e',
      // Remove Gork
      '.css-175oi2r.r-105ug2t.r-1867qdf.r-qo02w8.r-13awgt0.r-1ce3o0f.r-1udh08x.r-u8s1d.r-13qz1uu.r-173mn98.r-1e5uvyk.r-5zmot.r-j7xza8.r-rs99b7.r-12jitg0',
      // Remove authentication badge from personal page
      '.css-175oi2r.r-1habvwh.r-eqz5dr.r-uaa2di.r-1mmae3n.r-3pj75a.r-bnwqim',
      // Remove home search bar
      '.r-1hycxz.r-136ojw6.r-ipm5af.r-1xcajam.r-1vsu8ta.r-1a8r3js.r-1iud8zs.r-18u37iz.r-kemksi.r-aqfbo4.r-1awozwy.css-175oi2r',
      // Remove gork in post
      'button[aria-label="Grokのアクション"]'
  ];

  function changeSpecificLinks() {
      document.querySelectorAll('a').forEach(link => {
          if (hrefsToRemove.includes(link.getAttribute('href'))) {
              link.style.display = 'none';
          }
      });
  }

  function removeFirstChild(selector) {
      var parentElement = document.querySelector(selector);

      if (parentElement && parentElement.firstChild) {
          parentElement.firstChild.style.display = 'none';
      }
  }

  function removeElement(eleArrays) {
      eleArrays.forEach(item => {
          let ele = document.querySelector(item);
          if (ele) ele.style.display = 'none';
      })
  }


  const observer = new MutationObserver(() => {
      // Change left side navigation bar's actions
      changeSpecificLinks();

      removeElement(deleEleArray);
  });

  observer.observe(document.body, {
      childList: true,
      subtree: true
  });

})();