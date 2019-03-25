const authEmailPassButton = document.getElementById("authEmailPassButton");
const authFacebookButton = document.getElementById("authFacebookButton");
const authTwitterButton = document.getElementById("authTwitterButton");
const authGoogleButton = document.getElementById("authGoogleButton");
const authGitHubButton = document.getElementById("authGitHubButton");
const createUserButton = document.getElementById("createUserButton");
const logOutButton = document.getElementById("logOutButton");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const displayName = document.getElementById("displayName");

createUserButton.addEventListener("click", function() {
    firebase
        .auth()
        .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function () {
            alert("Bem vindo " + emailInput.value);
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert("Falha ao cadastrar, verifique o erro no console.")
        });
});

authEmailPassButton.addEventListener("click", function () {
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function (result) {
            console.log(result);
            displayName.innerText = "Bem vindo, " + emailInput.value;
            alert("Autenticado " + emailInput.value);
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert("Falha ao autenticar, verifique o erro no console.")
        });
});


