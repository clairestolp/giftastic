
var topics = ['happy', 'frustrated', 'embarassed', 'surprised', 'angry', 'bored'];
var aside = $('#topics');
var data;
var offset = 0;

/* function addCard (gif) {
    var container = $('<div>')
        .addClass('grid-item');

    var img = $('<img>', {src: gif.images.downsized_still.url, alt: gif.slug})
        .addClass('result-img')
        .attr('data-still', gif.images.downsized_still.url)
        .attr('data-animated', gif.images.downsized.url)
        .attr('data-state', 'still');
    
    var card = $('<div>')
        .addClass('result-item');
    var title = $('<p>')
        .text(gif.title)
        .addClass('result-text')
        .css('font-weight', 'bold');
    var rating = $('<p>')
        .text(gif.rating)
        .addClass('result-text');
    
    card
        .append(img)
        .append(title)
        .append(rating);

    container.append(card);
    return container;
}*/

function addCard(gif) {
    var elem = document.createElement('div')
        elem.setAttribute('class', 'grid-item');

    var stillImg =  gif.images.downsized_still.url;
    var animatedImg =  gif.images.downsized.url;
    var img = document.createElement('img');
        img.setAttribute('class', 'result-img');
        img.setAttribute('src', stillImg);
        img.setAttribute('data-still', stillImg);
        img.setAttribute('data-animated',animatedImg);
        img.setAttribute('data-state', 'still');
    
    var card = document.createElement('div');
        card.setAttribute('class', 'result-item');

    var title = document.createElement('p');
        title.innerText = gif.title;
        title.setAttribute('class', 'result-text');

    var rating = document.createElement('p');
        rating.innerText = gif.rating;
        rating.setAttribute('class', 'result-text');

    card.append(img);
    card.append(title);
    card.append(rating);

    elem.append(card);
    return elem;
};

function appendCard(response){
    data = response.data;
    console.log(data);

    var arr = [];

    var $grid = $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
      });

    $(data).each(function(i, gif){
        arr.push(addCard(gif));
    });

    $grid
        .append(arr)
        .masonry('appended', arr)
        .masonry('layout');
    
    $grid.imagesLoaded().progress(function () {
        $grid.masonry();
    });

    console.log(results);
}



topics.forEach(function (item, index) {
    var btn = $('<button>')
        .addClass('aside-btn')
        .val(item)
        .text(item);
    aside.append(btn);
});

$('#addBtn').on('click', function () {
    event.preventDefault();
    var query = $('#query').val().trim();
    var btn = $('<button>')
        .addClass('aside-btn')
        .text(query)
        .val(query);
    aside.prepend(btn);
});

$(document).on('click', '.aside-btn', function () {
    var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=zlEsPY1h8Xym7X61wEe9RncZ973KIsCt&q=${$(this).val()}&limit=12&offset=${offset}&rating=PG&lang=en`;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: 'GET',
        success: appendCard
    }).then(() => offset += 12);
});

$(document).on('click', '.grid-item', function () {
    var img = $(this).find('img');
    var imgState = img.attr('data-state');
    if(imgState === 'still'){
        img
            .attr('data-state', 'animated')
            .attr('src', img.attr('data-animated'));
    }else{
        $(img)
            .attr('data-state', 'still')
            .attr('src', img.attr('data-still'));
    }   
});