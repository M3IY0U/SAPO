$(document).ready(function () {
    $('.toggler').click(function () {
        $(this).toggleClass('show');
        $(this).next('.accordion-content').toggleClass('show'); 
        $(this).next('.accordion-content').slideToggle(600);
    });
    var el = $('.toggler').first();
    el.toggleClass('show');
    el.next('.accordion-content').toggleClass('show');
    el.next('.accordion-content').slideToggle(600);
    
});
