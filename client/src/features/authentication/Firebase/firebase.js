import { initializeApp }  from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDJw6DghKVS88m1fp2Ka-7-gwFiF-9imOo",
    authDomain: "soundbite-8c8ce.firebaseapp.com",
    // The value of `databaseURL` depends on the location of the database
    // databaseURL: "https://DATABASE_NAME.firebaseio.com",
    projectId: "soundbite-8c8ce",
    storageBucket: "soundbite-8c8ce.appspot.com",
    messagingSenderId: "127363996137",
    appId: "1:127363996137:web:3aab638c29ad23ed23d378",
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    // measurementId: "G-MEASUREMENT_ID",
  };

const app = initializeApp(firebaseConfig);

export default app

  
  // *** Auth API ***

//   doCreateUserWithEmailAndPassword = (email, password) =>
//   this.auth.createUserWithEmailAndPassword(email, password);

//   doSignInWithEmailAndPassword = (email, password) =>
//   this.auth.signInWithEmailAndPassword(email, password);

//   doSignOut = () => this.auth.signOut();

//   doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

//   doPasswordUpdate = password =>
//     this.auth.currentUser.updatePassword(password);

//   doGetIdToken = (bool) => {
//     return this.auth.currentUser.getIdToken(/* forceRefresh */ bool);
//   }

//   doGetUserByEmail = email => this.auth.getUserByEmail(email);

// }

// export default Firebase;