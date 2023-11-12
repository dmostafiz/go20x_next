// JavaScript Document

$(document).ready(function () {


    $(".play-btn").click(function () {
        $(this).siblings(".v-poster").hide();
        $(this).hide();
        // $(this).siblings(".video")[0].src += "&autoplay=1";
        $(this).siblings(".video").css("opacity", "1");

        var video_src = $(this).parent().attr("data-video");
        $(this).siblings(".video").attr("src", video_src);
    });



    // OFI Browser
    objectFitImages();
});
