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
});