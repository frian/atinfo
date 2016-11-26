$(function() {

    // on page reload disable animations
    if (performance.navigation.type  == 1 ) {
        $("*").addClass("noAnim");
    }

    // if we land on same page (form error) disable animations
    if (document.referrer == window.location.href) {
        $("*").addClass("noAnim");
    }

	// check if we have a flash message
	var flash = $('#flash');

	var hasFlash = 0;

	// set flag and hide content
	if ( flash.length ) {
		$('body').css( "display" , "none" );
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
	// $(".menu li a").click(function(e) {
    //
	// 	if ( $("#top").length ) {
	// 		$("#top").remove();
	// 	}
    //
	// 	e.preventDefault();
    //
	// 	var old = current;
    //
	// 	current = '#' + $(this).text().toLowerCase();
    //
	// 	$(current).css( "opacity" , 0 );
    //
    //
	// 	$(old).animate({
	// 		opacity: 0,
	// 	}, 250, function() {
	// 		// Animation complete.
	// 		$(old).css( "display" , "none" );
    //
	// 		$(current).css( "display" , "table" );
    //
	// 		$(current).animate({
	// 			opacity: 1,
	// 		}, 250);
    //
    //
	// 		$(current).css( "display" , "table" );
    //
	// 		setTimeout(function() {
    //
    //
	// 			// if scroll add link to top
	// 			if ( $(document).height() > $(window).height()  ) {
    //
	// 				if ( ! $("#top").length ) {
	// 					var top = $("<div/>").attr('id', 'top').html("<i class='icon-up-open-big'></i>");
	// 					$(current + " .cell").append(top);
	// 				}
	// 			}
	// 		}, 100);
    //
	//     });
    //
	// });


    var minLengths = { "name" : 5, "email" : 7, "message": 15 };

    if (window.location.pathname == '/contacts') {

        $.each( minLengths, function( key, value ) {
          if ($("#form_" + key).val().length >= value) {
              $("#form_" + key).closest('div').find('div').css('color', '#d00');
          }
        });
    }





    // visual form validation
    $("form input, form textarea").on("input", null, null, function(e) {

        var current = $(this).closest('div').first('div').attr('class');

        current = current.split(' ');

        if ($(this).val().length >= minLengths[current[0]]) {
            $(this).closest('div').find('div').css('color', '#d00');
        }
        else {
            $(this).closest('div').find('div').css('color', $("html").css('color'));
        }

        if ( $("#form_name").val().length >= minLengths["name"] &&
            $("#form_email").val().length >= minLengths["email"] &&
            $("#form_message").val().length >= minLengths["message"]) {

                $(":submit").addClass('activeButton');
                $(":submit").removeClass('normalButton');
        }
        else {
            $(":submit").removeClass('activeButton');
            $(":submit").addClass('normalButton');
        }
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


    /*
    *  on resize
    */
    var timer;

    $(window).resize(function() {

        if(timer) {
            window.clearTimeout(timer);
        }

        timer = window.setTimeout(function() {

        }, 30);
    });

});
