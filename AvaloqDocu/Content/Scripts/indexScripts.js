$(document).ready(function () {
    // Code to swap between search and upload views and to handle IE's lack of support for CSS transforms
    $('.cardflip').click(function () {                                                      // On click of the 'to upload mode' or the 'back to search mode' buttons 
        if (detectIE() == false) {                                                          // If the browser is not IE
            $('#switchModeDiv').toggleClass('flipped');                                     // Add or remove the class 'flipped'
            setTimeout(function () { $('#mainSearchDiv').toggleClass('hideme'); }, 300);    // Ensure smoothness by adding a delay before hiding/displaying the main search div
        } else {                                                                            // If browser is IE, skip the card flip effect
            $('#mainSearchDiv').toggle(20);
            $('#uploadMode').toggleClass('back');                                           // Identifies whether to hide or show the upload mode
            if ($('#uploadMode').hasClass('back')) {
                $('#uploadMode').hide();
            } else {
                $('#uploadMode').show();
            }
        }
    });

    // Code for view switch button transparency
    $('#toUploadMode, #uploadToSearch').hover(function () {
        $('#toUploadMode, #uploadToSearch').css('background-color', '#ffffff');
    }, function () {
        $('#toUploadMode, #uploadToSearch').css('background-color', 'rgba(255, 255, 255, 0.9)');
    });

    // Code to handle delete buttons of uploaded files
    $(document).on("click", ".delete", function () {                            // For all elements of class delete now and in the future, add event listener for clicks
        $(this).closest("tr").removeClass("template-download").addClass("tocancel").html("<td><font color='red'>Element deleted.</font></td><td></td><td></td>");
    });                                                                         // Remove the class template-download, add the class tocancel and change the content of the row with an "Element deleted" warning.
    $("#cancelAllUploads").click(function () {                                  // On click of the cancelAllUploads button
        $("#uploadTableBody").children(".tocancel").remove();                   // Clear all children of the upload table which represent deleted items; this button also clears failed uploads and item that have been added but not uploaded, however this functionality is part of the JQuery Blue Imp File Upload plugin
    });

    // Code to center main search div on load
    var newWidthMain = ($(window).width() - $('#mainSearchDiv').width()) / 2;
    if (newWidthMain <= 0) {
        $('#mainSearchDiv').css('left', '20px');
    } else {
        $('#mainSearchDiv').css('left', newWidthMain + 'px');
    }

    // Code to center advanced search div on load
    var newWidthAdv = ($(window).width() - $('#advancedSearchDiv').width()) / 2 + 20;
    if (newWidthAdv <= 0) {
        $('#advancedSearchDiv').css('left', '20px');
    } else {
        $('#advancedSearchDiv').css('left', newWidthAdv + 'px');
    }

    // On resize handler to reposition divs
    $(window).resize(function () {
        onResize();
    });

    // Code to synchronize main search and advanced search fields
    $('#mainSearchBox').change(function () {
        $('#advancedSearchBox').val($('#mainSearchBox').val());
    });
    $('#advancedSearchBox').change(function () {
        $('#mainSearchBox').val($('#mainSearchBox').val());
    });

    // Code to position the back to main search button
    $('#backToMainSearch').css('left', $('#advancedSearchDiv').width() * 1 + 1 * $('#advancedSearchDiv').css('left').slice(0, -2) + "px");

    // Code for the footer image in advanced search mode
    if(detectIE() == false){
        $('#footer').css('top', screen.height - $('#footer').height() - 120);
        $('#footer').css('left', screen.width - $('#footer').width());
    } else {
        $('#footer').css('down', screen.height - $('#footer').height());
        $('#footer').css('left', screen.width - $('#footer').width());
    }

    // Code to switch to advanced search mode
    $('#advancedSearchButton').click(function () {
        $("body").animate({"background-color": "white"}, 1);
        $("#mainSearchDiv").slideUp(50);
        $('#advancedSearchDiv').slideUp(100);
        $('#avaloqInverted').show("slide", { direction: "left" }, 600);
        $('.hideme').fadeIn(100);
        $('.hideme').css("display", "unset");
        onResize();
    });

    // Code to switch to main search mode
    $('#backToMainSearch').click(function () {
        $('#avaloqInverted').promise().done(function(){
            $("body").css("background-color", "#1F559F");
            $('.hideme').hide();
            $("#mainSearchDiv").slideDown();
            $('#avaloqInverted').hide(20);
            onResize();
        });
    });


    // Attach JQuery callendar to date fields
    $('#fromDateInput, #toDateInput').datepicker({ dateFormat: 'dd-mm-yy' });

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
                (d.getFullYear() - 1);
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

    // Code for the reset button effect
    $('#resetButton').mouseover(function () {
        $('#resetButton').text("Reset");
    });
    $('#resetButton').mouseout(function () {
        $('#resetButton').text("");
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
    $(document).on('click', '.notifyjs-resetConfirm-base .no', function () {
        $(this).trigger('notify-hide');
    });
    $(document).on('click', '.notifyjs-resetConfirm-base .yes', function () {
        $("#advancedSearchForm").trigger("reset");
        $('#fromDateInput, #toDateInput').prop('disabled', false);
        $(this).trigger('notify-hide');
    });
    $('#resetButton').click(function () {
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


});

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

function onResize() {
    // Code to center main search div on page resize
    $('body').css('overflow', 'visible');
    newWidthMain = ($(window).width() - $('#mainSearchDiv').width()) / 2;
    if (newWidthMain <= 0) {
        $('#mainSearchDiv').css('left', '20px');
    } else {
        $('#mainSearchDiv').css('left', newWidthMain + 'px');
    }

    // Code to center advanced search div on page resize
    newWidthAdv = ($(window).width() - $('#advancedSearchDiv').width()) / 2 + 20;
    if (newWidthAdv <= 0) {
        $('#advancedSearchDiv').css('left', '20px');
    } else {
        $('#advancedSearchDiv').css('left', newWidthAdv + 'px');
    }

    // Code to reposition the back to main search button
    $('#backToMainSearch').css('left', $('#advancedSearchDiv').width() * 1 + 1 * $('#advancedSearchDiv').css('left').slice(0, -2) + "px");
}