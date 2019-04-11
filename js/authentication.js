const database = firebase.database();

$(document).ready(function() {
  $('#signInBtn').click(function() {
    let email = $('#email-input').val();
    let password = $('#password-input').val();

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(result) {
        window.location = `home.html?userId=${result.user.uid}`;
      })

      .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // ...
      });
  });
  

  $('#loginGoogle').click(function(e) {
    e.preventDefault();
    let provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
        window.location = `home.html?userId=${result.user.uid}`;
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


  $('#loginFacebook').click(function() {
    let provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
          window.location = `home.html?userId=${result.user.uid}`;
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


    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in
          name = user.name;
          displayName = user.displayName;
          lastname = user.lastname;
          username = user.username;
          email = user.email;
          password = user.password;
          emailVerified = user.emailVerified;
          uid = user.uid;
      } else {
        // No user is signed in
      }
    });


  $('#logoutBtn').click(function(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      window.location = 'index.html';
    }).catch(function(error) {
      // An error happened.
      let errorCode = error.code;
      let errorMessage = error.message;
    });
  });
});