
$(document).ready(function () {
    // Accordion expand and close
    $('.toggler').click(function () {
        $(this).toggleClass('show');
        $(this).next('.accordion-content').toggleClass('show');
        $(this).next('.accordion-content').slideToggle(600);
    });
    // Expand first accordion by default
    var elanimal = $('.animals').find('.toggler:first');
    var elfood = $('.foods').find('.toggler:first');
    elanimal.toggleClass('show');
    elanimal.next('.accordion-content').toggleClass('show');
    elanimal.next('.accordion-content').slideToggle(600);
    elfood.toggleClass('show');
    elfood.next('.accordion-content').toggleClass('show');
    elfood.next('.accordion-content').slideToggle(600);


    // Lightbox behaviour on animal click
    $('.accordion').find('img').click(function () {
        var content = '<div class="animalcontainer">' + $(this).closest('.animalcontainer').html() + '</div>';
        if (content == '<div class="animalcontainer">undefined</div>') {
            content = '<div class="foodcontainer">' + $(this).closest('.foodcontainer').html() + '</div>';
        } 
        $('.lightbox').html(content);
        $('.lightbox').addClass('show');
        setTimeout(function() { 
            $('.lightbox').find('.animalcontainer').addClass('show');
            $('.lightbox').find('.foodcontainer').addClass('show');
        }, 100);
    })
    $('.lightbox').click(function (e) {
        if (e.target !== e.currentTarget) return;
        $('.lightbox').find('.animalcontainer').removeClass('show');
        $('.lightbox').find('.foodcontainer').removeClass('show');
        setTimeout(function() { 
            $('.lightbox').toggleClass('show');
        }, 1000);
        
    })

    // ScrollToTop
    $("#totop").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".content").offset().top
        }, 800);
    });

    // Search
    document.getElementById('search').addEventListener('keyup', function () {
        this.classList.remove('error');
        var containers = document.getElementsByClassName("animalcontainer");
        for (var i = 0; i < containers.length; i++) {
            containers.item(i).classList.remove('highlight');
        }
    })
    document.getElementById('search').addEventListener('keyup', debounce((bla) => {
        var search = document.getElementById('search').value;
        toggleAndScrollTo(search.toLowerCase().replace(/\s/g, ''));
    }, 1000));


});

function debounce(callback, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(function () { callback.apply(this, args); }, wait);
    }
}

function toggleAndScrollTo(anchor) {
    if (anchor == "") {
        return;
    }
    if (/[^a-zA-Z]+/.test(anchor)) {
        $('#search').addClass('error');
        return;
    }

    var anchorel = $('#' + anchor);
    if (anchorel.length) {
        var el = anchorel.closest('.accordion-content');
        if (!el.hasClass('show')) {
            el.toggleClass('show');
            el.slideToggle(400);
        }
        anchorel.addClass('highlight');
        $('html, body').animate({
            scrollTop: anchorel.offset().top
        }, 800);
        hideMobileKeyboard($('#search'));
        $('#search').val('');
    }
    else {
        $('#search').addClass('error');
    }

}

function hideMobileKeyboard(element) {
    element.attr('readonly', 'readonly'); // Force keyboard to hide on input field.
    element.attr('disabled', 'true'); // Force keyboard to hide on textarea field.
    setTimeout(function() {
        element.blur();  //actually close the keyboard
        // Remove readonly attribute after keyboard is hidden.
        element.removeAttr('readonly');
        element.removeAttr('disabled');
    }, 100);
}