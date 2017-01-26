﻿$(document).ready(function () {
    $('.cardFlip').click(function () {
        $('#card').toggleClass('flipped');
    });

    $('#toUpload').hover(function () {
        $('#toUpload').css('background-color', '#ffffff');
    }, function () {
        $('#toUpload').css('background-color', 'rgba(255, 255, 255, 0.9)');
    });

    // Code to center main search div on load
    var newWidthMain = ($(window).width() - $('#mainsearch').width()) / 2;
    if (newWidthMain <= 0) {
        $('#mainsearch').css('left', '20px');
    } else {
        $('#mainsearch').css('left', newWidthMain + 'px');
    }

    // Code to center main search div on page resize
    $(window).resize(function () {
        newWidthMain = ($(window).width() - $('#mainsearch').width()) / 2;
        if (newWidthMain <= 0) {
            $('#mainsearch').css('left', '20px');
        } else {
            $('#mainsearch').css('left', newWidthMain + 'px');
        }
    });

    // Code to center advanced search div on load
    var newWidthAdv = ($(window).width() - $('#advanced-container').width()) / 2;
    if (newWidthAdv <= 0) {
        $('#advanced-container').css('left', '20px');
    } else {
        $('#advanced-container').css('left', newWidthAdv + 'px');
    }

    // Code to center advanced search div on page resize
    $(window).resize(function () {
        newWidthAdv = ($(window).width() - $('#advanced-container').width()) / 2;
        if (newWidthAdv <= 0) {
            $('#advanced-container').css('left', '20px');
        } else {
            $('#advanced-container').css('left', newWidthAdv + 'px');
        }
    });

    // Code to position the back to main search button
    $('#backToSimple').css('left', $('#advanced-container').width() * 1 + 1 * $('#advanced-container').css('left').slice(0, -2) + "px");
    $(window).resize(function () {
        $('#backToSimple').css('left', $('#advanced-container').width() * 1 + 1 * $('#advanced-container').css('left').slice(0, -2) + "px");
    });

    // Code for the footer image in advanced search mode
    $('#footer').css('top', screen.height - $('#footer').height() - 120);
    $('#footer').css('left', screen.width - $('#footer').width());

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
    });

    // Code to switch to main search mode
    $('#backToSimple').click(function () {
        $('#avaloqinverted').promise().done(function(){
            $("body").css("background-color", "#1F559F");
            $('.hideme').hide();
            $("#mainsearch").slideDown();
            $('#avaloqinverted').hide(20);
        });
    });

    // Code for the Reset and Submit effects
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