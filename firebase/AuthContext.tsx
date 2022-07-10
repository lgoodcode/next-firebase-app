import { Center, Spinner } from '@chakra-ui/react'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { setLocalPersistence } from './auth'
import { auth } from './config'

export const AuthContext = createContext<User | null>(null)

type AuthProviderProps = {
	children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	/**
	 * Sets the Auth persistence type to either use sessions like normal or,
	 * use local in the browser.
	 *
	 * @param local
	 */
	const setPersistence = async (local: boolean) => {
		const exp_token = Number(localStorage.getItem('exp_token')) || 0

		if (local) {
			// If expired, sign out
			if (exp_token && exp_token < Date.now()) {
				await setLocalPersistence(false)
				signOut(auth)
			} else {
				await setLocalPersistence(true)
			}
		} else {
			// Normal session persistence
			await setLocalPersistence(false)
		}
	}

	// Listen for Firebase state change
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setLoading(true)
			setUser(user)

			if (user) {
				await setPersistence(Boolean(localStorage.getItem('LOCAL_SESSION')))
			}

			setLoading(false)
		})

		return () => unsubscribe()
	})

	if (loading) {
		return (
			<Center minH="100vh">
				<Spinner size="xl" />
			</Center>
		)
	}

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
