import { Button, ButtonGroup, useColorMode, VisuallyHidden } from '@chakra-ui/react'
import { GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { signInWithProvider } from '../firebase/auth'

const providers = [
	{
		name: 'Google',
		icon: <FcGoogle size={28} />,
		handleClick: () => signInWithProvider(new GoogleAuthProvider()),
	},
	{
		name: 'Twitter',
		icon: <FaTwitter size={28} color="#00acee" />,
		handleClick: () => signInWithProvider(new TwitterAuthProvider()),
	},
	{
		name: 'Github',
		icon: <FaGithub size={28} />,
		handleClick: () => signInWithProvider(new GithubAuthProvider()),
	},
]

export default function OAuthButtonGroup() {
	const { colorMode } = useColorMode()

	return (
		<ButtonGroup variant="outline" spacing={4} w="full">
			{providers.map(({ name, icon, handleClick }) => (
				<Button
					key={name}
					w="full"
					py={6}
					variant={colorMode === 'light' ? 'outline' : 'solid'}
					onClick={handleClick}
					disabled={name === 'Twitter'}
				>
					<VisuallyHidden>Sign in with {name}</VisuallyHidden>
					{icon}
				</Button>
			))}
		</ButtonGroup>
	)
}
