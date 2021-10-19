$(document).ready(function () {
    $('.toggler').click(function () {
        $(this).toggleClass('show');
        $(this).next('.accordion-content').toggleClass('show'); 
        $(this).next('.accordion-content').slideToggle(600);
    });
});
