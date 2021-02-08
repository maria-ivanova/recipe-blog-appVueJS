import { auth } from './firebase.js';

const registerUser = (email, password) => auth.createUserWithEmailAndPassword(email, password);
 
const loginUser = (email, password) => auth.signInWithEmailAndPassword(email, password);

const logout = () => auth.signOut();

const passwordUpdate = (password) => auth.currentUser.updatePassword(password);

export {
    registerUser,
    loginUser,
    logout,
    passwordUpdate
}



