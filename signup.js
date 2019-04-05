const database = firebase.database();
const auth = firebase.auth();
const usersRef = database.ref('users');
const user = auth.currentUser;

$(document).ready(function(){
  const register = (email, password, name, lastname, username) => {
    usersRef.push({
        email,
        password,
        name,
        lastname,
        username
    });
  }

  $("#signUpBtn").click(function() {
    let name = $("#firstName").val();
    let lastname = $("#lastName").val();
    let username = $("#userName").val();
    let email = $("#emailInput").val();
    let password = $("#passwordInput").val();

    register(email, password, name, lastname, username);

    auth.createUserWithEmailAndPassword(email, password)
      .then(function() {
        // se deu certo
        window.location = "home.html";
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