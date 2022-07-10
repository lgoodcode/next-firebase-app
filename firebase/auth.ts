import {
	browserLocalPersistence,
	browserSessionPersistence,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signInWithRedirect,
	signOut,
	updateProfile,
	type AuthError,
	type AuthProvider,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { app } from './config'

const auth = getAuth(app)

export const signUpWithEmail = async (
	firstName: string,
	lastName: string,
	email: string,
	password: string
) => {
	try {
		const { user } = await createUserWithEmailAndPassword(auth, email, password)

		await updateProfile(user, {
			displayName: [firstName, lastName].join(' '),
		})

		return null
	} catch (err) {
		return err as AuthError
	}
}

export const loginWithEmail = async (email: string, password: string) => {
	try {
		await signInWithEmailAndPassword(auth, email, password)
		return null
	} catch (err) {
		return err as AuthError
	}
}

export const signInWithProvider = (provider: AuthProvider) => signInWithRedirect(auth, provider)

export const useAuthRedirect = (path: `/${string}`) => {
	const { currentUser } = getAuth()
	const router = useRouter()

	useEffect(() => {
		if (currentUser) {
			router.push(path)
		}
	})
}

export const useSignOut = () => {
	const router = useRouter()

	return async () => {
		// Delete any local session token, if any
		localStorage.removeItem('exp_token')
		await signOut(auth)
		router.push('/login')
	}
}

export const setLocalPersistence = async (local: boolean) => {
	try {
		if (!local) {
			localStorage.removeItem('exp_token')
			await auth.setPersistence(browserSessionPersistence)
		} else {
			await auth.setPersistence(browserLocalPersistence)

			const exp_token =
				Date.now() + (Number(process.env.NEXT_PUBLIC_LOCAL_SESSION_DURATION) || 30 * 60 * 1000)

			localStorage.setItem('exp_token', exp_token.toString())
		}
	} catch (err) {
		console.error(err)
	}
}
