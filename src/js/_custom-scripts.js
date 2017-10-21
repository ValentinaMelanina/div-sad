"use strict";

$(document).ready(function(){

    // Инициализация меню
        var menu = document.querySelector(".main-menu"),
            headerTopBar = document.querySelector(".header__top-bar");

    // Кнопка мобильного меню
        var forEach = function (t, o, r) {
            if ("[object Object]" === Object.prototype.toString.call(t))for (var c in t)Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t); else for (var e = 0, l = t.length; l > e; e++)o.call(r, t[e], e, t)
        };
        var hamburgers = document.querySelectorAll(".hamburger");
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

    //	Инициализация счетчика
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
            + '<span>' + weeks + ww + '</span> '
            + '<span>' + days + dd +'</span> '
            + '<span>' + hours + hh +'</span> '
            + '<span>' + minutes + mm +'</span> '
        ));
    });

});


