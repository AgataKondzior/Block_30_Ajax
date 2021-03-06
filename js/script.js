    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

   
    $wikiElem.text("");
    $nytElem.text("");

    //  streetview
    
    // YOUR CODE GOES HERE!
function loadData() {
    
    var streetStr = $("#street").val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;
    
    $greeting.text('So you want to live at ' + address + '?');
    
    var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '&key=AIzaSyAqFkI4F9U0Ju3O8JYQobfbd98wERflkzA';
    $body.append('<img class="bgimg" src="'+ streetViewUrl + ' ">');
 
    //  NYT AJAX request
      var nytimesURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=fbcdeca7d9db4a279ce913f501a3647b'  
        $.getJSON(nytimesURL, function(data){
            console.log(data);
            
            $nytHeaderElem.text('New York Times Articles About ' + cityStr);
            
            articles = data.response.docs;
            for (var i = 0; i < articles.length; i++) {
               var article = articles[i];
               $nytElem.append('<li class="article">'+
                    '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
                    '<p>' + article.snippet + '</p>'+'</li>');
           }
        });
            //.error(function(e) {
          //  $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
            
    // Wikipedia
            var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
            
            $.ajax({
                url: wikiUrl,
                dataType:"jsonp",
                
                success: function( response ) {
                    var articleList = response[1];
                    
                    for (var i = 0; i< articleList.length; i++) {
                        articleStr = articleList [i];
                        var url = 'https://en.wikipedia.org/wiki/' + articleStr;
                        $wikiElem.append('<li><a href="'+ url + '">' + articleStr + '</a></li>');
                    };
                }
            });
        
    return false;   
};

$('#form-container').submit(loadData);
