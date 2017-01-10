$(document).ready(function(){
	
	$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
	});
	
	$('#accordionPackage').css("left", $('#results').width() + $('#sidebar').width() - 6);
	var accPckgLeft = $("#accordionPackage").css("left").slice(0,-2);
	
	if($(this).scrollTop() > 1){  
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
	
	if($(this).scrollLeft() > 1){
		$("#sidebar.sticky").css("left", 0-$(this).scrollLeft());
		$("#accordionPackage.sticky").css("left", $('#results').width() + $('#sidebar').width() - 6 - $(this).scrollLeft());
	}
	
	$(window).scroll(function(){
		if($(this).scrollTop() > 1){  
			$('header, #searchDiv, #accordionPackage, #results, #accordionPackage, #sidebar').addClass("sticky");
			$('#avaloqicon').css("display", "");
			$('#avaloqicon').show();
			$('#avaloqlogo').hide();
		}
		else{
			$('header, #searchDiv, #accordionPackage, #results, #accordionPackage, #sidebar').removeClass("sticky");
			$("#sidebar").css("left", 0);
			$("#accordionPackage").css("left", $('#results').width() + $('#sidebar').width() - 6);
			$('#avaloqicon').hide();
			$('#avaloqlogo').show();
		}
		
		$("#sidebar.sticky").css("left", 0-$(this).scrollLeft());		
		$("#accordionPackage.sticky").css("left", $('#results').width() + $('#sidebar').width() - 6 - $(this).scrollLeft());
	});
	
	$(window).resize(function(){
		$("#accordionPackage").css("left", $('#results').width() + $('#sidebar').width() - 6 - $(this).scrollLeft());
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
	
	var packaged = [];
	var cboxID = [];
	$('#packageCounter').text(packaged.length);
	$( ".resultcheckbox" ).each(function(){
		$(this).prop('checked', false);
	});
	
	$( ".resultcheckbox" ).change(function(){
		var index = packaged.indexOf($($($($($(this)[0]).parent()[0]).parent()[0]).children("h3")[0]).text());
		if(index == -1){
			packaged.push($($($($($(this)[0]).parent()[0]).parent()[0]).children("h3")[0]).text());
			cboxID.push($($(this)[0]).attr('id'));
		} else {
			packaged.splice(index, index+1);
			cboxID.splice(index, index+1);
		}
		updatePackage(packaged, cboxID);
		packageRedOnHover();
	});
	
	$.notify.addStyle('resetConfirm', {
	  html: 
		"<div>" +
		  "<div class='clearfix'>" +
			"<div class='title' data-notify-html='title'/>" +
			"<div class='buttons'>" +
			  "<button class='no'>Cancel</button>" +
			  "<button class='yes' data-notify-text='button'></button>" +
			"</div>" +
		  "</div>" +
		"</div>"
	});
	$(document).on('click', '.notifyjs-resetConfirm-base .no', function() {
	  $(this).trigger('notify-hide');
	});
	$(document).on('click', '.notifyjs-resetConfirm-base .yes', function() {
		$("#advancedsearchform").trigger("reset");
		$(this).trigger('notify-hide');
	});
	$('#reset-adv-b').click(function() {
		$('.notifyjs-resetConfirm-base').trigger('notify-hide');
		$.notify({
			title: '<font color="red"><b>Reset</b></font> form?',
			button: 'Confirm'
		}, { 
			style: 'resetConfirm',
			autoHide: 200,
			clickToHide: false,
			position: "left bottom",
		});
	});

	$('.downloadbutton').click(function() {
		$.notify("Item has started downloading", { className: "success", autoHideDelay: 1000, position: "right bottom" });
	});
	$('.linkbutton').click(function() {
		$.notify("Link copied to clipboard", { className: "info", autoHideDelay: 1000, position: "right bottom" });
	});
	
	$('.previewbutton').click(function () { 
		$('.modal-title').text($($(this).closest("div").children("h3")[0]).text());
	});
});


function updatePackage(packaged, cboxID){
	$('#packageUl').empty();
	var packagedUL = $('#packageUl');
	$.each(packaged, function(i){
		var li = $('<li/>')
			.addClass('ui-menu-item')
			.attr('role', 'menuitem')
			.appendTo(packagedUL);
		var aaa = $('<a/>')
			.addClass('ui-all')
			.attr('data-id', cboxID[i])
			.text(packaged[i])
			.appendTo(li);
	});
	$('#packageCounter').text(packaged.length);
	if(packaged.length == 0 || packaged.length > 1){
		$('#packageSHidden').show();
	} else {
		$('#packageSHidden').hide();		
	}
	removeFromPackage();
}

function removeFromPackage(){
	$( "li.ui-menu-item" ).mousedown(function(){
		$('#'+$($($(this)[0]).children('a')).attr('data-id')).click();
	});
}

function packageRedOnHover(){
	$('li.ui-menu-item').hover(function(){
		$($(this).children('a')[0]).css("color", "red");
		$($(this).children('a')[0]).css("text-decoration", "line-through");
	}, function(){
		$($(this).children('a')[0]).css("color", "black");
		$($(this).children('a')[0]).css("text-decoration", "none");		
	});
}
