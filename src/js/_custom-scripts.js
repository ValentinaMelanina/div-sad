"use strict";

$(document).ready(function(){

    // Инициализация меню
        var menu = document.querySelector(".main-menu"),
            headerTopBar = document.querySelector(".header__top-bar");

    // Кнопка мобильного меню
        var forEach = function (t, o, r) {
            if ("[object Object]" === Object.prototype.toString.call(t))for (var c in t)Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t); else for (var e = 0, l = t.length; l > e; e++)o.call(r, t[e], e, t)
        };
        var hamburgers = document.querySelectorAll(".hamburger-main-menu");
        if (hamburgers.length > 0) {
            forEach(hamburgers, function (hamburger) {
                hamburger.addEventListener("click", function () {
                    this.classList.toggle("is-active");
                    menu.classList.toggle("active");
                    headerTopBar.classList.toggle("active");
                }, false);
            });
        }

    // Навигация по расписанию занятий
        var $tabs = $('.timetable');
        $tabs.responsiveTabs({
            collapsible: true,
            startCollapsed: false,
            active: 0
        });

    //	Инициализация счетчика обратного отсчета
    $('.event__counter').countdown($('.event__counter').attr('data-start-date'), function(event) {
        function declination(titles, number) {
            var cases = [2, 0, 1, 1, 1, 2];
            return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
        }
        var weeks = event.offset.weeks,
            days = event.offset.days,
            hours = event.offset.hours,
            minutes = event.offset.minutes;
        var ww = declination(['Неделя','Недели','Недель'], weeks),
            dd = declination(['День','Дня','Дней'], days),
            hh = declination(['Час','Часа','Часов'], hours),
            mm = declination(['Минута','Минуты','Минут'], minutes);
        var $this = $(this).html(event.strftime(''
             + '<div class="event__counter-wrap">'
                + '<div class="event__counter-number">' + weeks + '</div> '
                + '<div class="event__counter-text">' + ww + '</div> '
            +'</div> '
             + '<div class="event__counter-wrap">'
                + '<div class="event__counter-number">' + days + '</div> '
                + '<div class="event__counter-text">' + dd + '</div> '
            +'</div> '
             + '<div class="event__counter-wrap">'
                + '<div class="event__counter-number">' + hours + '</div> '
                + '<div class="event__counter-text">' + hh + '</div> '
            +'</div> '
             + '<div class="event__counter-wrap">'
                + '<div class="event__counter-number">' + minutes + '</div> '
                + '<div class="event__counter-text">' + mm + '</div> '
            +'</div> '
        ));
    });


    // Ресайз картинок
    var images = $('.img-cover'),
        parent = images.parent(),
        homeImageWidth = images.attr('data-width'),
        homeImageHeight = images.attr('data-height');

    $(window).resize(function() {
        calcReplacementHome();
        toggleResponsiveItemsHome();
    });

    function calcReplacementHome() {
        if (! Modernizr.csscalc) {
        }
    }

    function toggleResponsiveItemsHome() {

        if (images.attr('src') != '') {
            resizeHomeImages();
        }
    }

    function resizeHomeImages() {
        var i = homeImageWidth,
            j = homeImageHeight;
        if (parent.height() > images.height() || parent.width() < images.width()) {
            images.height(parent.height());
            var k = images.height() / j * 100;
            k = i / 100 * k;
            images.width(k);
        }
        if (parent.width() > images.width() || parent.height() < images.height()) {
            images.width(parent.width());
            k = images.width() / i * 100;
            k = j / 100 * k;
            images.height(k);
        }

        var l = parent.width() - images.width();
        l = Math.round(l / 2);
        k = parent.height() - images.height();
        k = Math.round(k / 2);
        images.css({top: k + 'px', left: l + 'px'});
    }

    toggleResponsiveItemsHome();

});




