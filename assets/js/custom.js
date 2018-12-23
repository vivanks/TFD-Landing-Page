(function () {
    'use strict';
    //--------------------------------------------------
    // OWl Carousel Setup
    //--------------------------------------------------
    $(function(){
        $.scrollIt({
            upKey: 38,             // key code to navigate to the next section
            downKey: 40,           // key code to navigate to the previous section
            easing: 'linear',      // the easing function for animation
            scrollTime: 600,       // how long (in ms) the animation takes
            activeClass: 'active', // class given to the active nav element
            onPageChange: null,    // function(pageIndex) that is called when page is changed
            topOffset: -50           // offste (in px) for fixed top navigation
        });
    });

    //--------------------------------------------------
    // Preloader 
    //--------------------------------------------------
    jQuery(window).on("load", function () {
        $(".akar-loader").fadeOut("slow");
    });

        var wind = $(window);
    // navbar scrolling background
    wind.on("scroll",function () {
        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar"),
            footer = $(".footer"),
            header = $(".header");
        if(bodyScroll > 400){
            navbar.addClass("nav-scroll"),
            navbar.css("opacity","1"),
            footer.css("display", "block"),
            header.css("z-index", "-3");

        }else{
            navbar.removeClass("nav-scroll"),
            navbar.css("opacity","0"),
            footer.css("display", "none"),
            header.css("z-index", "-2");
        }
    });


    AOS.init({
        throttleDelay: 99,
        mirror: true,
    });


    //--------------------------------------------------
    // Owl Carousel
    //--------------------------------------------------
    $('.team .owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        mouseDrag:true,
        autoplay:false,
        dots: true,
        nav: false,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2
            },
            1000:{
                items:4
            }
        }
    });

    $('.testimonial .owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        mouseDrag:true,
        autoplay:false,
        dots: true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2
            },
            1000:{
                items:2
            }
        }
    });

    $('.portfolio .owl-carousel').owlCarousel({
        animateOut: 'zoomOut',
        animateIn: 'zoomIn',
        loop: true,
        margin: 30,
        mouseDrag:true,
        autoplay:false,
        dots: false,
        nav: false,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

    $('.partner .owl-carousel').owlCarousel({
        animateOut: 'zoomOut',
        animateIn: 'zoomIn',
        loop: true,
        margin: 70,
        mouseDrag:true,
        autoplay:false,
        dots: false,
        nav: false,
        responsiveClass:true,
        responsive:{
            0:{
                items:2,
                margin: 20,
            },
            600:{
                items:4
            },
            1000:{
                items:5
            }
        }
    });

    $('.portfolio-focus .owl-carousel').owlCarousel({
        loop: true,
        margin: 70,
        mouseDrag:false,
        autoplay:false,
        dots: false,
        nav: false,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                margin: 20,
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });


    //--------------------------------------------------
    // Custom Buttom
    //--------------------------------------------------
    var owl = $('.owl-carousel');
    owl.owlCarousel();
    // Go to the next item
    $('.customNextBtn').on("click", function() {
        owl.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('.customPrevBtn').on("click", function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        owl.trigger('prev.owl.carousel', [700]);
    })


    //--------------------------------------------------
    // Scroll control
    //--------------------------------------------------
    $(window).on("scroll", function(){
        $('.header').css("opacity", 1 - $(window).scrollTop() / 900),
        $('.footer').css("opacity", -2 + $(window).scrollTop() / 300);
    });


    //--------------------------------------------------
    // Pop up 
    //--------------------------------------------------
    $(document).ready(function() {
        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    });

    $.extend(true, $.magnificPopup.defaults, {  
        iframe: {
            patterns: {
            youtube: {
                index: 'youtube.com/', 
                id: 'v=', 
                src: 'http://www.youtube.com/embed/%id%?autoplay=1'
            }
            }
        }
    });




    //--------------------------------------------------
    // Portfolio (animate + owl Carousel)
    //--------------------------------------------------

    // add animate.css class(es) to the elements to be animated
    function setAnimation ( _elem, _InOut ) {
        // Store all animationend event name in a string.
        // cf animate.css documentation
        var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        _elem.each ( function () {
        var $elem = $(this);
        var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

        $elem.addClass($animationType).one(animationEndEvent, function () {
            $elem.removeClass($animationType); // remove animate.css Class at the end of the animations
        });
        });
    }

    // Fired before current slide change
    owl.on('change.owl.carousel', function(event) {
        var $currentItem = $('.owl-item', owl).eq(event.item.index);
        var $elemsToanim = $currentItem.find("[data-animation-out]");
        setAnimation ($elemsToanim, 'out');
    });

    // Fired after current slide has been changed
    var round = 0;
    owl.on('changed.owl.carousel', function(event) {

        var $currentItem = $('.owl-item', owl).eq(event.item.index);
        var $elemsToanim = $currentItem.find("[data-animation-in]");
        
        setAnimation ($elemsToanim, 'in');
    })
    
    owl.on('translated.owl.carousel', function(event) {
        console.log (event.item.index, event.page.count);
        
        if (event.item.index == (event.page.count - 1))  {
            if (round < 1) {
            round++
            console.log (round);
            } else {
            owl.trigger('stop.owl.autoplay');
            var owlData = owl.data('owl.carousel');
            owlData.settings.autoplay = false; //don't know if both are necessary
            owlData.options.autoplay = false;
            owl.trigger('refresh.owl.carousel');
            }
        }
    });


 }());
