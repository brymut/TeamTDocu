$(document).ready(function () {
    // Initial elements appearance tweaks to scale page with resolution
    $('body').css('min-width', screen.width - 17);                                          // Set min body height to the screen width minus scrollbar width and other browser stuff
    $('#results').css('width', (screen.width - 20) * 58.3336 / 100);                        // Set results div width to ~58% of the entire screen
    $('#sidebar-left, #sidebar-right').css('width', (screen.width - 20) * 20.834 / 100);    // Set the two sidebar's width values to ~21%
    $('#resetDiv').css('margin-left', ($('#accordionFilters').width() - 2 * ($('#resetButton').width())) / 2); // Center the reset and update buttons to be in the middle of the accordion filters div

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
	        alert('The "From Date Modified" date should be before the "To Date Modified" date.');
	    } else {
	        $('#advancedSearchForm').submit();
	    }
	});

    // Attach JQuery callendar to date fields
	$('#fromDateInput, #toDateInput').datepicker({ dateFormat: 'dd-mm-yy' });
	
	// Filter sidebar options
	$( "#formButtonsDiv" ).hide();	
	$( "#h3Filters" ).click(function(){                             // When the title of the sidebar is clicked
		$( "#formButtonsDiv" ).toggle();                            // Collapse the form buttons div
	});

    // Update and reset buttons behaviour on hover
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
	$('#mainSearchBox').change(function(){                              // On change
		$('#titleTextBox').val($('#mainSearchBox').val());              // Make values equal
	});
	$('#titleTextBox').change(function () {                             // On change
	    $('#mainSearchBox').val($('#titleTextBox').val());              // Make values equal
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
		updatePackage(packaged, cboxID);                                                            // Call the function to update the package list structure in the package sidebar
	});

    // Code to colour red and put a line through the titles of the results displayed in the package sidebar after being selected in the results div
	$(document).on("mouseenter", "li.ui-menu-item", function () {
	    $($(this).children('a')[0]).css("color", "rgba(255,0,0,0.7)");
	    $($(this).children('a')[0]).css("text-decoration", "line-through");
	});
	$(document).on("mouseleave", "li.ui-menu-item", function () {
	    $($(this).children('a')[0]).css("color", "black");
	    $($(this).children('a')[0]).css("text-decoration", "none");
	});

    // Code to uncheck a result's checkbox in the results div when its title is clicked in the package sidebar list
	$(document).on("mousedown", "li.ui-menu-item", function () {
	    $('#' + $($($(this)[0]).children('a')).attr('data-id')).click();
	});
	
	// Notification settings and code via Notify JS
	$.notify.addStyle('resetConfirm', {                                             // HTML code for the reset box that pop ups after clicking the search reset button
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
	$(document).on('click', '.notifyjs-resetConfirm-base .no', function() {         // Handler for clicking the no button on the reset notification box
	  $(this).trigger('notify-hide');
	});
	$(document).on('click', '.notifyjs-resetConfirm-base .yes', function () {       // Handler for clicking the yes button on the reset notification box
	    $("#advancedSearchForm").trigger("reset");
	    $('#fromDateInput, #toDateInput').prop('disabled', false);                  // Make sure to enable the date fields in case they were disabled
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

	$('.downloadbutton').click(function () {                                        // Code to trigger a document download started notification
		$.notify("Item has started downloading", { className: "success", autoHideDelay: 1000, position: "right bottom" });
	});
	$('.linkbutton').click(function () {                                            // Code to trigger a link copied notification
		$.notify("Link copied to clipboard", { className: "info", autoHideDelay: 1000, position: "right bottom" });
	}); 
	$('#acceptNewPackageName').click(function () {                                  // Code to trigger a new package created notification
	    if ($('#newPackageNameBox').val() != '') {                                  // If a name was given
	        $.notify("Package created", { className: "success", autoHideDelay: 1000, position: "right bottom" });
	    }
	});
	$('#addToPackageButton').click(function () {                                    // Code to trigger an added to package notification
	    $.notify("Documents have been added to package", { className: "success", autoHideDelay: 1000, position: "right bottom" });
	});
	$('#downloadPackageButton').click(function () {                                 // Code to trigger a package download started notification
	    $.notify("Package download is starting", { className: "success", autoHideDelay: 1000, position: "right bottom" });
	});

    // Package select code via Bootstrap JS Modal
	$('#packageModal').on('show.bs.modal', function () {                                        // On showing the modal
	    $('#packageModalTitle').text('Results for "' + $('#packageSearchBox').val() + '"');     // Update its title to indicate the search term
	});

    // Change colour of clicked package name button inside package modal and attempt to force only one selected package
	$('.collapse').on('hide.bs.collapse', function () {                                         // On hiding a .collapse div
	    $(this).prev().removeClass('clicked');                                                  // Remove the class 'clicked' from the button responsible for that div
	});
	$('.collapse').on('show.bs.collapse', function () {                                         // On collapsing a .collapse div
	    $(this).prev().addClass('clicked');                                                     // Add the class 'clicked' from the button responsible for that div
	});
	$('.collapsebutton').click(function () {                                                    // On clicking a package name button in the package select modal
	    $('.collapse').collapse('hide');                                                        // Hide all collapsible divs before collapsing the corresponding div
	});

    // Code to synchronize the two package search boxes
	$('#packageSearchBox').change(function () {
	    $('#packageModalSearchBox').val($('#packageSearchBox').val());
	});

    // Code to catch enter key pressed on package search box
	$("#packageSearchBox").keyup(function (event) {
	    if (event.keyCode == 13) {                                                              // If the key was Enter
	        $("#packageSelect").click();                                                        // Click the button with the magnifying glass to open the package select modal
	    }
	});

    // Code to change package modal title on enter key pressed inside modal searchbox
	$("#packageModalSearchBox").keyup(function (event) {
	    if (event.keyCode == 13) {                                                                      // If the key was Enter
	        $('#packageModalTitle').text('Results for "' + $('#packageModalSearchBox').val() + '"');    // Update the package modal title
	    }
	});

    // Code to disable / enable package search box on package select / deselect
    $('#selectPackage').click(function () {                                         // On click of the 'Select package' button in the package modal
        if ($('.collapsebutton.clicked').length == 1) {                             // If only one package has been opened (selected)
            $('#packageSearchBox').val($('.collapsebutton.clicked').text());        // Put the name in the package select field in the package sidebar on the results main page
            $('#packageSearchBox').prop("disabled", true);                          // Disable that field
            $('#packageSearchBox').css('background-color', '#EBEBE4');              // Set its colour to grey as some browsers will not on second disable
            $('#packageModal').modal('toggle');                                     // Close the package modal
        } else if ($('.collapsebutton.clicked').length > 1) {                       // If more packages has been selected
            alert("Please select only one package.");                               // Alert user and don't close the modal
        } else {                                                                    // If no packages have been selected
	        $('#packageSearchBox').prop("disabled", false);                         // Enable the field in the package sidebar
	        $('#packageSearchBox').val("");                                         // Set its value to empty
	        $('#packageModal').modal('toggle');                                     // Close the modal
	    }
	});

    // Red color of disabled package searchbox on hover
    $('#onHoverPackageSidebarDiv').hover(function () {                              // On hover on the div that encompasses onlu the package search box in the package sidebar
	    if ($('#packageSearchBox').prop('disabled')) {                              // Only if the search box is disabled
	        $('#packageSearchBox').css('background-color', 'rgba(255,0,0,0.7)');    // Set its background colour to red
	        $('#packageSearchBox').css('text-decoration', 'line-through');          // Add a line through the text
	        $('#packageSearchBox').css('cursor', 'pointer');                        // Make the cursor a pointer
	        $('#removePackage').css('display', 'inline');                           // Add the x to indicate removal on click
	        $('#onHoverPackageSidebarDiv').click(function () {                      // On click in the search box
	            $('#packageSearchBox').prop('disabled', false);                     // Enable it
	            $('#packageSearchBox').val('');                                     // Clear its content
	            $('#packageSearchBox').css('background-color', 'white');            // Set background colour to white
	            $('#packageSearchBox').css('text-decoration', 'none');              // Remove the line through the text
	            $('#packageSearchBox').css('cursor', 'auto');                       // Set cursor to normal
	            $('#removePackage').css('display', 'none');                         // Hide the x
	        });
	    }
	}, function () {                                                                // On hover out
	    if ($('#packageSearchBox').prop('disabled')) {                              // Only if the search box is disabled
	        $('#packageSearchBox').css('background-color', '#EBEBE4');              // Set background colour to grey
	        $('#packageSearchBox').css('text-decoration', 'none');                  // Remove the line through the text
	        $('#packageSearchBox').css('cursor', 'auto');                           // Set the cursor to normal
	        $('#removePackage').css('display', 'none');                             // Hide the x
	    }
	});

    // Handles a problem IE has with modals
    if (detectIE() != false) {
        $('.modal').removeClass('fade');
    }

    // Appends ids to the checkboxes of the Knockout JS result divs
	updateResultDivsNames();                                                        // Call a function to append needed ids to result checkboxes for the package list in the package sidebar
});

// Function to update the package list in the package sidebar
function updatePackage(packaged, cboxID){
	$('#packageUl').empty();                                                        // Empty the list
	var packagedUL = $('#packageUl');                                               // Put it into a var
	$.each(packaged, function(i){                                                   // For each result title in the array
		var li = $('<li/>')                                                         // Create a list item
			.addClass('ui-menu-item')                                               // Add the specific class
			.attr('role', 'menuitem')                                               // Set role to menuitem
			.appendTo(packagedUL);                                                  // Append to the html list
		var aaa = $('<a/>')                                                         // Create hyperlink
			.addClass('ui-all')                                                     // Add the specific class
			.attr('data-id', cboxID[i])                                             // Set data-id attribute to the result checkbox id of the result the title reffers to
			.text(packaged[i])                                                      // Set the result title as text
			.appendTo(li);                                                          // Append to the list item just created
	});
	$('#packageCounter').text(packaged.length);                                     // Set the selected results counter to the length of the array
	if(packaged.length == 0 || packaged.length > 1){                                // Toggle between 'package' and 'packages' as part of the sentence in the package sidebar
		$('#packageSHidden').show();
	} else {
		$('#packageSHidden').hide();		
	}
}

// Appends ids to the checkboxes of the KO result divs
function updateResultDivsNames() {
    var i;                                                                          // Counter var
    var pgNum = $("#pageNum").text();                                               // Page number var
    var maxResPerPage = 10;                                                         // Maximum results per page var
    var resultChildren = $('#results').children().length - 2;                       // Get amount of results; minus 2 as the results div has two info children
    for(i = 1; i < resultChildren - 1; i++){                                        // For each child
        $('#results').children().eq(i).children('input').attr('id', "cb" + (i+pgNum*maxResPerPage));      // Append a checkbox with a unique id
    };
}

// Function to determine if the browser is IE, source: stackoverflow
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // Other browser
    return false;
}