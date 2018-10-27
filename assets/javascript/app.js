var topics = ["A Christmas Story", "Elf", "Love Actually", "A Charlie Brown Christmas",
"Polar Express", "It's A Wonderful Life", "Home Alone", "Miracle on 34th St", "National Lampoon's Christmas Vacation",
"White Christmas", "Nightmare Before Christmas", "How The Grinch Stole Christmas", "The Santa Clause"]

  renderButtons();

  function renderButtons() {
    console.log("rendering buttons");
        // Deleting the movies prior to adding new toons
        // (this is necessary otherwise you will have repeat buttons)
    $("#buttons").empty();
        // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button class='btn-primary'>");
          // Adding a class of movieChar to our button
      a.addClass("movieChar");
          // Adding a data-attribute
      a.attr("data-movie", topics[i]);
          // Providing the initial button text
      a.text(topics[i]);
          // Adding the button to the buttons-view div
      $("#buttons").append(a);
    }
  };

$(document).ready(function(){
// Event listener on movie buttons.
  $("#buttons").on("click", ".movieChar", function() {
    console.log("button has clicked");
      // Getting and storing the data-movie property value from the button
    var movieChar = $(this).attr("data-movie");
      // Constructing a queryURL using the cartoon character name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        movieChar + "&api_key=dc6zaTOxFJmzC&limit=10";
      // Making an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
      .done(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {
        // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div with the class "item"
            var gifDiv = $("<div class='gifBucket'>");
          // Storing the result item's rating
            var rating = results[i].rating;
          // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);
          // Creating an image tag
            var movieImage = $("<img>");
          // Giving the image tag a src attribute of a property pulled from the
          // result item
            movieImage.attr("class", "gif");
            movieImage.attr("src", results[i].images.fixed_height_still.url);
            movieImage.attr("data-still", results[i].images.fixed_height_still.url);
            movieImage.attr("data-animate", results[i].images.fixed_height.url);
            movieImage.attr("data-state", "still");
          // Appending the paragraph and movieImage we created to the "gifDiv" div we created
            gifDiv.append(movieImage);
            gifDiv.append(p);

            $("#gifs-are-here").prepend(gifDiv);
          }
        }  
      });     
    });

    $(document).on("click", ".gif", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      console.log("gif clicked state=" + state);
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      };
    });

    $("#movieAdder").on("click", function(event) {
      console.log("Submit pressed");
      event.preventDefault();
      // routine for adding a new Movie button.  Invoked by Submit button
      var newMovie = $("#addMovie").val().trim();
      // If a value is entered add it to the topics array and re-render
      // the buttons.
      if (newMovie !== "") { 
        topics.push(newMovie);
/*        $("#addMovie").empty(); */
        renderButtons();
      };
    });  
});
