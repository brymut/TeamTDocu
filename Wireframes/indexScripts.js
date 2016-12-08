function onLoad(){
	/* Searchbox related code */
	$( "#searchboxtext" ).focus(function() { 
		$( "#submitbutton" ).hide(); 
		window.setTimeout(showButton,150);
	}); 
	$( "#submitbutton" ).mousedown(function() {$( "#searchboxform" ).submit();});
}
function showButton(){ $( "#submitbutton" ).show(); }
