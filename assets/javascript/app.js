
var topics = ['happy', 'frustrated', 'embarassed', 'surprised', 'angry', 'bored'];
var aside = $('#topics');
var data;
var offset = 0;

function addCard (gif) {

    var img = $('<img>', {class: 'grid-item', src: gif.images.downsized_still.url, alt: gif.slug})
        .attr('data-still', gif.images.downsized_still.url)
        .attr('data-animated', gif.images.downsized.url)
        .attr('data-state', 'still');

    return img;
}

//when aside btn is clicked, ajax call
    //document.on('click', '.aside-btn', callback)
    //prepend results to #results
//add btn to clear results div


topics.forEach(function (item, index) {
    var btn = $('<button>')
        .addClass('btn btn-primary m-2 aside-btn')
        .val(item)
        .text(item);
    aside.append(btn);
});

$('#addBtn').on('click', function () {
    event.preventDefault();
    var query = $('#query').val().trim();
    var btn = $('<button>')
        .addClass('btn btn-primary m-2 aside-btn')
        .text(query)
        .val(query);
    aside.prepend(btn);
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
        
        $(data).each(function(i, gif){
            $('.grid').append(addCard(gif));
        }); 

        var $grid = $('.grid').imagesLoaded().progress(function() {
            $('.grid').masonry({
              itemSelector: '.grid-item',
              columnWidth: '.grid-sizer',
              percentPosition: true,
              horizontalOrder: true
            });
          });
        

        offset += 12;
        console.log(results);
    });
});

$(document).on('click', '.card', function () {
    var childImg = $(this).find('img');
    var imgState = childImg.attr('data-state');
    if(imgState === 'still'){
        childImg
            .attr('data-state', 'animated')
            .attr('src', childImg.attr('data-animated'));
    }else{
        childImg
            .attr('data-state', 'still')
            .attr('src', childImg.attr('data-still'));
    }   
});