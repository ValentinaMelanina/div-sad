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

    // Анимация для модального окна
    var closeBtnModal = $('.popup__close-btn'),
        popup = $('.popup'),
        openBtnModal = $('.popup-open'),
        activeClass = 'active',
        animationOpen = 'zoomIn',
        animationClose = 'bounceOut';

    openBtnModal.click(function(){
        popup.addClass(animationOpen + ' ' + activeClass).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass(animationOpen);
        });
    });

    closeBtnModal.click(function(){
        popup.addClass(animationClose).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            popup.removeClass(animationClose + ' ' + activeClass);
        });
    });


    // Кнопка наверх
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }




    // Step 1: Create jQuery plugin
// ============================

    $.fn.fancyMorph = function( opts ) {

        var Morphing = function( $btn, opts ) {
            var self = this;

            self.opts = $.extend({
                animationEffect : false,
                infobar    : false,
                buttons    : ['close'],
                smallBtn   : false,
                touch      : false,
                baseClass  : 'fancybox__news',
                slideClass : 'fancybox-slide__news',
                afterClose : function() {
                    self.close();
                }
            }, opts);

            self.init( $btn );
        };

        Morphing.prototype.init = function( $btn ) {
            var self = this;

            self.$btn = $btn.addClass('morphing-btn');

            self.$clone = $('<div class="morphing-btn-clone" />')
                .hide()
                .insertAfter( $btn );

            // Add wrapping element and set initial width used for positioning
            $btn.wrap( '<span class="morphing-btn-wrap"></span>' ).on('click', function(e) {
                e.preventDefault();

                self.start();
            });

        };

        Morphing.prototype.start = function() {
            var self = this;

            if ( self.$btn.hasClass('morphing-btn_circle') ) {
                return;
            }

            // Set initial width, because it is not possible to start CSS transition from "auto"
            self.$btn.width( self.$btn.width() ).parent().width( self.$btn.outerWidth() );

            self.$btn.off('.fm').on("transitionend.fm webkitTransitionEnd.fm oTransitionEnd.fm MSTransitionEnd.fm", function(e) {

                if ( e.originalEvent.propertyName === 'width' ) {
                    self.$btn.off('.fm');

                    self.animateBg();
                }

            }).addClass('morphing-btn_circle');

        };

        Morphing.prototype.animateBg = function() {
            var self = this;

            self.scaleBg();

            self.$clone.show();

            // Trigger repaint
            self.$clone[0].offsetHeight;

            self.$clone.off('.fm').on("transitionend.fm webkitTransitionEnd.fm oTransitionEnd.fm MSTransitionEnd.fm", function(e) {
                self.$clone.off('.fm');

                self.complete();

            }).addClass('morphing-btn-clone_visible');
        };

        Morphing.prototype.scaleBg = function() {
            var self = this;

            var $clone = self.$clone;
            var scale  = self.getScale();
            var $btn   = self.$btn;
            var pos    = $btn.offset();

            $clone.css({
                top       : pos.top  + $btn.outerHeight() * 0.5 - ( $btn.outerHeight() * scale * 0.5 ) - $(window).scrollTop(),
                left      : pos.left + $btn.outerWidth()  * 0.5 - ( $btn.outerWidth()  * scale * 0.5 ) - $(window).scrollLeft(),
                width     : $btn.outerWidth()  * scale,
                height    : $btn.outerHeight() * scale,
                transform : 'scale(' + ( 1 / scale ) + ')'
            });
        };

        Morphing.prototype.getScale = function() {
            var $btn    = this.$btn,
                radius  = $btn.outerWidth() * 0.5,
                left    = $btn.offset().left + radius - $(window).scrollLeft(),
                top     = $btn.offset().top  + radius - $(window).scrollTop(),
                windowW = $(window).width(),
                windowH = $(window).height();

            var maxDistHor  = ( left > windowW / 2 ) ? left : ( windowW - left ),
                maxDistVert = ( top > windowH / 2 )  ? top  : ( windowH - top );

            return Math.ceil(Math.sqrt( Math.pow( maxDistHor, 2 ) + Math.pow( maxDistVert, 2 ) ) / radius );
        };

        Morphing.prototype.complete = function() {
            var self = this;
            var $btn = self.$btn;

            // $.fancybox.open({ src : $btn.data('src') || $btn.attr('href') }, self.opts);

            $.fancybox.open({
                src : $btn.data('src') || $btn.attr('href'),
                href: $btn.data('src'),
                // type: 'ajax',
                // ajax : {
                //     preload : true
                // }
            }, self.opts);



            $(window).on('resize.fm', function() {
                //self.scaleBg();
            });
        };

        Morphing.prototype.close = function() {
            var self   = this;
            var $clone = self.$clone;

            self.scaleBg();

            $clone.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
                $clone.hide();

                self.$btn.removeClass('morphing-btn_circle');
            });

            $clone.removeClass('morphing-btn-clone_visible');

            $(window).off('resize.fm');
        };

        // Init
        this.each(function() {
            var $this = $(this);

            if ( !$this.data("morphing") ) {
                $this.data( "morphing", new Morphing( $this, opts ) );
            }

        });

        return this;
    };


// Step 2: Start using it!
// =======================

    // $("[data-morphing]").fancyMorph({
    //     hash : 'morphing'
    // });

    $("[data-fancybox__news]").fancyMorph({
        hash : 'morphing',
        type: 'ajax',
        ajax : {
            preload : true
        }
    });

});





