let USER_ID = window.location.search.match(/\?userId=(.*)/)[1];

$(document).ready(function(){ 
  database.ref("users/" + USER_ID).once("value")
  .then(function(snapshot){
    let userInfo = snapshot.val();

    database.ref(`posts/` + USER_ID).once('value').then(function(snapshot){
      snapshot.forEach(function(childSnapshot){
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        managePost(childData.text, childKey, userInfo.name, childData.likes);
      });    
    });
  })

  $("#select").change(function(){
    let feed = $(this).val();

    database.ref("users/" + USER_ID).once("value")
      .then(function(snapshot){
        let userInfo = snapshot.val();

        database.ref(`posts/` + USER_ID).once('value').then(function(snapshot){
          $(".post-list").html("");
          snapshot.forEach(function(childSnapshot){
            let childKey = childSnapshot.key;
            let childData = childSnapshot.val();

            if (childData.type === feed) {
              managePost(childData.text, childKey, userInfo.name, childData.likes);
            } else if (feed === "all") {
              managePost(childData.text, childKey, userInfo.name, childData.likes);
            }
            
          });    
        });
      })
  });


  $(".send-button").click(function(event) {
    event.preventDefault();
    let text = $(".post-input").val();
    $(".post-input").val("");

    let privacyOpt = $('input[name=post-check]:checked').val();

    let confirmation = confirm("Você deseja mesmo postar?");

    if (confirmation) {
      database.ref("users/" + USER_ID).once("value")
      .then(function(snapshot){
        let userInfo = snapshot.val();
        let newPostInDb = database.ref(`posts/` + USER_ID).push({
          text: text,
          type: privacyOpt,
          likes: 0
        });
        managePost(text, newPostInDb.key, userInfo.username, 0);
      });
    }
  });

  function managePost(text, key, name, likes){
 
    $(".post-list").append(`
    <div>
      <p class="userInfo">${name}</p> 
      <div class="posts">
        <p data-text-id="${key}" class="palommers-post">${text}</p>
      </div>
      <div class="post-btns d-flex justify-content-end">
        <button data-edit-id="${key}" class="edit-post btn btn-sm btn-outline-dark">Editar</button>
        <button data-delete-id="${key}" class="delete-post btn btn-sm btn-outline-danger">Deletar</button>
        <button data-like-id="${key}" class="btn btn-sm outline-dark"><i class="fab fa-gratipay"></i></button><p class="like-result text-center" data-like-id="${key}">${likes}</p>
      <div>
    </div>
    `);

    $(`button[data-like-id=${key}]`).click(function(){
      let result = parseInt($(`.like-result[data-like-id="${key}"]`).text());
      result += 1;
      $(`.like-result[data-like-id="${key}"]`).text(result);
      console.log(result)
      database.ref('posts/' + USER_ID + "/" + key).update({
        likes: result
      })
    })

    

    $(`button[data-edit-id=${key}]`).click(function(){
      let newText = prompt(`Altere seu texto: ${text}`);

      if (newText) {
        $(`p[data-text-id=${key}]`).html(newText);
        database.ref('posts/' + USER_ID + "/" + key).update({
        text: newText
      })
      }
    });

    $(`button[data-delete-id=${key}]`).click(function(){
      let warning = confirm("Você tem certeza de que deseja deletar?");

      if (warning) {
        $(this).parent().parent().remove();
        database.ref('posts/' + USER_ID + "/" + key).remove();
      }
    });
  };



});

