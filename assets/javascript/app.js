
var topics = [
    "Cinderella",
    "Snow White",
    "Jungle Book",
    "Lion King",
    "Little Mermaid"
]

for (let i = 0; i < topics.length; i++) {
    var button = $("<button>").text(topics[i]);
    button.attr("data-show", topics[i]);
    button.addClass("btn btn-primary giftasticButton");
    $(".buttonsGoHere").append(button);
}

$("#addAShow").on("click", function(event){
    event.preventDefault();
   
    var newShow = $("#showTitle").val().trim();
    console.log(newShow);
   
    topics.push(newShow);
    
    var newButton = $("<button>").text(newShow.toLowerCase());
    newButton.attr("data-show", newShow);
    newButton.addClass("btn btn-primary giftasticButton");
    $(".buttonsGoHere").append(newButton);
   
    $("#showTitle").val("");
})

$(document).on("click", ".giftasticButton", function(){
    
    var show = $(this).attr("data-show");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=XF5yEg78kEQWh5mrwiFbX8L2zdN7ETRy&limit=10";
    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var results = response.data;
        console.log(results);
        
        var gifContainer = $("<div class ='gifContainer col-md-3'>");
       
        for (let i = 0; i < results.length; i++) {
           
            let rating = results[i].rating;
            let p = $("<p>").text("Rating: " + rating);
            let GIF = $("<img class='result'>");
           
            GIF.attr("src", results[i].images.fixed_height_still.url);
    		GIF.attr("data-state", "still");
    		GIF.attr("data-still", results[i].images.fixed_height_still.url);
            GIF.attr("data-animate", results[i].images.fixed_height.url);
            
            gifContainer.prepend(GIF);
            gifContainer.prepend(p);
            $(".gifsGoHere").prepend(gifContainer);
        }
    })

    $(document).on("click", ".result", function() {
        var state = $(this).attr("data-state");
        if(state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
})
