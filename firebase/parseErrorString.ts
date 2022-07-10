import type { AuthError } from 'firebase/auth'

export default function parseErrorString(authError: AuthError) {
	const errStr = authError.code.split('auth/')[1].replace(/-/g, ' ')
	const capitalizedErrStr = errStr.charAt(0).toUpperCase() + errStr.slice(1)

	return capitalizedErrStr
}
