function onLoad(){
	$( "#searchboxtext" ).focus(function() { 
		$( "#submitbutton" ).hide(); 
		window.setTimeout(showButton,150);
	}); 
	$( "#submit-adv-b" ).click(function() { 
		$( "#advancedsearchform" ).submit();
	});
	$( "#reset-adv-b" ).click(function() { 
		$("#advancedsearchform").trigger("reset");
	});
	$( "#submitbutton" ).mousedown(function() {$( "#searchboxform" ).submit();});
	$('.options').buttonset();
	$('#from-date-input').datepicker({ dateFormat: 'yy-mm-dd'});
	$('#to-date-input').datepicker({ dateFormat: 'yy-mm-dd'});
	$('#advancedsearchbutton').click(function() {
		$("body").css("background-color", "white");
		$("#searchbox").slideUp(500);
		$('#advanced-container').fadeIn();
		$('#avaloqinverted').show("slide", { direction: "left" }, 1000);
		$('.adv-s-hide').fadeIn();
		$('#advanced-container').css("display", "unset");
		$('.adv-s-hide').css("display", "unset");
	});
	$('#backtosimple').click(function() {
		$("body").css("background-color", "#1F559F");
		$('#advanced-container').hide();
		$('.adv-s-hide').hide();
		$( "#searchbox" ).slideDown();
	});
}
function showButton(){ $( "#submitbutton" ).show(); }
