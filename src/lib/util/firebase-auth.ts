import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, browserLocalPersistence, setPersistence } from "firebase/auth";

import { app } from "$lib/util/firebase";
import { authStore } from "$lib/util/store";

const auth = getAuth(app);

async function googleAuthUser() {
  setPersistence(auth, browserLocalPersistence).then(async () => {

    const provider = new GoogleAuthProvider();

    const signIn = await signInWithPopup(auth, provider).catch(err => {
      console.error(err)
    });

    // console.log(auth);
    // console.log(signIn);
  }).catch((err) => {
    console.error(err);
  })

}

auth.onAuthStateChanged((user) => {
  if (user) {
    authStore.set(true);
  } else {
    authStore.set(false);
  }
})

async function authSignOut() {
  await signOut(auth).catch(err => {
    console.error(err);
  });
}

export { googleAuthUser, authSignOut }
