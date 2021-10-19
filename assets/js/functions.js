$('.toggler').click(function(){
    var el = $(this).next('.accordion-content');
    if (el) {
        el.toggleClass('inactive');
        el.toggleClass('active');
    }
});