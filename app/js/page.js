$(function () {
    $("ul li").click(function () {
        $("ul li").removeClass("active");
        $(this).addClass("active")
    });
    document.location.href = '#/repos';
});