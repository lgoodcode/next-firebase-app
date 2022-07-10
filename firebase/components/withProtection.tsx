import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext'

export default function withProtection(Component: React.ComponentType) {
	return function WithProtection() {
		const user = useContext(AuthContext)
		const router = useRouter()

		if (!user) {
			router.push('/login')
			return <></>
		}

		return <Component />
	}
}
