$(document).ready(function () {


    $(".video-bx .play-icon").click(function () {
        $(this).hide();
        /*$(".video-img img").hide();*/
        $(".youtube-video iframe")[0].src += "?autoplay=1";
        $(".youtube-video").show();
    });

    /* **** AOS **** */
    // AOS.init({
    //     duration: 1000,
    // });
    /* **** End AOS **** */
});
