import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import type { User } from "firebase/auth";

import { app } from "$lib/util/firebase";
import { authStore, verifiedStore } from "$lib/util/store";

const auth = getAuth(app);
auth.useDeviceLanguage();

let currentUser: User | null;

auth.onIdTokenChanged((user) => {
  if (user) {
    currentUser = user;
    authStore.set(true);
    if (user.emailVerified) {
      verifiedStore.set(true);
    } else {
      verifiedStore.set(false);
    }
  } else {
    currentUser = null;
    authStore.set(false);
    verifiedStore.set(false);
  }
})

currentUser.uid;

async function googleAuthUser() {
  if (currentUser) {
    currentUser.reload();
  }

  setPersistence(auth, browserLocalPersistence).then(async () => {

    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);
  });
}

async function emailAuthUser(email: string, password: string) {
  if (currentUser) {
    currentUser.reload();
  }

  await signInWithEmailAndPassword(auth, email, password);
}

async function emailCreateUser(email: string, password: string) {
  if (currentUser) {
    currentUser.reload();
  }

  await createUserWithEmailAndPassword(auth, email, password);

  await emailVerifyUser();
}

async function emailVerifyUser() {
  if (currentUser) {
    currentUser.reload();
  }

  if (!currentUser) {
    throw new Error("no current user");
  }

  await sendEmailVerification(currentUser);
}

async function authSignOut() {
  await signOut(auth);
}

export { googleAuthUser, authSignOut, emailAuthUser, emailCreateUser, emailVerifyUser, currentUser }
