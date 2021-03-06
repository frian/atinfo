$(function() {

    /**
     * -- Animation
     */
    var windowWidth, lineLength, barHeight, contentWidth;

    var pointInLinesSize = 30;

    var debugSlow, debugSlowLine;


    var finishPointInLinesDuration;
    var rootDuration;
    var branchDuration;
    var barDuration;

    var pointInLinesDuration;

    var line = $("#hline");
    var line1 = $("#hline1");
    var line2 = $("#hline2");
    var lines = $("#hline1, #hline2");
    var root = $("#root");
    var branch1 = $("#branch1");
    var branch2 = $("#branch2");
    var branches = $("#branch1, #branch2");
    var bar = $("#bar");

    /**
     * -- DRAW LINES ----------------------------------------------------------
     */
    function drawLine() {

        if (lineLength < 20 ) {
            setTimeout(function() {
                $("#atinfo").css('color', '#ddd')
                drawRoot();
            }, 200);

            return;
        }

        line.velocity(
        {
            width: lineLength
        },
        {
            duration: pointInLinesDuration * 2,
            easing: "linear",
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
            duration: rootDuration * 2,
            delay: $("#atinfo").width() * debugSlowLine,
            easing: "linear",
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
            duration: barDuration * 2,
            easing: "linear",
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
            duration: rootDuration,
            easing: "linear",
            complete: function() {
               $("#text1, #text2").css('color', '#ccc');
               if (lineLength < 20 ) {

                   setTimeout(function() {

                       $("#link1 a, #link2 a").css('color', '#ccc');
                       $("#atinfo").css('color', '#0072BC')

                       var div = $("<div>", {id: "point"});
                       div.css('width', 0);
                       div.css('left', 0);
                       root.append(div);

                       drawPointInRoot();
                   }, 300);
               }
               else {
                   drawLines();
               }
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
            duration: pointInLinesDuration * 2,
            delay: $("#text1").width() * debugSlowLine,
            easing: "linear",
            complete: function() {

                $("#link1 a, #link2 a").css('color', '#ccc');

                var point = $("<div>", {id: "point"});
                point.css('width', 0);
                point.css('left', 0);

                if (lineLength < 20 ) {

                    $("#atinfo").css('color', '#0072BC')

                    root.append(point);
                    drawPointInRoot();
                }
                else {
                    line.append(point);
                    startdrawPointInLine();
                }
            }
        });
    }


    /**
     * -- DRAW POINTS ---------------------------------------------------------
     */
    function startdrawPointInLine() {

        var point = $("#point");

        point.velocity(
        {
            width: 30
        },
        {
            duration: finishPointInLinesDuration,
            easing: "linear",
            complete: function() {

                drawPointInLine();
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
            duration: pointInLinesDuration,
            easing: "linear",
            complete: function() {

                finishPointInLine();
            }
        });
    }

    function finishPointInLine() {

        var point = $("#point");

        point.velocity(
        {
            width: 0,
            translateX: lineLength
        },
        {
            duration: finishPointInLinesDuration,
            easing: "linear",
            complete: function() {

                point.remove();

                $("#atinfo").css('color', '#0072BC')

                var div = $("<div>", {id: "point"});
                div.css('width', 0);
                div.css('left', 0);
                root.append(div);
                drawPointInRoot();
            }
        });1
    }

    function drawPointInRoot() {

        var point = $("#point");

        point.velocity(
        {
            width: 10
        },
        {
            duration: rootDuration,
            delay: $("#atinfo").width() / 2 * debugSlowLine,
            easing: "linear",
            complete: function() {

                var div = $("<div>", {id: "point1"});
                div.css('width', 2);
                div.css('height', 0);
                div.css('left', 0);
                div.css('top', (barHeight / 2) - 0);

                var div2 = $("<div>", {id: "point2"});
                div2.css('width', 2);
                div2.css('height', 0);
                div2.css('left', 0);
                div2.css('top', (barHeight / 2) - 0);

                $("#bar").append(div, div2);

                finishPointInRoot();
            }
        });
    }

    function finishPointInRoot() {

        var point = $("#point");
        var points = $("#point1, #point2");


        point.velocity(
        {
            width: 0,
            translateX: 10
        },
        {
            duration: rootDuration,
            easing: "linear",
            complete: function() {

            }
        });

        points.velocity(
        {
            height: 30,
            top: (barHeight / 2) - 15
        },
        {
            duration: rootDuration,
            easing: "linear",
            complete: function() {
                drawPointInBar();
            }
        });

    }

    function drawPointInBar() {

        var point1 = $("#point1");
        var point2 = $("#point2");


        point1.velocity(
        {
            top: 0
        },
        {
            duration: barDuration,
            easing: "linear",
            complete: function() {
                point.remove();
            }
        });

        point2.velocity(
        {
            top: barHeight - 30
        },
        {
            duration: barDuration,
            easing: "linear",
            complete: function() {

                var div = $("<div>", {id: "point3"});
                div.css('width', 0);
                div.css('left', 0);

                var div2 = $("<div>", {id: "point4"});
                div2.css('width', 0);
                div2.css('left', 0);

                $("#branch1").append(div);
                $("#branch2").append(div2);

                finishPointInBar();
            }
        });
    }

    function finishPointInBar() {

        var point1 = $("#point1");
        var point2 = $("#point2");

        var points = $("#point3, #point4");

        point1.velocity(
        {
            height: 0
        },
        {
            duration: rootDuration,
            easing: "linear",
            complete: function() {
                point1.remove();
            }
        });

        point2.velocity(
        {
            height: 0,
            translateY: 30
        },
        {
            duration: rootDuration,
            easing: "linear",
            complete: function() {

                drawPointsInBranches();
            }
        });

        points.velocity(
        {
            width: 10
        },
        {
            duration: rootDuration,
            easing: "linear",
            complete: function() {
                // point1.remove();
            }
        });
    }

    function drawPointsInBranches() {

        var points = $("#point3, #point4");

        points.velocity(
        {
            width: 0,
            translateX: 10
        },
        {
            duration: rootDuration,
            easing: "linear",
            complete: function() {

                points.remove();

                $("#text1, #text2").css('color', '#ED1C24');

                if (lineLength < 20 ) {
                    light();
                }
                else {
                    var div = $("<div>", {id: "point"});
                    div.css('width', 0);
                    div.css('left', 0);

                    var div2 = $("<div>", {id: "point2"});
                    div2.css('width', 0);
                    div2.css('left', 0);

                    $("#hline1").append(div);
                    $("#hline2").append(div2);

                    startPointInLines();
                }
            }
        });
    }

    function startPointInLines() {

        var points = $("#point, #point2");

        points.velocity(
        {
            width: 30
        },
        {
            duration: finishPointInLinesDuration,
            delay: $("#text1").width() / 2 * debugSlowLine,
            easing: "linear",
            complete: function() {

                drawPointInLines();
            }
        });
    }

    function drawPointInLines() {

        var points = $("#point, #point2");

        points.velocity(
        {
            translateX: lineLength - 30
        },
        {
            duration: pointInLinesDuration,
            easing: "linear",
            complete: function() {
                light();
                finishPointInLines();
            }
        });
    }

    function finishPointInLines() {

        var points = $("#point, #point2");

        points.velocity(
        {
            width: 0,
            translateX: lineLength
        },
        {
            duration: finishPointInLinesDuration,
            easing: "linear",
            complete: function() {
                points.remove();
                // light();
            }
        });
    }

    function light() {

        $("#hline, #root, #bar, #branch1, #branch2, #hline1, #hline2").css({'background-color': "#999"});
        $("#hline, #root, #bar, #branch1, #branch2, #hline1, #hline2").delay(100).velocity({'background-color': "#ccc"}, 1000);
        $("#link1 a, #link2 a").css({'color': "#111"});
        $("#link1 a, #link2 a").delay(500).velocity({'color': "#ccc"}, 1000);
        $("#link1 a, #link2 a").velocity({'color': "#666"}, 500);
        console.timeEnd('fn1');
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

        $("#hline, #hline1, #hline2, #root, #branch1, #branch2, #bar, #link1 a, #link2 a").velocity("stop");

        $("#point, #point1, #point2, #point3, #point4").remove();

        $("#atinfo, #text1, #text2, #link1 a, #link2 a").css('color', '#fff');
    }

    function config() {

        windowWidth = window.innerWidth;

        barHeight = 100;
        contentWidth = 300;
        debugSlow = 4;
        debugSlow = 4;

        if (windowWidth >= 700) {
            barHeight = 200;
            contentWidth = 500;
            debugSlow = 2;
            debugSlowLine = 2;
        }

        if (windowWidth >= 1200) {
            debugSlowLine = 1;
        }

        rootDuration = 10 * 2 * debugSlow;
        branchDuration = rootDuration * 2 * debugSlow;

        lineLength = ((window.innerWidth - contentWidth) / 2) - 20; // -20 margin

        barDuration = barHeight / 2 * debugSlow;

        pointInLinesDuration = (lineLength - pointInLinesSize) * debugSlowLine;

        finishPointInLinesDuration = pointInLinesSize * debugSlowLine;
    }

    config();

    resetAnim();

    console.time('fn1')
    // start the cycle
    setTimeout(function() {
        drawLine();
    }, 300);

});
