$(document).ready(function () {
    
    // Code to swap between search and upload views and to handle IE's lack of support for CSS transforms
    $('.cardFlip').click(function () {
        if (detectIE() == false) {
            $('#switchModeDiv').toggleClass('flipped');
            setTimeout(function () { $('#mainSearchDiv').toggleClass('hideme'); }, 300);
        } else {
            $('#mainSearchDiv').toggle(20);
            $('#uploadMode').toggleClass('back');
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
    $('#fromDateInput, #toDateInput').datepicker({ dateFormat: 'yy-mm-dd' });

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
                (d.getFullYear() - 1);
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

    // other browser
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