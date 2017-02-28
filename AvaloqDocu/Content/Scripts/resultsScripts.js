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
	$(window).scroll(function () {                                                              // On scroll
		if($(this).scrollTop() > 1){                                                            // If page has not been scrolled to the top
		    $('header, #searchDiv, #sidebar-right, #results, #sidebar-left').addClass("sticky");// Add the sticky class to the listed elements
		    $('#sidebar-left, #sidebar-right').css('top', $(this).scrollTop() + 48);            // Always position the two sidebars on screen; 48 is the height of the small header
		    $('#results').css('left', $('#sidebar-left').width());                              // Push the results div to the middle of the page
		    $('#sidebar-right').css('left', $('#sidebar-left').width() + $('#results').width());// Push the right sidebar to the right of the page
			$('#avaloqIcon').css("display", "");                                                // Remove the setting that hides the Avaloq icon
			$('#avaloqIcon').show();                                                            // Display the icon
			$('#avaloqLogo').hide();                                                            // Hide the Avaloq logo
			$('.ui-accordion-header').css('border-top-color', '#1F559F');                       // Switch the colour of the sidebar top border to blue
		}
		else{
		    $('header, #searchDiv, #sidebar-right, #results, #sidebar-left').removeClass("sticky"); // If scrolled to the top of page remove the sticky class from the listed elements
		    $('#sidebar-left, #sidebar-right').css('top', '105px');                             // Push the sidebars by the height of the large header
		    $('#results').css('left', '0px');                                                   // Don't push the results div anymore as its position has changed to relative which places it automatically
		    $('#sidebar-right').css('left', '0px');                                             // Don't push the right sidebar either
		    $('#avaloqIcon').hide();                                                            // Hide the Avaloq icon
			$('#avaloqLogo').show();                                                            // Show the Avaloq logo
			$('.ui-accordion-header').css('border-top-color', '#efc47D');                       // Switch the colour of the sidebar top border to blue
		}
	});

	// Colouring of results div border in yellow
	$('.resultdiv').hover(function(){                                                           // On hover on a results
		$(this).css("border-color", "#efc47D");                                                 // Colour its side borders in yellow
	}, function(){                                                                              // On hover out
		$(this).css("border-color", "#1F559F");                                                 // Colour back to blue
	});

    // Code to hide the separator in the last results div
	$('.resultdiv').children().last().css('display', 'none');

    // Code controlling the quick date selection radio buttons
	$('input[type=radio][name=dateRadio]').change(function () {                                 // On selecting a radio button from the date group
	    var dateVal = $('input[name="dateRadio"]:checked').val();                               // Identify the selected chechbox
	    if (dateVal != 0) {                                                                     // If not 'Custom date'
	        $('#fromDateInput, #toDateInput').prop('disabled', true);                           // Disable the manual input fields
	        var d = new Date();                                                                 // Get the date
	        var fromDate;
	        var toDate;
	        var month;
	        var day;
	        if (dateVal == 1) {                                                                 // If 'Last week'
	            month = d.getMonth() + 1;                                                       // Get current month, plus 1 as they start from 0
	            day = d.getDate();                                                              // Get current day
	            toDate = (day < 10 ? '0' : '') + day + '-' +                                    // Build the To date
                (month < 10 ? '0' : '') + month + '-' +
                d.getFullYear();
	            d.setDate(d.getDate() - 7);                                                     // Subtract 7 days as the target date is a week ago
	            month = d.getMonth() + 1;
	            day = d.getDate();
	            fromDate = (day < 10 ? '0' : '') + day + '-' +                                  // Build the From date
                (month < 10 ? '0' : '') + month + '-' +
                d.getFullYear();
	            $('#fromDateInput').val(fromDate);                                              // Set the two dates inside the designated fields
	            $('#toDateInput').val(toDate);
	        }
	        if (dateVal == 2) {                                                                 // Identical process as above please refer to the previous comments
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
	        if (dateVal == 3) {                                                                 // Identical process as above please refer to the previous comments
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
	    } else {                                                                                // If Custom date was selected
	        $('#fromDateInput, #toDateInput').prop('disabled', false);                          // Unlock the date fields
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
	var packaged = [];                                                                              // To store the titles of the checked results
	var cboxID = [];                                                                                // To store the checkbox IDs of the checked results
	$('#packageCounter').text(packaged.length);
	$( ".resultcheckbox" ).each(function(){                                                         // On page load uncheck all result checkboxes, this is to prevent cached selections interfering with the script
		$(this).prop('checked', false);
	});
	
	$( ".resultcheckbox" ).change(function(){                                                       // On tick/untick
		var index = packaged.indexOf($($($($($(this)[0]).parent()[0]).parent()[0]).children("h3")[0]).text());  // Check if the title of the result is already in the packaged array
		if(index == -1){                                                                            // If the title was not in the array, then this is a checkbox tick event
			packaged.push($($($($($(this)[0]).parent()[0]).parent()[0]).children("h3")[0]).text()); // Add it to the array
			cboxID.push($($(this)[0]).attr('id'));                                                  // Add the corresponding checkbox id to the cbox array
		} else {                                                                                    // If the title was in the array, then this is a checkbox untick event
			packaged.splice(index, index+1);                                                        // Remove title from the package array
			cboxID.splice(index, index+1);                                                          // Remove id from the checkbox id array
		}
		updatePackage(packaged, cboxID);                                                            // Update the package structure in the package sidebar
	});

    // Code to colour red and put a line through the titles of the results displayed in the package sidebar after being selected in the results div
	$(document).on("mouseenter", "li.ui-menu-item", function () {
	    $($(this).children('a')[0]).css("color", "red");
	    $($(this).children('a')[0]).css("text-decoration", "line-through");
	});
	$(document).on("mouseleave", "li.ui-menu-item", function () {
	    $($(this).children('a')[0]).css("color", "black");
	    $($(this).children('a')[0]).css("text-decoration", "none");
	});

    // Code to remove a result from the package sidebar and uncheck its checkbox in the results div
	$(document).on("mousedown", "li.ui-menu-item", function () {
	    $('#' + $($($(this)[0]).children('a')).attr('data-id')).click();
	});
	
	// Notification settings and code via Notify JS
	$.notify.addStyle('resetConfirm', {                                             // Code for the reset box that pop ups after clicking the search reset button
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
	$(document).on('click', '.notifyjs-resetConfirm-base .no', function() {         // Handler for clicking the no button on the reset box
	  $(this).trigger('notify-hide');
	});
	$(document).on('click', '.notifyjs-resetConfirm-base .yes', function () {       // Handler for clicking the yes button on the reset box
		$("#advancedSearchForm").trigger("reset");
		$(this).trigger('notify-hide');
	});
	$('#resetButton').click(function() {                                            // Code to trigger the reset box
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

    // Package select code via Bootstrap JS Modal
	$('#packageModal').on('show.bs.modal', function () {                                        // On showing the modal
	    $('#packageModalTitle').text('Results for "' + $('#packageSearchBox').val() + '"');     // Update its title to indicate the search term
	});

    // Change colour of clicked package name button inside package modal and attempt to force only one selected package
	$('.collapse').on('hide.bs.collapse', function () {
	    $(this).prev().removeClass('clicked');
	});
	$('.collapse').on('show.bs.collapse', function () {
	    $(this).prev().addClass('clicked');
	});
	$('.collapsebutton').click(function () {
	    $('.collapse').collapse('hide');                                                        // On clicking a package name hide all collapsible divs before collapsing the corresponding div
	});

    // Code to synchronize the two package search boxes
	$('#packageSearchBox').change(function () {
	    $('#packageSearchBoxModal').val($('#packageSearchBox').val());
	});

    // Code to catch enter key pressed on package search box
	$("#packageSearchBox").keyup(function (event) {
	    if (event.keyCode == 13) {                                                              // If the key was Enter
	        $("#packageSelect").click();
	    }
	});

    // Code to change package modal title on enter key pressed inside modal searchbox
	$("#packageSearchBoxModal").keyup(function (event) {
	    if (event.keyCode == 13) {                                                              // If the key was Enter
	        $('#packageModalTitle').text('Results for "' + $('#packageSearchBoxModal').val() + '"');
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
}

// Appends ids to the checkboxes of the KO result divs
function updateResultDivsNames() {
    var i;
    var resultChildren = $('#results').children().length - 2;
    for(i = 1; i < resultChildren - 1; i++){
        $('#results').children().eq(i).children('input').attr('id', "cb" + i);
    };
}