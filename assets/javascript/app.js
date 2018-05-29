
var topics = ['happy', 'frustrated', 'embarassed', 'surprised', 'angry', 'bored'];
var aside = $('#topics');
var data;
var offset = 0;
var currentQuery = undefined;

//init masonry
var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
  })

function callGify (query, callback) {
    var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=zlEsPY1h8Xym7X61wEe9RncZ973KIsCt&q=${query}&limit=12&offset=${offset}&rating=PG&lang=en`;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: 'GET',
        success: callback
    }).then(() => offset += 12);
}

function createCard(gif) {
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
        arr.push(createCard(gif));
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

function prependCard(response){
    data = response.data;
    console.log(data);

    var arr = [];

    $(data).each(function(i, gif){
        arr.push(createCard(gif));
    });

    $grid
        .prepend(arr)
        .masonry('prepended', arr)
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
        .text(item)
        .attr('data-selected', false);
    aside.append(btn);
});

$('#addBtn').on('click', function () {
    event.preventDefault();
    var query = $('#query').val().trim();
    var btn = $('<button>')
        .addClass('aside-btn')
        .text(query)
        .val(query)
        .attr('data-selected', 'false');
    aside.prepend(btn);
});

$(document).on('click', '.aside-btn', function () {
    var selected = $(this).attr('data-selected');
    if (selected === 'true'){
        var arr = [];
        offset = 0;
        currentQuery = undefined;
        console.log('element has been un-selected');
       
        $(this).attr('data-selected', false);
        $('.grid-item').each((i, item) => arr.push(item));
        
        $grid
            .masonry('remove', arr)
            .masonry();      
        }else if (selected === 'false') {
            console.log('element has been selected');
            $(this).attr('data-selected', true);
            currentQuery = $(this).val();
            callGify(currentQuery, prependCard);  
            $(this).addClass('aside-btn--selected')
    }
});


window.onscroll = function () {
    var scrolled = Math.floor(document.documentElement.scrollHeight - document.documentElement.scrollTop) <= document.documentElement.clientHeight - 1;
    if(currentQuery !== undefined && scrolled){
        callGify(currentQuery, appendCard);
    }
};


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

