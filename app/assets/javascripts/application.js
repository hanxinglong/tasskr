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
	$('#rightContent').height($(window).height());	
}

$(function(){
	fixSizes();
});