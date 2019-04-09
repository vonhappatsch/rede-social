let USER_ID = window.location.search.match(/\?userId=(.*)/)[1];

$(document).ready(function(){ 
  database.ref("users/" + USER_ID).once("value")
  .then(function(snapshot){
    let userInfo = snapshot.val()
    // $(".user-name").text(userInfo.name)
    console.log(userInfo);

    database.ref(`posts/` + USER_ID).once('value').then(function(snapshot){
      snapshot.forEach(function(childSnapshot){
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        console.log(childData);
        managePost(childData.text, childKey, userInfo.name);
        
        //$(".post-list").append(`<li>${childData.text}<li>`);
      });    
    });
  })

  $("#select").change(function(){
    let sos = $(this).val();

    database.ref("users/" + USER_ID).once("value")
      .then(function(snapshot){
        let userInfo = snapshot.val()
        // $(".user-name").text(userInfo.name)
        console.log(userInfo);

        database.ref(`posts/` + USER_ID).once('value').then(function(snapshot){
          $(".post-list").html("");
          snapshot.forEach(function(childSnapshot){
            let childKey = childSnapshot.key;
            let childData = childSnapshot.val();
            console.log(childData);

            if (childData.type === sos) {
              managePost(childData.text, childKey, userInfo.name);
            } else if (sos === "all") {
              managePost(childData.text, childKey, userInfo.name);
            }
            
          });    
        });
      })

    

  });

  // database.ref(`users/`).once('value')
  // .then(function(snapshot){
  //   snapshot.forEach(function(childSnapshot){
  //     let childKey = childSnapshot.key;
  //     let childData = childSnapshot.val();
  //     createUsers(childData.name, childKey);
  //   });    
  // });


  $(".send-button").click(function(event) {
    event.preventDefault();
    let text = $(".post-input").val();
    $(".post-input").val("");

    let privacyOpt = $('input[name=post-check]:checked').val();

    let res = confirm("Você deseja mesmo postar?");

    if (res) {
      database.ref("users/" + USER_ID).once("value")
      .then(function(snapshot){
        let userInfo = snapshot.val();
        let newPostInDb = database.ref(`posts/` + USER_ID).push({
          text: text,
          type: privacyOpt
        });
        managePost(text, newPostInDb.key, userInfo.name);
      });
    }
  });





  function managePost(text, key, name){
    $(".post-list").append(`
    <div>
      <p class="userInfo">${name}</p> 
      <div class="posts">
        <p data-text-id="${key}" class="palommers-post">${text}</p>
      </div>
      <div class="post-btns d-flex justify-content-end">
        <button data-edit-id="${key}" class="edit-post btn btn-sm btn-outline-dark">Editar</button>
        <button data-delete-id="${key}" class="delete-post btn btn-sm btn-outline-danger">Deletar</button>
      <div>
    </div>
    `);

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
  }

});


// function createUsers(name, key){
//   $(".users-list").append(`
//   <li>
//     <span>${name}</span>
//     <button data-user-id="${key}">seguir</button>
//   </li>
//   `);
// }

