$(document).ready(function(){
	$(window).scroll(function(){
		if ($(this).scrollTop() > 1){  
			$('header').addClass("sticky");
			$('#avaloqicon').css("display", "");
			$('#avaloqicon').show();
			$('#submitbuttonsearch').css("margin-top", "0.7%");
			$('#searchboxtext').css("margin-top", "0.7%");
			var logowidth =  $('#avaloqlogo').css("width").match(/\d+/)[0] - $('#avaloqicon').css("width").match(/\d+/)[0] - 25;
			$('#searchboxtext').css("margin-left", logowidth);
			$('#avaloqlogo').hide();
		}
		else{
			$('header').removeClass("sticky");
			$('#avaloqicon').hide();
			$('#submitbuttonsearch').css("margin-top", "3%");
			$('#searchboxtext').css("margin-top", "3%");
			$('#avaloqlogo').show();
			$('#searchboxtext').css("margin-left", "0px");
		}
	});
	
	$('.resultdiv').hover(function(){
		if($(this).attr('id') == 'firstRes'){
			$('#resultsinfo').css("border-bottom-color", "#efc47D");
		}
		$(this).prev().css("border-bottom-color", "#efc47D");
		$(this).css("border-color", "#efc47D");
	}, function(){
		if($(this).attr('id') == 'firstRes'){
			$('#resultsinfo').css("border-bottom-color", "grey");
		}
		$(this).css("border-color", "#1F559F");
		$(this).prev().css("border-bottom-color", "#1F559F");
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
});