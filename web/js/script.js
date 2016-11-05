$(function() {

	// check if we have a flash message
	var flash = $('#flash');

	var hasFlash = 0;

	// set flag and hide content
	if ( flash.length ) {
		$('#home').css( "display" , "none" );
		hasFlash = 1;
	}

	var current = '#home';

	// click functionn needed for animation end
	flash.click(function(e) {

		if(!flash.hasClass("flashAnime")){
		    $(flash).addClass("flashAnime");
		 }

		flash.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {

			flash.remove();

			$('#home').css( "display" , "table" );

			$('#home').animate({
				opacity: 1,
			}, 250);
		  });
	});

	// click if flash
	if ( hasFlash ) {
		$('#home').css( "opacity" , 0 );
		flash.click();
	}


	// handle link clicks
	$(".menu li a").click(function(e) {

		if ( $("#top").length ) {
			$("#top").remove();
		}

		e.preventDefault();

		var old = current;

		current = '#' + $(this).text().toLowerCase();

		$(current).css( "opacity" , 0 );


		$(old).animate({
			opacity: 0,
		}, 250, function() {
			// Animation complete.
			$(old).css( "display" , "none" );

			$(current).css( "display" , "table" );

			$(current).animate({
				opacity: 1,
			}, 250);


			$(current).css( "display" , "table" );

			setTimeout(function() {


				// if scroll add link to top
				if ( $(document).height() > $(window).height()  ) {

					if ( ! $("#top").length ) {
						var top = $("<div/>").attr('id', 'top').html("<i class='icon-up-open-big'></i>");
						$(current + " .cell").append(top);
					}
				}
			}, 100);

	    });

	});

	// handle link clicks
	$(document).on("click","#top",function(e) {

	    if ($("html").scrollTop()) {
	        $("html").animate({ scrollTop: 0 }, "slow");
	    }
	    else {
	        $("body").animate({ scrollTop: 0 }, "slow");
	    }

	});


    /**
     * -- Animation
     */

    var windowWidth;
    var lineLength;
    var barHeight;
    var contentWidth;


    var speed = 0.1;
    var count = 0;

    var line = $("#hline");
    var line1 = $("#hline1");
    var line2 = $("#hline2");
    var root = $("#root");
    var branch1 = $("#branch1");
    var branch2 = $("#branch2");
    var bar = $("#bar");

    var lineTimer,
        lineTimer2,
        lineTimer3,
        rootTimer,
        barTimer,
        branch1Timer,
        branch2Timer
        ;

    function drawLine() {
        if (lineLength < 20 ) {
            count = 0;
            drawRoot();
            return;
        }
       count++;
       line.css('width' , count * 4);
       if (count > lineLength / 4) {
           count = 0;
           drawRoot();
           return;
       }
       lineTimer = setTimeout(drawLine, speed);
    }

    function drawRoot() {
        count++;
        root.css('width' , count * 1);
        if (count > 10) {
           count = 0;
           drawBar();
           return;
        }
        rootTimer = setTimeout(drawRoot, 20);
    }

    function drawBar() {
        count++;
        bar.css('height' , count * 1);
        bar.css('margin-top' , -count / 2);
        if (count >= barHeight) {
            count = 0;
            drawBranch1();
            return;
        }
        barTimer = setTimeout(drawBar, speed);
    }

    function drawBranch1() {
       count++;
       branch1.css('width' , count * 1);
       branch2.css('width' , count * 1);
       if (count > 10) {
           count = 0;
           drawLine2();
           return;
       }
       branchTimer = setTimeout(drawBranch1, speed);
    }

    function drawLine2() {
       count++;
       line1.css('width' , count * 3);
       line2.css('width' , count * 3);
       if (count > 920 / 4) {
           return;
       }
       lineTimer2 = setTimeout(drawLine2, speed);
    }

    function resetAnim() {
        clearTimeout(lineTimer);
        clearTimeout(lineTimer2);
        clearTimeout(lineTimer3);
        clearTimeout(rootTimer);
        clearTimeout(barTimer);
        clearTimeout(branch1Timer);
        clearTimeout(branch2Timer);

        count = 0;
        line.css('width' , 0);
        line.css('margin-left' , -lineLength);
        line1.css('width' , 0);
        line2.css('width' , 0);
        root.css('width' , 0);
        bar.css('height' , 0);
        branch1.css('width' , 0);
        branch2.css('width' , 0);
    }

    function config() {

        windowWidth = window.innerWidth;

        barHeight = 100;
        contentWidth = 300;

        if (windowWidth >= 700) {
            barHeight = 200;
            contentWidth = 500;
        }

        lineLength = ((window.innerWidth - contentWidth) / 2) - 20; // -20 margin

    }

    config();


    resetAnim();


    // start the cycle
    drawLine();

    /*
    *  on resize
    */
    var timer;

    $(window).resize(function() {

        if(timer) {
            window.clearTimeout(timer);
        }

        timer = window.setTimeout(function() {

            count = 0;
            config();
            resetAnim();
            drawLine();
        }, 30);
    });

});
