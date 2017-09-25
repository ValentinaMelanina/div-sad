"use strict";

// Инициализация меню

var menu = document.querySelector(".main-menu"),
    headerTopBar = document.querySelector(".header__top-bar");

// Кнопка мобильного меню
var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};
var hamburgers = document.querySelectorAll(".hamburger");
if (hamburgers.length > 0) {
    forEach(hamburgers, function(hamburger) {
        hamburger.addEventListener("click", function() {
            this.classList.toggle("is-active");
            menu.classList.toggle("active");
            headerTopBar.classList.toggle("active");
        }, false);
    });
}


// Навигация по расписанию занятий
$(document).ready(function () {
    var $tabs = $('#timetable-navigation');
    $tabs.responsiveTabs({
        rotate: false,
        startCollapsed: 'accordion',
        collapsible: 'accordion',
        setHash: true
    });
});


