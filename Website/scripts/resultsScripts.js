$(document).ready(function(){
	if ($(this).scrollTop() > 1){  
		$('header, #searchDiv, #accordionPackage, #results, #accordionPackage, #sidebar').addClass("sticky");
		$('#avaloqicon').css("display", "");
		$('#avaloqicon').show();
		$('#avaloqlogo').hide();
	}
	else{
		$('header, #searchDiv, #accordionPackage, #results, #accordionPackage, #sidebar').removeClass("sticky");
		$('#avaloqicon').hide();
		$('#avaloqlogo').show();
	}
	$(window).scroll(function(){
		if ($(this).scrollTop() > 1){  
			$('header, #searchDiv, #accordionPackage, #results, #accordionPackage, #sidebar').addClass("sticky");
			$('#avaloqicon').css("display", "");
			$('#avaloqicon').show();
			$('#avaloqlogo').hide();
		}
		else{
			$('header, #searchDiv, #accordionPackage, #results, #accordionPackage, #sidebar').removeClass("sticky");
			$('#avaloqicon').hide();
			$('#avaloqlogo').show();
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
	
	$('#searchbox').keyup(function(){
		$('#titleboxtext').val($('#searchbox').val());
	});
	$('#titleboxtext').keyup(function(){
		$('#searchbox').val($('#titleboxtext').val());
	});
	
	$( "#accordionPackage" ).accordion({
		collapsible: true,
		active: false,
		heightStyle: "content",
		autoHeight: false,
        clearStyle: true
    });
	
	$( "#accordionFilters" ).accordion({
		collapsible: true,
		active: false,
		heightStyle: "content",
		autoHeight: false,
        clearStyle: true
    });
	
	$( "#submit-reset" ).hide();	
	$( "#h3Filters" ).click(function(){
		$( "#submit-reset" ).toggle();
	});
});