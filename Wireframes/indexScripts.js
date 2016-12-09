function onLoad(){
	$( "#searchboxtext" ).focus(function() { 
		$( "#submitbutton" ).hide(); 
		window.setTimeout(showButton,150);
	}); 
	$( "#submitbutton" ).mousedown(function() {$( "#searchboxform" ).submit();});
	$('.options').buttonset();
	$('#advancedsearchbutton').click(function() {
		$("body").css("background-color", "white");
		$("#searchbox").slideUp();
		$('#advanced').fadeIn();
		$('#avaloqinverted').show("slide", { direction: "left" }, 1000);
		$('.adv').fadeIn();
		$('#advanced').css("display", "unset");
		$('.adv').css("display", "unset");
	});
	$('#backtosimple').click(function() {
		$("body").css("background-color", "#1F559F");
		$('#advanced').hide();
		$('.adv').hide();
		$( "#searchbox" ).slideDown();
	});
}
function showButton(){ $( "#submitbutton" ).show(); }
