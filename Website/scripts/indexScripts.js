function onLoad(){
	$( "#searchboxtext" ).focus(function() { 
		$( "#submitbutton" ).hide(); 
		window.setTimeout(showButton,150);
	}); 
	
	$( "#submitbutton" ).mousedown(function() {$( "#searchboxform" ).submit();});
	$('.options').buttonset();
	$('#from-date-input').datepicker({ dateFormat: 'yy-mm-dd'});
	$('#to-date-input').datepicker({ dateFormat: 'yy-mm-dd'});
	$('#advancedsearchbutton').click(function() {
		$("body").css("background-color", "white");
		$("#searchbox").slideUp(500);
		$('#advanced-container').fadeIn();
		$('#avaloqinverted').show("slide", { direction: "left" }, 500);
		$('.adv-s-hide').fadeIn();
		$('#advanced-container').css("display", "unset");
		$('.adv-s-hide').css("display", "unset");
	});
	
	$('#backtosimple').click(function() {
		$("body").css("background-color", "#1F559F");
		$('#advanced-container').hide();
		$('.adv-s-hide').hide();
		$( "#searchbox" ).slideDown();
		$('#avaloqinverted').hide(20);;
	});
	
	$( "#submit-adv-b" ).click(function() { 
		$( "#advancedsearchform" ).submit();
	});	
	$( "#reset-adv-b" ).click(function() { 
		$("#advancedsearchform").trigger("reset");
	});
	
	$('#submit-adv-b').mouseover(function () {
		$('#submit-adv-b').text("Sumbit");
	});
	$('#submit-adv-b').mouseout(function () {
		$('#submit-adv-b').text("");
	});
	$('#reset-adv-b').mouseover(function () {
		$('#reset-adv-b').text("Reset");
	});
	$('#reset-adv-b').mouseout(function () {
		$('#reset-adv-b').text("");
	});
	
	$('#searchboxtext').keyup(function(){
		$('#titleboxtext').val($('#searchboxtext').val());
	});
	$('#titleboxtext').keyup(function(){
		$('#searchboxtext').val($('#titleboxtext').val());
	});
}
function showButton(){ $( "#submitbutton" ).show(); }