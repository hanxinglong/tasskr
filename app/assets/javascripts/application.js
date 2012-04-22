// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery-1.7.1
//= require jquery-ui-1.8.16.custom.min
//= require jquery_ujs
//= require json2
//= require underscore
//= require backbone
//= require ICanHaz
//= require jquery.caret	
//= require moment
//= require date
//= require jquery.flot
//= require jquery.flot.resize
//= require jquery.ui.sortable
// require jquery.autoresize
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
// require_tree .


function fixSizes() {
    var height = $(window).height() - $('footer').outerHeight(true) - $('header').outerHeight(true) - $('#tabs').outerHeight(true);
    $('#rightContent').height(height);
    $('#middleContainer').height(height + $('#tabs').outerHeight(true));
}

$(window).scroll(function() {
	fixSizes();
});
$(window).resize(function() {
	fixSizes();
});


function getTimeZoneOffsetDST() {
    // NOTE: return new Date().getTimezoneOffset() is not enought !
    var today = new Date();
    // 2nd Sunday in March can't occur after the 14th :
    var dstBeg = new Date("March 14, "+ today.getFullYear() +" 02:00:00");
    // 1st Sunday in November can't occur after the 7th :
    var dstEnd = new Date("November 07, "+ today.getFullYear() +" 02:00:00");
    dstBeg.setDate( 14 - dstBeg.getDay() ); // Calculate second Sunday in March
    dstEnd.setDate( 7 - dstEnd.getDay() ); // Calculate first Sunday in November
    if ( today >= dstBeg && today < dstEnd ) { // isDST
        // e.g. for GMT+02:00 returns -120 !
        return today.getTimezoneOffset() + 60;
    }
    else {
        return today.getTimezoneOffset();
    }
}


function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}


function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


function eraseCookie(name) {
    createCookie(name,"",-1);
}


function doCharts() {
    $.ajax({
        url: '/folders/chartCompleted',
        success: function( data ) {
            var options = {
                legend: {
                    backgroundColor: null
                },
                grid: {
                    color: "#222",
                    backgroundColor: "#555555"
                }
            };
            var dateOptions = {};
            _.extend(dateOptions, options, {
                bars: {
                    show: true,
                    // barWidth: 24 * 60 * 60 * 1000        // full
                    barWidth: 24 * 60 * 60 * 1000,
                    align: "center"
                },
                xaxis: {
                    mode: "time",
                    twelveHourClock: true
                },
            });
            var dayOptions = {};
            _.extend(dayOptions, options, {
                bars: {
                  show: true,
                  align: "center"
                },
                xaxis: {
                    min: -0.5,
                    max: 6.5,
                    ticks: [[0, "Sun"], [1, "Mon"], [2, "Tues"], [3, "Wed"], [4, "Thur"], [5, "Fri"], [6, "Sat"]]
                }
            });
            var hourOptions = {};
            _.extend(hourOptions, options, {
                bars: {
                    show: true,
                    align: "center"
                },
                xaxis: {
                    min: -0.5,
                    max: 23.5,
                    ticks: [[0, '12 am'], [6, '6 am'], [12, '12 pm'], [18, '6 pm'], [23, '11 pm']],
                }
            });
            var completedVsCreatedOptions = {};
            _.extend(completedVsCreatedOptions, options, {
                xaxis: {
                    mode: "time",
                    twelveHourClock: true
                },
                legend: {
                    position: "nw",
                    backgroundColor: "null",
                },
                lines: {
                    fill: true
                }
            });
            // $.plot($("#completedChart"), [{label: "Completed Tasks", data: data}], options );
            //$.plot($("#completedChart"), [data], options );
            $.plot($("#completedChartDate"), [{color: "#6796f5", data: data['byDate']}], dateOptions );
            $.plot($("#completedChartDay"), [{color: "#6796f5", data: data['byDay']}], dayOptions );
            $.plot($("#completedChartHour"), [{color: "#6796f5", data: data['byHour']}], hourOptions );
            $.plot($("#completedVsCreatedHour"), [
                {label: data['totalCreated'][data['totalCreated'].length-1][1] + ' Created', color: "#6799f4", data: data['totalCreated']},
                {label: data['totalCompleted'][data['totalCompleted'].length-1][1] + ' Completed', color: "#c1f467", data: data['totalCompleted']}
                ], completedVsCreatedOptions );
        }
    });
}


function trackEvent(category, action) {
    //_gaq.push(['_trackEvent', category, action]);
    if (_gaq) {
        _gaq.push(['_trackPageview', '/#'+category+'/'+action]);
    } else {
        console.warn('ga not tracking');
    }
    if (clicky) {
        clicky.log('#'+category+'/'+action, action);
    } else {
        console.warn('click not tracking');
    }
    //if (_guages) {
        //console.log('trying to track');
    _gauges.push(['track']);
    //}
}