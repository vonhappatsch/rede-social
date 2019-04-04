const postsRef = firebase.database().ref('feed');

$(document).ready(function() {
  $(".send-post").click(function(event) {
    event.preventDefault();

    let newPost = $(".palommers-posts-input").val();

    postsRef.push({
      text: newPost
    });

    $(".palommers-posts").append(`<p class="new-post-details">${newPost}</p>`);

  });
});