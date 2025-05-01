import {
  signInWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  OAuthProvider,
  signInWithPopup,
  linkWithPopup,
  isSignInWithEmailLink,
  signInWithEmailLink,
  createUserWithEmailAndPassword,
  deleteUser,
  updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from '@/firebase/config';
import userService from './user-service';

const validProviders = ['google.com'];

const signIn = async (data) => {
  const { email, password } = data;

  const response = await signInWithEmailAndPassword(
    FirebaseAuth,
    email,
    password
  );
  const user = await userService.getById(response.user.uid);

  return user;
};

const registerWithEmailPassword = async (data) => {
  const { email, password, name, address } = data;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const user = formatAuthUser(userCredential.user);
    console.log('🚀 ~ registerWithEmailPassword ~ user:', user);

    await updateProfile(userCredential.user, {
      displayName: name,
    });

    await userService.createWithId({
      id: user.uid,
      estado: 'activo',
      fechaCreacion: new Date(),
      email: user.email,
      nombre: name,
      rol: 'CLIENTE',
      providerId: user.providerId,
      direccion: address,
    });

    return {
      status: true,
      user,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const signInWithGoogle = async () => {
  const provider = new OAuthProvider('google.com');
  let response = null;

  try {
    response = await signInWithPopup(FirebaseAuth, provider);
    const user = formatAuthUser(response.user);

    return {
      status: true,
      user,
    };
  } catch (e) {
    if (e.code === 'user/not-found') {
      if (response?.user) {
        await deleteUser(response.user);
      }
      const error = new Error('Tu cuenta no está registrada en el sistema.');
      error.code = 'user/not-found';
      throw error;
    }

    throw e;
  }
};

const formatAuthUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    providerId: user.providerData[0]?.providerId || null,
  };
};

const resetPassword = async (email) => {
  await sendPasswordResetEmail(FirebaseAuth, email);
  return 'Se ha enviado un correo para restablecer tu contraseña correctamente!';
};

const changePassword = async (newPassword) => {
  const user = FirebaseAuth.currentUser;
  if (user) {
    await updatePassword(user, newPassword);
  } else {
    throw new Error('No user currently signed in.');
  }
};

const changePasswordReset = async (newPassword) => {
  const params = new URLSearchParams(window.location.search);
  const oobCode = params.get('oobCode');

  if (!oobCode) {
    throw new Error('No oobCode provided.');
  }

  await confirmPasswordReset(FirebaseAuth, oobCode, newPassword);
  return 'Se ha cambiado la contraseña correctamente!';
};

const signOut = async () => {
  return await FirebaseAuth.signOut();
};

export default {
  signIn,
  signInWithGoogle,
  signOut,
  resetPassword,
  changePassword,
  changePasswordReset,
  registerWithEmailPassword,
};
