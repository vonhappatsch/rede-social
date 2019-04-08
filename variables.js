const database = firebase.database();
const auth = firebase.auth();
const usersRef = database.ref(`users/${id}`);
const user = auth.currentUser;