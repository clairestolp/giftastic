
var topics = ['happy', 'frustrated', 'embarassed', 'surprised', 'angry', 'bored'];
var aside = $('#topics');
var data;
var offset = 0;

function addCard (gif) {
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

var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    horizontalOrder: true
  });

$(document).on('click', '.aside-btn', function () {
    var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=zlEsPY1h8Xym7X61wEe9RncZ973KIsCt&q=${$(this).val()}&limit=12&offset=${offset}&rating=PG&lang=en`;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        data = response.data;
        console.log(data);

        $grid.masonry();
        var arr = [];
        $(data).each(function(i, gif){
            var card = addCard(gif)
                .addClass('grid-item');
            arr.push(card);
        });

        var $arr = $(arr);
        console.log('$arr', $(arr));

        $grid
            .append($arr)
            .masonry('appended', $arr)
            .masonry();
        
        

        
        //$('#grid').masonry( 'remove', $('#grid').find('.grid-item') ).masonry('layout');


        offset += 12;
        console.log(results);
    });
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