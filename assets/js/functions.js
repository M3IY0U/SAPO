$(document).ready(function () {
    // Accordion expand and close
    $('.toggler').click(function () {
        $(this).toggleClass('show');
        $(this).next('.accordion-content').toggleClass('show'); 
        $(this).next('.accordion-content').slideToggle(600);
    });
    // Expand first accordion by default
    var el = $('.toggler').first();
    el.toggleClass('show');
    el.next('.accordion-content').toggleClass('show');
    el.next('.accordion-content').slideToggle(600);


    // Lightbox behaviour on animal click
    $('img').click(function() {
        var content = '<div class="animalcontainer">' + $(this).closest('.animalcontainer').html() + '</div>';
        $('.lightbox').html(content);
        $('.lightbox').addClass('show');
    })
    
});
