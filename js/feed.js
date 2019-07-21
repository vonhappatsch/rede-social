const postsRef = firebase.database().ref('feed/');

$(document).ready(function() {
  postsRef.once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      let childKey = childSnapshot.key;
      let childData = childSnapshot.val();
      createPost(childData.text);
    });
  });

  $('.send-button').click(function(event) {
    event.preventDefault();

    let newPost = $('.post-input').val();
    $('.post-input').val("");
    createPost(newPost);

    postsRef.push({
      text: newPost
    });
  });


  function createPost(newPost){
    $('.post-list').append(`
    <div class="posts">
      <p class="palommers-post">${newPost}</p>
    </div>
    <div class="post-btns">
      <button class="edit-post btn btn-sm btn-outline-dark">Editar</button>
      <button class="delete-post btn btn-sm btn-outline-danger">Deletar</button>
    <div>`);
  }

});
