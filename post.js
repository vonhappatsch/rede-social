let USER_ID = window.location.search.match(/\?userId=(.*)/[1]);

$(document).ready(function(){ 
  database.ref("users/" + USER_ID).once("value")
  .then(function(snapshot){
    let userInfo = snapshot.val()
    $(".user-name").text(userInfo.name)
  })

  // database.ref(`users/`).once('value')
  // .then(function(snapshot){
  //   snapshot.forEach(function(childSnapshot){
  //     let childKey = childSnapshot.key;
  //     let childData = childSnapshot.val();
  //     createUsers(childData.name, childKey);
  //   });    
  // });

  database.ref(`posts/` + USER_ID).once('value').then(function(snapshot){
    snapshot.forEach(function(childSnapshot){
      let childKey = childSnapshot.key;
      let childData = childSnapshot.val();
      createPost(childData.text, childKey);
      //$(".post-list").append(`<li>${childData.text}<li>`);
    });    
  });

    $(".send-button").click(function(event) {
        event.preventDefault();

        let text = $(".post-input").val();
        $(".post-input").val("");

        let newPostInDb = database.ref(`posts/` + USER_ID).push({
          text: text
        });
        createPost(text, newPostInDb.key);
      
    });
});

function createPost(text, key){
  $(".post-list").append(`
  <div class="posts">
    <p data-text-id="${key}" class="palommers-post">${text}</p>
  </div>
  <div class="post-btns">
    <button data-edit-id="${key}" class="edit-post btn btn-sm btn-outline-dark">Editar</button>
    <button data-delete-id="${key}" class="delete-post btn btn-sm btn-outline-danger">Deletar</button>
  <div>
  `);

  $(`button[data-delete-id=${key}]`).click(function(){
    $(this).parent().remove();
    database.ref(`posts/` + USER_ID + "/" + key).remove();
  });

  $(`button[data-edit-id=${key}]`).click(function(){
    let newText = prompt(`Altere seu texto: ${text}`);
    $(`span[data-text-id=${key}]`).html(newText);
    database.ref(`posts/` + USER_ID + "/" + key).update({
      text: newText
    })    
  });
}



// function createUsers(name, key){
//   $(".users-list").append(`
//   <li>
//     <span>${name}</span>
//     <button data-user-id="${key}">seguir</button>
//   </li>
//   `);
// }