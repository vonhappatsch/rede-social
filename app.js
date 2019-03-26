$(document).ready(function(){

    $("#signUpBtn").click(function() {
        let email = $("#loginInput").val();
        let password = $("#passwordInput").val();

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function() {
                // se deu certo
                window.location = "palomita.html"
            })
            
            .catch(function(error) {
                // se deu tudo errado
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                // ...
          });
          

    });


    $("#signInBtn").click(function() {
        let email = $("#loginInput").val();
        let password = $("#passwordInput").val();

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(function() {
                // se deu certo
                window.location = "palomita.html";
            })

            .catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // ...
          });

    });
      

    $("#loginGoogle").click(function() {
        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().useDeviceLanguage();
        firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                let token = result.credential.accessToken;
                // The signed-in user info.
                let user = result.user;
                    window.location = "palomita.html";
            }).catch(function(error) {
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

        firebase.auth().useDeviceLanguage();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
                window.location = "palomita.html";
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


    $("#logoutBtn").click(function() {
        
    })
});

