﻿$(document).ready(function () {
    $('input[type=radio][name=dateRadio]').change(function () {
        var dateVal = $('input[name="dateRadio"]:checked').val();
        if (dateVal != 0) {
            $('#from-date-input, #to-date-input').prop('disabled', true);
            var d = new Date();
            var fromDate;
            var toDate;
            var month;
            var day;
            if (dateVal == 1) {
                month = d.getMonth() + 1;
                day = d.getDate();
                toDate = d.getFullYear() + '-' +
                (month < 10 ? '0' : '') + month + '-' +
                (day < 10 ? '0' : '') + day;
                d.setDate(d.getDate() - 7);
                month = d.getMonth() + 1;
                day = d.getDate();
                fromDate = d.getFullYear() + '-' +
                (month < 10 ? '0' : '') + month + '-' +
                (day < 10 ? '0' : '') + day;
                $('#from-date-input').val(fromDate);
                $('#to-date-input').val(toDate);
            }
            if (dateVal == 2) {
                month = d.getMonth() + 1;
                day = d.getDate();
                toDate = d.getFullYear() + '-' +
                (month < 10 ? '0' : '') + month + '-' +
                (day < 10 ? '0' : '') + day;
                month = d.getMonth();
                day = d.getDate();
                fromDate = d.getFullYear() + '-' +
                (month < 10 ? '0' : '') + month + '-' +
                (day < 10 ? '0' : '') + day;
                $('#from-date-input').val(fromDate);
                $('#to-date-input').val(toDate);
            }
            if (dateVal == 3) {
                month = d.getMonth() + 1;
                day = d.getDate();
                toDate = d.getFullYear() + '-' +
                (month < 10 ? '0' : '') + month + '-' +
                (day < 10 ? '0' : '') + day;
                month = d.getMonth() + 1;
                day = d.getDate();
                fromDate = (d.getFullYear()-1) + '-' +
                (month < 10 ? '0' : '') + month + '-' +
                (day < 10 ? '0' : '') + day;
                $('#from-date-input').val(fromDate);
                $('#to-date-input').val(toDate);
            }
        } else {
            $('#from-date-input, #to-date-input').prop('disabled', false);
        }
    });

    // Code to swap between search and upload views and to handle IE's lack of support for CSS transforms
    $('.cardFlip').click(function () {
        if (detectIE() == false) {
            $('#card').toggleClass('flipped');
            setTimeout(function () { $('#mainsearch').toggleClass('hideme'); }, 300);
        } else {
            $('#mainsearch').toggle(20);
            $('#backCard').toggleClass('back');
            if ($('#backCard').hasClass('back')) {
                $('#backCard').hide();
            } else {
                $('#backCard').show();
            }
        }
    });

    // Code for view switch button transparency
    $('#toUpload, #uploadToSearch').hover(function () {
        $('#toUpload, #uploadToSearch').css('background-color', '#ffffff');
    }, function () {
        $('#toUpload, #uploadToSearch').css('background-color', 'rgba(255, 255, 255, 0.9)');
    });

    // Code to center main search div on load
    var newWidthMain = ($(window).width() - $('#mainsearch').width()) / 2;
    if (newWidthMain <= 0) {
        $('#mainsearch').css('left', '20px');
    } else {
        $('#mainsearch').css('left', newWidthMain + 'px');
    }

    // Code to center advanced search div on load
    var newWidthAdv = ($(window).width() - $('#advanced-container').width()) / 2 + 20;
    if (newWidthAdv <= 0) {
        $('#advanced-container').css('left', '20px');
    } else {
        $('#advanced-container').css('left', newWidthAdv + 'px');
    }

    // On resize handler to reposition divs
    $(window).resize(function () {
        onResize();
    });

    // Code to position the back to main search button
    $('#backToSimple').css('left', $('#advanced-container').width() * 1 + 1 * $('#advanced-container').css('left').slice(0, -2) + "px");

    // Code for the footer image in advanced search mode
    if(detectIE() == false){
        $('#footer').css('top', screen.height - $('#footer').height() - 120);
        $('#footer').css('left', screen.width - $('#footer').width());
    } else {
        $('#footer').css('down', screen.height - $('#footer').height());
        $('#footer').css('left', screen.width - $('#footer').width());
    }

    // Tweaks for some of the fields
    $('.options').buttonset();
    $('#from-date-input, #to-date-input').datepicker({ dateFormat: 'yy-mm-dd' });

    // Code to switch to advanced search mode
    $('#advancedsearchbutton').click(function () {
        $("body").animate({"background-color": "white"}, 1);
        $("#mainsearch").slideUp(50);
        $('#advanced-container').slideUp(100);
        $('#avaloqinverted').show("slide", { direction: "left" }, 600);
        $('.hideme').fadeIn(100);
        $('.hideme').css("display", "unset");
        onResize();
    });

    // Code to switch to main search mode
    $('#backToSimple').click(function () {
        $('#avaloqinverted').promise().done(function(){
            $("body").css("background-color", "#1F559F");
            $('.hideme').hide();
            $("#mainsearch").slideDown();
            $('#avaloqinverted').hide(20);
            onResize();
        });
    });

    // Code for the Reset button effect
    $('#reset-adv-b').mouseover(function () {
        $('#reset-adv-b').text("Reset");
    });
    $('#reset-adv-b').mouseout(function () {
        $('#reset-adv-b').text("");
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
        $("#advancedsearchform").trigger("reset");
        $(this).trigger('notify-hide');
    });
    $('#reset-adv-b').click(function () {
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

    // Synchronize main search and advanced search fields
    $('#searchboxtext').change(function () {
        $('#titleboxtext').val($('#searchboxtext').val());
    });
    $('#titleboxtext').change(function () {
        $('#searchboxtext').val($('#titleboxtext').val());
    });
});

// Function to determine if the browser is IE
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
    newWidthMain = ($(window).width() - $('#mainsearch').width()) / 2;
    if (newWidthMain <= 0) {
        $('#mainsearch').css('left', '20px');
    } else {
        $('#mainsearch').css('left', newWidthMain + 'px');
    }

    // Code to center advanced search div on page resize
    newWidthAdv = ($(window).width() - $('#advanced-container').width()) / 2 + 20;
    if (newWidthAdv <= 0) {
        $('#advanced-container').css('left', '20px');
    } else {
        $('#advanced-container').css('left', newWidthAdv + 'px');
    }

    // Code to reposition the back to main search button
    $('#backToSimple').css('left', $('#advanced-container').width() * 1 + 1 * $('#advanced-container').css('left').slice(0, -2) + "px");
}