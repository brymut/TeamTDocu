function onLoad(){
	$( "#searchboxtext" ).focus(function() { 
		$( "#submitbutton" ).hide(); 
		window.setTimeout(showButton,150);
	}); 
	$( "#submitbutton" ).mousedown(function() {$( "#searchboxform" ).submit();});
	$('.options').buttonset();
	$('#advancedsearchbutton').click(function() {
		$( "#searchbox" ).slideUp();
		$('#advanced').fadeIn();
		$('#advanced').css("display", "unset");
	});
	$('#backtosimple').click(function() {
		$('#advanced').hide();
		$( "#searchbox" ).slideDown();
	});
}
function showButton(){ $( "#submitbutton" ).show(); }
