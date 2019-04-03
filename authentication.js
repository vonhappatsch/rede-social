const database = firebase.database();
const auth = firebase.auth();
const usersRef = database.ref('users');

$(document).ready(function(){
  
  $("#signInBtn").click(function() {
    let email = $("#login-input").val();
    let password = $("#password-input").val();

    auth.signInWithEmailAndPassword(email, password)
      .then(function() {
        // se deu certo
        window.location = "home.html";
      })

      .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // ...
      });
  });


  $("#loginGoogle").click(function(e) {
    e.preventDefault();
    let provider = new firebase.auth.GoogleAuthProvider();
    
    auth.useDeviceLanguage();
    auth.signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
        window.location = "home.html";
      }).catch(function(error) {
        console.log(error)
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
      }); 
  });


  $("#loginFacebook").click(function() {
    let provider = new firebase.auth.FacebookAuthProvider();

    auth.useDeviceLanguage();
    auth.signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
          window.location = "home.html";
      }).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase auth AuthCredential type that was used.
        let credential = error.credential;
        // ...
      });
    })


    auth.onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in
    
          let user = auth.currentUser;
    
          if (user != null) {
            name = user.name;
            displayName = user.displayName;
            lastname = user.lastname;
            username = user.username;
            email = user.email;
            password = user.password;
            emailVerified = user.emailVerified;
            uid = user.uid;
          }
        } else {
          // No user is signed in
        }
      });


  $("#logoutBtn").click(function() {
    auth.signOut().then(function() {
      // deu certo
        window.location = "index.html";
      }).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
      });
  });

});