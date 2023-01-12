import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, browserLocalPersistence, setPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

import { app } from "$lib/util/firebase";
import { authStore } from "$lib/util/store";

const auth = getAuth(app);
auth.useDeviceLanguage();

auth.onAuthStateChanged((user) => {
  if (user) {
    authStore.set(true);
  } else {
    authStore.set(false);
  }
})

async function googleAuthUser() {
  setPersistence(auth, browserLocalPersistence).then(async () => {

    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider).catch(err => {
      throw err
    });
  }).catch((err) => {
    throw err;
  })

}

async function emailAuthUser(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password).catch(err => {
    throw err;
  })
}

async function emailCreateUser(email: string, password: string) {
  await createUserWithEmailAndPassword(auth, email, password).catch(err => {
    throw err;
  })
}

async function authSignOut() {
  await signOut(auth).catch(err => {
    throw err;
  });
}

export { googleAuthUser, authSignOut, emailAuthUser, emailCreateUser }
