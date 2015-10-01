document.addEventListener("DOMContentLoaded", function() {

  // Set a variable which is an object which contains my access token
  // Note: {} means an object
  var access_token = "361852159.1fb234f.e73ac4c948a74d9a908c8101edde6297",
  access = {
        access_token: access_token
      };

  // Run a query selector and target the #hashtag-search form
  // Set form to variable entry
  var entry = $('#hashtag-search');
  // Attach a click event
  entry.submit(function(event) {
      // Assign a value 'input' to the user entry
      var input = tag.value;
      // If something is actually entered run the getImages function
      // Check if element exists source: https://css-tricks.com/snippets/jquery/check-if-element-exists/
      if(input.length) {
          getImages(input, 28, access);
      }
      event.preventDefault();
  });

  // Function to grab images from Instagram
  // Set a variable 'url' equal to the endpoint search for hashtags
  // Source: https://instagram.com/developer/endpoints/tags/
  // tag, count, & access are the parameters
  function getImages(tag, count, access) {
    var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?count=' + count + '&access_token=' + access;
    $.getJSON(url, access, dataLoaded);
}

//
function dataLoaded(data) {
    var container = $("#images-go-here");
    // data.meta is where meta codes from IG are stored
    // Meta code = 200 means all is well
    // Source: https://instagram.com/developer/endpoints/
    if (data.meta.code == 200) {
        // If meta = 200 create a variable photos that stores returned data
        var photos = data.data;
        // If that variable holds data then do the following
        if (photos.length > 0) {
            // Clears #images-go-here so that photos are not stacked on top of each other
            container.empty();
            // Create loop to handle multiple objects
            // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
            for (var key in photos) {
                // Create variable for one object
                var photo = photos[key];
                // After creating, append to #images-go-here
                // Use the thumbnail version of the photo from instagram, not the full res one
                container.append('<a href="' + photo.link + '"><img src="' + photo.images.thumbnail.url + '"></a>')
            }
        }
        // If variable 'photos' contains no data return NO RESULTS FOUND
        else {
            container.html("<span class='no-results'>NO RESULTS FOUND</span>");
        }
    }
    // If meta != 200 then display Instagram's error message
    else {
        var error = data.meta.error_message;
        container.html(error);
    }
}

// Set a grid of images using search term #goldengatebridge and display 28 results upon page load
getImages('goldengatebridge', 28, access);

});
