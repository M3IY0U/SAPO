
$(document).ready(function () {
    // ========== ACCORDION ==========
    // expand and close
    if ($('.accordion').length) {
        $('.toggler').click(function () {
            $(this).closest('.accordion').toggleClass('show');
            $(this).next('.accordion-content').slideToggle(600);
        });
        // expand first by default
        var elanimal = $('.animals').closest('.accordion:first-of-type');
        var elfood = $('.foods').closest('.accordion:first-of-type');
        elanimal.toggleClass('show');
        elanimal.find('.accordion-content').slideToggle(600);
        elfood.toggleClass('show');
        elfood.find('.accordion-content').slideToggle(600);
    }



    // ========== LIGHTBOX ==========
    if ($('.lightbox').length) {
        // open on animal click in accordion
        $('.accordion').find('img').click(function () {
            var content = '<div class="animalcontainer">' + $(this).closest('.animalcontainer').html() + '</div>';
            if (content == '<div class="animalcontainer">undefined</div>') {
                content = '<div class="foodcontainer">' + $(this).closest('.foodcontainer').html() + '</div>';
            }
            $('.lightbox').html(content);
            $('body').toggleClass('noscroll');
            $('.lightbox').toggleClass('show disabled');
            setTimeout(function () {
                $('.lightbox').find('.animalcontainer').toggleClass('show');
                $('.lightbox').find('.foodcontainer').toggleClass('show');
            }, 100);
            setTimeout(function () {
                $('.lightbox').toggleClass('disabled');
            }, 500);
            setTimeout(function () {
                if ($('.lightbox').find('.specialcontainer').length) {
                    $('.specialcontainer').toggleClass('show');
                }
            }, 1000);
        });

        // close on click aside or closebutton
        $('.lightbox').click(function (e) {
            if (e.target !== e.currentTarget && e.target.className !== 'closebutton' || $(this).hasClass('disabled')) return;
            $('body').toggleClass('noscroll');
            $('.lightbox').toggleClass('disabled');
            $('.lightbox').find('.animalcontainer').toggleClass('show');
            $('.lightbox').find('.foodcontainer').toggleClass('show');
            setTimeout(function () {
                $('.lightbox').toggleClass('show');
                $('.lightbox').toggleClass('disabled');
                if ($('.lightbox').find('.specialcontainer').length) {
                    $('.specialcontainer').toggleClass('show');
                }
            }, 500);
        });
        
    }

    // ========== SHOW & HIDE VERSIONS ==========
    if ($('.settings').length) {
        $('button').click(function() {
            // handle button classes
            $('button').each(function() {
                $(this).removeClass('active');
            });
            $(this).addClass('active');

            // handle animalcontainer classes
            $('.animalcontainer').each(function() {
                $(this).addClass('hide');
            });
            var myclass = $(this).attr('id');
            if (myclass == "both") {
                $('.animalcontainer').each(function() {
                    $(this).removeClass('hide');
                    return;
                });
            }
            $('.' + myclass).each(function() {
                $(this).removeClass('hide');
            });
            $('.both').each(function() {
                $(this).removeClass('hide');
            });
        });
    }

    // ========== SEARCH ==========
    // highlighting and error handling
    if ($('#search').length) {
        $('#search').keyup(function () {
            $('#search').removeClass('error');
            removeHighlightings();
        });
        $('#search').click(function () {
            removeHighlightings();
        });
        $('.accordion').find('img').click(function () {
            removeHighlightings();
        });
        // Search
        document.getElementById('search').addEventListener('keyup', debounce((c) => {
            var search = document.getElementById('search').value;
            toggleAndScrollTo(search.toLowerCase().replace(/\s/g, ''));
        }, 1000));
    }


    // ========== TOTOP ==========
    $("#totop").click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".content").offset().top
        }, 800);
    });

});

function removeHighlightings() {
    $('.animalcontainer').each(function() {
        $(this).removeClass('highlight');
    });
    $('.foodcontainer').each(function() {
        $(this).removeClass('highlight');
    });
}
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

    var anchorel = $('.' + anchor);
    if (anchorel.length && !anchorel.hasClass('hide')) {
        var accordion = anchorel.closest('.accordion');
        if (!accordion.hasClass('show')) {
            accordion.toggleClass('show');
            accordion.find('.accordion-content').slideToggle(400);
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
    setTimeout(function () {
        element.blur();  //actually close the keyboard
        // Remove readonly attribute after keyboard is hidden.
        element.removeAttr('readonly');
        element.removeAttr('disabled');
    }, 100);
}