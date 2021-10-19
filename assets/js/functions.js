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
    $('.content').find('img').click(function() {
        var content = '<div class="animalcontainer">' + $(this).closest('.animalcontainer').html() + '</div>';
        if (content == '<div class="animalcontainer">undefined</div>')
            content = '<div class="foodcontainer">' + $(this).closest('.foodcontainer').html() + '</div>';
        $('.lightbox').html(content);
        $('.lightbox').addClass('show');
    })
    $('.lightbox').click(function(e) {
        if(e.target !== e.currentTarget) return;
        $(this).toggleClass('show');
    })
    
});

function search(params) {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    console.log(filter);
    accordions = document.getElementsByClassName('accordion-content');
    //console.log(accordions);

    foundAcc = [];
    console.log()


    for (let acc of accordions) {
        var animals = ([].slice.call(acc.getElementsByClassName("animal-headline"))).map(x=>x.innerText.toUpperCase());
        
        animals.forEach(element => {
            if(element == filter)
                foundAcc.push(acc);
        });
    }

    foundAcc.forEach(a => {
        a.classList.toggle('show'); 
        $(a).slideToggle(600);
    });

    // for (i = 0; i < li.length; i++) {
    //     a = li[i].getElementsByTagName("a")[0];
    //     txtValue = a.textContent || a.innerText;
    //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //         li[i].style.display = "";
    //     } else {
    //         li[i].style.display = "none";
    //     }
    // }
}