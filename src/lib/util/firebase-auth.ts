import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, browserLocalPersistence, setPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

import { app } from "$lib/util/firebase";
import { authStore } from "$lib/util/store";

const auth = getAuth(app);

auth.onAuthStateChanged((user) => {
  if (user) {
    authStore.set(true);
  } else {
    authStore.set(false);
  }
})

async function googleAuthUser() {
  try {

    setPersistence(auth, browserLocalPersistence).then(async () => {

      try {
        const provider = new GoogleAuthProvider();

        await signInWithPopup(auth, provider)
      } catch (err) {
        return err;
      }

    })
  } catch (err) {
    return err
  }
  return true;
}

async function emailAuthUser(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    return err;
  }

  return true;
}

async function emailCreateUser(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    return err;
  }

  return true;
}

async function authSignOut() {
  try {
    await signOut(auth)
  } catch (err) {
    return err;
  }

  return true;
}

export { googleAuthUser, authSignOut, emailAuthUser, emailCreateUser }
