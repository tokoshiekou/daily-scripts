// ==UserScript==
// @name         Dcard Dark Mode
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  null
// @author       Tokoshiekou
// @match        https://www.dcard.tw/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const css = `
        body, html {
            background-color: #181817 !important;
            color: #d3d3d3 !important;
            --color-text-secondary: rgba(211, 211, 211, 0.1);
        }
        * :not(em):not(.d_gy_1x2esgu):not(.d_34_2q):not(.d_5s_28):not(.d_nf_1y):not(.dx53m09) {
            background-color: inherit !important;
            color: inherit !important;
            border-color: #181817 !important;
        }
        a {
            color: #d3d3d3 !important;
        }
        input, textarea, select, button {
            background-color: #181618 !important;
            color: #d3d3d3 !important;
            border: 1px solid #181817 !important;
        }
        input::placeholder, textarea::placeholder {
            color: #a9a9a9 !important;
        }
        img {
            filter: brightness(0.7) contrast(1.2) !important;
        }
        .pf9i80d::after {
            background-color: #3397CF !important;
        }
        .d_nf_1y, .rwqnao9, .lm8hbrk {
            --1m8iehv: inherit !important;
        }
        .d_xf_3b.d_ej_3b.d_9w_25.d_ao_8.d_10fpds0_1j.epy1cme.SVGIcon-module__er3F7q__svgIcon {
            fill: #d3d3d3 !important;
        }
        .p25mgcu {
            display: none;
        }
        nav[aria-labelledby="recently-visited-forum-title"], nav[aria-labelledby="selected-forum-title"] {
            display: none;
        }
    `;

    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

})();
