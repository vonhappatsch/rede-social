let database = firebase.database();
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
  <li>
    <span data-text-id="${key}">${text}</span>
      <button data-edit-id="${key}">Editar</button>
      <button data-delete-id="${key}">Deletar</button>
  <li>
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