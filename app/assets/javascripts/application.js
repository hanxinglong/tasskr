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
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
// require_tree .


function fixSizes() {
    $('#rightContent').height( $(window).height() - $('footer').outerHeight(true) - $('header').outerHeight(true) - $('#tabs').outerHeight(true)  );	
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