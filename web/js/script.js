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

    var windowWidth, lineLength, barHeight, contentWidth;

    var line = $("#hline");
    var line1 = $("#hline1");
    var line2 = $("#hline2");
    var lines = $("#hline1, #hline2");
    var root = $("#root");
    var branch1 = $("#branch1");
    var branch2 = $("#branch2");
    var branches = $("#branch1, #branch2");
    var bar = $("#bar");

    function drawLine() {

        if (lineLength < 20 ) {
            drawRoot();
            return;
        }

        line.velocity(
        {
            width: lineLength
        },
        {
            duration: 1000,
            complete: function() {
                $("#atinfo").css('color', '#ddd')
                drawRoot();
            }
        });
    }

    function drawRoot() {

        root.velocity(
          {
            width: 10
          },
          {
            duration: 200,
            complete: function() {
               drawBar();
            }
          }
        );
    }

    function drawBar() {

        bar.velocity(
        {
            height: barHeight,
            "margin-top" : -(barHeight / 2)
        },
        {
            duration: 500,
            complete: function() {
                drawBranches()
            }
        }
        );
    }

    function drawBranches() {

        branches.velocity(
          {
            width: 10
          },
          {
            duration: 100,
            complete: function() {
               $("#text1, #text2").css('color', '#ccc');
               drawLines();
            }
          }
        );
    }

    function drawLines() {

        lines.velocity(
        {
            width: lineLength
        },
        {
            duration: 1000,
            complete: function() {
                var point = $("<div>", {id: "point"});
                line.append(point);
                drawPointInLine()
            }
        });
    }

    function drawPointInLine() {

        var point = $("#point");

        point.velocity(
        {
            translateX: lineLength - 30
        },
        {
            duration: 600,
            easing: "linear",
            complete: function() {
                point.remove();

                $("#atinfo").css('color', '#0072BC')

                var div = $("<div>", {id: "point"});
                div.css('width', 0);
                div.css('left', 0);
                $("#root").append(div);
                drawPointInRoot();
            }
        });
    }

    function drawPointInRoot() {

        var point = $("#point");

        point.velocity(
        {
            width: 10
        },
        {
            duration: 300,
            easing: "linear",
            complete: function() {
                point.remove();

                var div = $("<div>", {id: "point"});
                div.css('width', 2);
                div.css('height', 10);
                div.css('left', 0);
                div.css('top', (barHeight / 2) - 5);

                var div2 = $("<div>", {id: "point2"});
                div2.css('width', 2);
                div2.css('height', 10);
                div2.css('left', 0);
                div2.css('top', (barHeight / 2) - 5);


                $("#bar").append(div, div2);

                drawPointInBar();
            }
        });
    }

    function drawPointInBar() {

        var point = $("#point");
        var point2 = $("#point2");


        point.velocity(
        {
            top: 0
        },
        {
            duration: 300,
            easing: "linear",
            complete: function() {
                point.remove();
            }
        });

        point2.velocity(
        {
            top: barHeight - 10
        },
        {
            duration: 300,
            easing: "linear",
            complete: function() {

                point.remove();
                point2.remove();

                var div = $("<div>", {id: "point"});
                div.css('width', 0);
                div.css('left', 0);

                var div2 = $("<div>", {id: "point2"});
                div2.css('width', 0);
                div2.css('left', 0);

                $("#branch1").append(div);
                $("#branch2").append(div2);

                drawPointsInBranches();
            }
        });
    }

    function drawPointsInBranches() {

        var points = $("#point, #point2");

        points.velocity(
        {
            width: 10
        },
        {
            duration: 100,
            easing: "linear",
            complete: function() {

                points.remove();

                $("#text1, #text2").css('color', '#ED1C24');

                var div = $("<div>", {id: "point"});
                div.css('width', 30);
                div.css('left', 0);

                var div2 = $("<div>", {id: "point2"});
                div2.css('width', 30);
                div2.css('left', 0);

                $("#hline1").append(div);
                $("#hline2").append(div2);

                drawPointInLines();
            }
        });
    }

    function drawPointInLines() {

        var points = $("#point, #point2");

        points.velocity(
        {
            translateX: lineLength
        },
        {
            duration: 600,
            easing: "linear",
            complete: function() {
                points.remove();
                light();
            }
        });
    }

    function light() {

        $("#hline, #root, #bar, #branch1, #branch2, #hline1, #hline2").css({'background-color': "#999"});
        $("#hline, #root, #bar, #branch1, #branch2, #hline1, #hline2").delay(100).animate({'background-color': "#ccc"}, 1000);
        console.timeEnd('fn1')
    }

    function resetAnim() {

        line.css('width' , 0);
        line.css('margin-left' , -lineLength);
        line1.css('width' , 0);
        line2.css('width' , 0);
        root.css('width' , 0);
        bar.css('height' , 0);
        bar.css('margin-top' , 0);
        branch1.css('width' , 0);
        branch2.css('width' , 0);

        $("#hline, #hline1, #hline2, #root, #branch1, #branch2, #bar").velocity("stop");

        $("#atinfo, #text1, #text2").css('color', '#fff');
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
        console.log(lineLength);
    }

    config();


    resetAnim();

    console.time('fn1')
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

            config();
            resetAnim();
            drawLine();
        }, 30);
    });

});
