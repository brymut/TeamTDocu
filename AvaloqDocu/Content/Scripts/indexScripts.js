$(document).ready(function(){
    var newWidthMain = ($(window).width() - $('#mainsearch').width()) / 2;
    if (newWidthMain <= 0) {
        $('#mainsearch').css('left', '20px');
    } else {
        $('#mainsearch').css('left', newWidthMain + 'px');
    }

    $(window).resize(function () {
        newWidthMain = ($(window).width() - $('#mainsearch').width()) / 2;
        if (newWidthMain <= 0) {
            $('#mainsearch').css('left', '20px');
        } else {
            $('#mainsearch').css('left', newWidthMain + 'px');
        }
    });

    var newWidthAdv = ($(window).width() - $('#advanced-container').width()) / 2;
    if (newWidthAdv <= 0) {
        $('#advanced-container').css('left', '20px');
    } else {
        $('#advanced-container').css('left', newWidthAdv + 'px');
    }

    $(window).resize(function () {
        newWidthAdv = ($(window).width() - $('#advanced-container').width()) / 2;
        if (newWidthAdv <= 0) {
            $('#advanced-container').css('left', '20px');
        } else {
            $('#advanced-container').css('left', newWidthAdv + 'px');
        }
    });
    $('#backToSimple').css('left', $('#advanced-container').width() * 1 + 1 * $('#advanced-container').css('left').slice(0, -2) + "px");
    $(window).resize(function () {
        $('#backToSimple').css('left', $('#advanced-container').width() * 1 + 1 * $('#advanced-container').css('left').slice(0, -2) + "px");
    });

    $('#footer').css('top', screen.height - $('#footer').height() - 120);
    $('#footer').css('left', screen.width - $('#footer').width());

    $("#submitbutton").mousedown(function () { $("#searchboxform").submit(); });

    $('.options').buttonset();

    $('#from-date-input, #to-date-input').datepicker({ dateFormat: 'yy-mm-dd' });

    $('#advancedsearchbutton').click(function () {
        $("body").css("background-color", "white");
        $("#mainsearch").slideUp(150);
        $('#advanced-container').fadeIn();
        $('#avaloqinverted').show("slide", { direction: "left" }, 350);
        $('.hideme').fadeIn(25);
        $('.hideme').css("display", "unset");
    });

    $('#backToSimple').click(function () {
        $("body").css("background-color", "#1F559F");
        $('.hideme').hide();
        $("#mainsearch").slideDown();
        $('#avaloqinverted').hide(20);;
    });

    $("#reset-adv-b").click(function () {
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

    $('#searchboxtext').keyup(function () {
        $('#titleboxtext').val($('#searchboxtext').val());
    });
    $('#titleboxtext').keyup(function () {
        $('#searchboxtext').val($('#titleboxtext').val());
    });
});