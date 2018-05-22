//snippets of code to insert elements
    //"row": $('<div>').addClass('row'),
    // "resultItem": $('<div>').addClass('col-md-3 result-btn'),
    //"topicBtn": $('<button>').addClass('btn btn-primary aside-btn'),
    //"rating": $('<p>').addClass('results-text-light'),
    //"downloadIcon": $('<div>').addClass('results-icon')


//The theme for this app is emotions
var topics = ['happy', 'frustrated', 'embarassed', 'surprised', 'angry', 'bored'];
var aside = $('#topics');
var data;
var offset = 0;

function addCard (gif) {
    var container = $('<div>').addClass('col-md-3');
    var card = $('<div>')
        .addClass('card');
    var img = $('<img>', {class: 'card-img-top rounded', src: gif.images.downsized_still.url, alt: gif.slug})
        .attr('data-still', gif.images.downsized_still.url)
        .attr('data-animated', gif.images.downsized.url)
        .attr('data-state', 'still');
    var cardBody = $('<div>')
        .addClass('card-body')
        .append(`<p class="card-title">${gif.title}</p>`);

    card
        .append(img)
        .append(cardBody);

    container.append(card);
    return container;
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
    var query = $('#query').val();
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
        var row;
        $(data).each(function(i, gif){
            if(i % 4 === 0){
                row = $('<div>').addClass('row mb-2')
                    .append(addCard(gif));
                $('#results')
                    .addClass('rounded p-4')
                    .prepend(row);
            }else{
                row.append(addCard(gif));
            } 
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