import {
  signInWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  OAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  deleteUser,
  updateProfile,
  fetchSignInMethodsForEmail,
} from "firebase/auth"
import { FirebaseAuth } from "@/firebase/config"
import userService from "./user-service"

const validProviders = ["google.com"]

// Función para validar contraseña
const validatePassword = (password) => {
  // Al menos 8 caracteres, una mayúscula y un número
  const minLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  if (!minLength || !hasUpperCase || !hasNumber) {
    const error = new Error("La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número")
    error.code = "auth/weak-password"
    throw error
  }

  return true
}

// Función para verificar si un correo ya está registrado
const checkEmailExists = async (email) => {
  try {
    const methods = await fetchSignInMethodsForEmail(FirebaseAuth, email)
    return methods.length > 0
  } catch (error) {
    console.error("Error al verificar email:", error)
    return false
  }
}

const signIn = async (data) => {
  const { email, password } = data

  try {
    const response = await signInWithEmailAndPassword(FirebaseAuth, email, password)
    const user = await userService.getById(response.user.uid)

    return user
  } catch (error) {
    console.error("Error en signIn:", error)
    throw error
  }
}

const registerWithEmailPassword = async (data) => {
  const { email, password, name, address } = data

  try {
    // Verificar si el correo ya existe
    const emailExists = await checkEmailExists(email)
    if (emailExists) {
      const error = new Error("Este correo electrónico ya está registrado")
      error.code = "auth/email-already-in-use"
      throw error
    }

    // Validar contraseña
    validatePassword(password)

    const userCredential = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
    const user = formatAuthUser(userCredential.user)
    console.log("🚀 ~ registerWithEmailPassword ~ user:", user)

    await updateProfile(userCredential.user, {
      displayName: name,
    })

    await userService.createWithId({
      id: user.uid,
      estado: "activo",
      fechaCreacion: new Date(),
      email: user.email,
      nombre: name,
      rol: "CLIENTE",
      providerId: user.providerId,
      direccion: address,
    })

    return {
      status: true,
      user,
    }
  } catch (error) {
    console.error("Error en registerWithEmailPassword:", error)
    throw error
  }
}

const signInWithGoogle = async () => {
  const provider = new OAuthProvider("google.com")
  let response = null

  try {
    response = await signInWithPopup(FirebaseAuth, provider)
    const user = formatAuthUser(response.user)

    return {
      status: true,
      user,
    }
  } catch (e) {
    if (e.code === "user/not-found") {
      if (response?.user) {
        await deleteUser(response.user)
      }
      const error = new Error("Tu cuenta no está registrada en el sistema.")
      error.code = "user/not-found"
      throw error
    }

    throw e
  }
}

const formatAuthUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    providerId: user.providerData[0]?.providerId || null,
  }
}

const resetPassword = async (email) => {
  await sendPasswordResetEmail(FirebaseAuth, email)
  return "Se ha enviado un correo para restablecer tu contraseña correctamente!"
}

const changePassword = async (newPassword) => {
  const user = FirebaseAuth.currentUser
  if (user) {
    await updatePassword(user, newPassword)
  } else {
    throw new Error("No user currently signed in.")
  }
}

const changePasswordReset = async (newPassword) => {
  const params = new URLSearchParams(window.location.search)
  const oobCode = params.get("oobCode")

  if (!oobCode) {
    throw new Error("No oobCode provided.")
  }

  await confirmPasswordReset(FirebaseAuth, oobCode, newPassword)
  return "Se ha cambiado la contraseña correctamente!"
}

const signOut = async () => {
  return await FirebaseAuth.signOut()
}

export default {
  signIn,
  signInWithGoogle,
  signOut,
  resetPassword,
  changePassword,
  changePasswordReset,
  registerWithEmailPassword,
  checkEmailExists,
  validatePassword,
}
