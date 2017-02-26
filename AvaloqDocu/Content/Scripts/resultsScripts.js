$(document).ready(function () {
    // Initial css tweaks
    $('body').css('min-width', screen.width - 17);                                          // Set min body height to the screen width minus scrollbar width and other browser stuff
    $('#results').css('width', (screen.width - 20) * 58.3336 / 100);                        // Set results div width to ~58% of the entire screen
    $('#sidebar-left, #sidebar-right').css('width', (screen.width - 20) * 20.834 / 100);    // Set the two sidebar's width values to ~21%

	// Change of header and positioning of divs on scrolled load
	if($(this).scrollTop() > 1){  
	    $('header, #searchDiv, #sidebar-right, #results, #sidebar-left').addClass("sticky");    // Add the sticky class which defines the page appereance when vertically scrolled
	    $('#sidebar-left, #sidebar-right').css('top', $(this).scrollTop() + 48);                // Make sure the two sidebars scroll with the page vertically; 48 is the width of the the sticky header, hardcoded due to timing sync issues when getting the header's height with JQuery
	    $('#results').css('left', $('#sidebar-left').width());                                  // Make sure the results div takes its appropriate position when it's position css value changes from relative to absolute
	    $('#sidebar-right').css('left', $('#sidebar-left').width() + $('#results').width());    // Make sure the right sidebar takes its appropriate position when it's position css value changes from relative to absolute
		$('#avaloqIcon').css("display", "");                                                    // Remove the hidden attribute
		$('#avaloqIcon').show();                                                                // Display the Avaloq icon
		$('#avaloqLogo').hide();                                                                // Hide the Avaloq logo
		$('.ui-accordion-header').css('border-top-color', '#1F559F');                           // Change the colour of the sidebar's border from yellow to blue
	}
	else{
	    $('header, #searchDiv, #sidebar-right, #results, #sidebar-left').removeClass("sticky"); // Remove the sticky class as the page goes back to its normal appearance with the large blue header
		$('#avaloqIcon').hide();                                                                // Hide the Avaloq icon
		$('#avaloqLogo').show();                                                                // Display the Avaloq logo
		$('.ui-accordion-header').css('border-top-color', '#efc47D');                           // Change the colour of the sidebar's border from blue to yellow
	}
	
	// Change of header and positioning of divs on scrolling
	$(window).scroll(function () {
		if($(this).scrollTop() > 1){  
		    $('header, #searchDiv, #sidebar-right, #results, #sidebar-left').addClass("sticky");
		    $('#sidebar-left, #sidebar-right').css('top', $(this).scrollTop() + 48);
		    $('#results').css('left', $('#sidebar-left').width());
		    $('#sidebar-right').css('left', $('#sidebar-left').width() + $('#results').width());
			$('#avaloqIcon').css("display", "");
			$('#avaloqIcon').show();
			$('#avaloqLogo').hide();
			$('.ui-accordion-header').css('border-top-color', '#1F559F');
		}
		else{
		    $('header, #searchDiv, #sidebar-right, #results, #sidebar-left').removeClass("sticky");
		    $('#sidebar-left, #sidebar-right').css('top', '105px');
		    $('#results').css('left', '0px');
		    $('#sidebar-right').css('left', '0px');
			$('#avaloqIcon').hide();
			$('#avaloqLogo').show();
			$('.ui-accordion-header').css('border-top-color', '#efc47D');
		}
	});

	// Colouring of results div border in yellow
	$('.resultdiv').hover(function(){
		$(this).css("border-color", "#efc47D");
	}, function(){
		$(this).css("border-color", "#1F559F");
	});

    // Code to hide the separator in the last results div
	$('.resultdiv').children().last().css('display', 'none');

    // Code controlling the quick date selection radio buttons
	$('input[type=radio][name=dateRadio]').change(function () {
	    var dateVal = $('input[name="dateRadio"]:checked').val();
	    if (dateVal != 0) {
	        $('#fromDateInput, #toDateInput').prop('disabled', true);
	        var d = new Date();
	        var fromDate;
	        var toDate;
	        var month;
	        var day;
	        if (dateVal == 1) {
	            month = d.getMonth() + 1;
	            day = d.getDate();
	            toDate = (day < 10 ? '0' : '') + day + '-' +
                (month < 10 ? '0' : '') + month + '-' +
                d.getFullYear();
	            d.setDate(d.getDate() - 7);
	            month = d.getMonth() + 1;
	            day = d.getDate();
	            fromDate = (day < 10 ? '0' : '') + day + '-' +
                (month < 10 ? '0' : '') + month + '-' +
                d.getFullYear();
	            $('#fromDateInput').val(fromDate);
	            $('#toDateInput').val(toDate);
	        }
	        if (dateVal == 2) {
	            month = d.getMonth() + 1;
	            day = d.getDate();
	            toDate = (day < 10 ? '0' : '') + day + '-' +
                (month < 10 ? '0' : '') + month + '-' +
                d.getFullYear();
	            month = d.getMonth();
	            day = d.getDate();
	            fromDate = (day < 10 ? '0' : '') + day + '-' +
                (month < 10 ? '0' : '') + month + '-' +
                d.getFullYear();
	            $('#fromDateInput').val(fromDate);
	            $('#toDateInput').val(toDate);
	        }
	        if (dateVal == 3) {
	            month = d.getMonth() + 1;
	            day = d.getDate();
	            toDate = (day < 10 ? '0' : '') + day + '-' +
                (month < 10 ? '0' : '') + month + '-' +
                d.getFullYear();
	            month = d.getMonth() + 1;
	            day = d.getDate();
	            fromDate = (day < 10 ? '0' : '') + day + '-' +
                (month < 10 ? '0' : '') + month + '-' +
                (d.getFullYear()-1);
	            $('#fromDateInput').val(fromDate);
	            $('#toDateInput').val(toDate);
	        }
	    } else {
	        $('#fromDateInput, #toDateInput').prop('disabled', false);
	    }
	});

    // Code checking if the from date is before the to date
	$('#advancedSubmitButton').click(function () {
	    if (Date.parse($('#fromDateInput').val()) > Date.parse($('#toDateInput').val())) {
	        alert('The "From Date Modified" field should be less than the "To Date Modified" field.');
	    } else {
	        $('#advancedSearchForm').submit();
	    }
	});

    // Attach JQuery callendar to date fields
	$('#fromDateInput, #toDateInput').datepicker({ dateFormat: 'dd-mm-yy' });
	
	// Filter sidebar options
	$( "#formButtonsDiv" ).hide();	
	$( "#h3Filters" ).click(function(){
		$( "#formButtonsDiv" ).toggle();
	});

    // Update and reset filters function and behaviour
	$('#updateButton').mouseover(function () {
	    $('#updateButton').text("Update");
	});
	$('#updateButton').mouseout(function () {
	    $('#updateButton').text("");
	});
	$('#resetButton').mouseover(function () {
		$('#resetButton').text("Reset");
	});
	$('#resetButton').mouseout(function () {
		$('#resetButton').text("");
	});
	
	// Synchronization between main search field and the search field in the filter section
	$('#mainSearchBox').change(function(){
		$('#titleTextBox').val($('#mainSearchBox').val());
	});
	$('#titleTextBox').change(function(){
		$('#mainSearchBox').val($('#titleTextBox').val());
	});
	
	// Accordion settings for filters and package floating divs
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
	
	// Package floating div function
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
	
	// Notification settings and code via Notify JS
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
		$("#advancedSearchForm").trigger("reset");
		$(this).trigger('notify-hide');
	});
	$('#resetButton').click(function() {
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

	// Result excertps code via Bootstrap JS Modal, fixes a small bug with the width of the results div on modal open / close
	$('.previewbutton').click(function () {
		var resWidth = $('#results').css('width');
		$('#excerptModalTitle').text($($(this).closest("div").children("h3")[0]).text());
		$('#results').css('width', resWidth);
	});


    // Package select code via Bootstrap JS Modal
	$('#packageModal').on('show.bs.modal', function () {
	    $('#packageModalTitle').text('Results for "' + $('#packageSearchBox').val() + '"');
	});

    // Change colour of clicked package name button inside package modal and attempt to force only one selected package
	$('.collapse').on('hide.bs.collapse', function () {
	    $(this).prev().removeClass('clicked');
	});
	$('.collapse').on('show.bs.collapse', function () {
	    $(this).prev().addClass('clicked');
	});
	$('.collapsebutton').click(function () {
	    $('.collapse').collapse('hide');
	});

    // Code to synchronize the two package search boxes
	$('#packageSearchBox').change(function () {
	    $('#packageSearchBoxModal').val($('#packageSearchBox').val());
	});

    // Code to catch enter key pressed on package search box
	$("#packageSearchBox").keyup(function (event) {
	    if (event.keyCode == 13) {
	        $("#packageSelect").click();
	    }
	});

    // Code to change package modal title on enter key pressed inside modal searchbox
	$("#packageSearchBoxModal").keyup(function (event) {
	    if (event.keyCode == 13) {
	        $('#packageModalTitle').text('Results for "' + $('#packageSearchBoxModal').val() + '"');
	        var resWidth = $('#results').css('width');
	        $('#results').css('width', resWidth);
	    }
	});

    // Code to disable / enable package search box on package select / deselect
    $('#selectPackage').click(function () {
        if ($('.collapsebutton.clicked').length == 1) {
            $('#packageSearchBox').val($('.collapsebutton.clicked').text());
            $('#packageSearchBox').prop("disabled", true);
            $('#packageSearchBox').css('background-color', '#EBEBE4');
            $('#packageModal').modal('toggle');
        } else if ($('.collapsebutton.clicked').length > 1) {
            alert("Please select only one package.");
        } else {
	        $('#packageSearchBox').prop("disabled", false);
	        $('#packageSearchBox').val("");
	        $('#packageModal').modal('toggle');
	    }
	});

    // Red color of disabled package searchbox on hover
	$('#onHover').hover(function () {
	    if ($('#packageSearchBox').prop('disabled')) {
	        $('#packageSearchBox').css('background-color', '#ff3939');
	        $('#packageSearchBox').css('text-decoration', 'line-through');
	        $('#packageSearchBox').css('cursor', 'pointer');
	        $('#removePackage').css('display', 'inline');
	        $('#onHover').click(function () {
	            $('#packageSearchBox').prop('disabled', false);
	            $('#packageSearchBox').val('');
	            $('#packageSearchBox').css('background-color', 'white');
	            $('#packageSearchBox').css('text-decoration', 'none');
	            $('#packageSearchBox').css('cursor', 'auto');
	            $('#removePackage').css('display', 'none');
	        });
	    }
	}, function () {
	    if ($('#packageSearchBox').prop('disabled')) {
	        $('#packageSearchBox').css('background-color', '#EBEBE4');
	        $('#packageSearchBox').css('text-decoration', 'none');
	        $('#packageSearchBox').css('cursor', 'auto');
	        $('#removePackage').css('display', 'none');
	    }
	});

    // Appends ids to the checkboxes of the Knockout JS result divs
	updateResultDivsNames();
});

// Function to update in real-life the package floating div
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

// On remove from package floating div
function removeFromPackage(){
	$( "li.ui-menu-item" ).mousedown(function(){
		$('#'+$($($(this)[0]).children('a')).attr('data-id')).click();
	});
}

// Red colouring on hover for package floating div
function packageRedOnHover(){
	$('li.ui-menu-item').hover(function(){
		$($(this).children('a')[0]).css("color", "red");
		$($(this).children('a')[0]).css("text-decoration", "line-through");
	}, function(){
		$($(this).children('a')[0]).css("color", "black");
		$($(this).children('a')[0]).css("text-decoration", "none");		
	});
}

// Appends ids to the checkboxes of the KO result divs
function updateResultDivsNames() {
    var i;
    var resultChildren = $('#results').children().length - 2;
    for(i = 1; i < resultChildren - 1; i++){
        $('#results').children().eq(i).children('input').attr('id', "cb" + i);
    };
}