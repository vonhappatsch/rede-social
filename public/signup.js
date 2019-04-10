const database = firebase.database();
const auth = firebase.auth();

$(document).ready(function(){

  const register = (email, password, name, lastname, username, id) => {
    database.ref(`users/${id}`).set({
      email,
      password,
      name,
      lastname,
      username
    });
  };

  $("#signUpBtn").click(function() {
    let name = $("#firstName").val();
    let lastname = $("#lastName").val();
    let username = $("#userName").val();
    let email = $("#emailInput").val();
    let password = $("#passwordInput").val();

    auth.createUserWithEmailAndPassword(email, password)
      .then(function(res) {
        register(email, password, name, lastname, username, res.user.uid);
        window.location = `home.html?userId=${res.user.uid}`;
        })
      .catch(function(error){
        // se deu tudo errado
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // ...
        if (errorCode == "auth/email-already-in-use") {
            alert("Email já registrado");
        } else if (errorCode == "auth/invalid-email") {
          alert("Email inválido");
        } else if (errorCode == "auth/weak-password") {
            alert("A senha escolhida deve conter mais de 6 dígitos");
        } else {
            alert(errorMessage);
        }
     });

    if (name === "") {
      alert("Por favor insira o seu nome");
      return;
    } else if (lastname === "") {
      alert("Por favor insira o sobrenome");
      return;
    } else if (username === "") {
      alert("Por favor insira um username");
      return;
    }
  });


  auth.onAuthStateChanged(function(user) {
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
  
});