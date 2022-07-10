import { Box, Button, Center, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import Image from 'next/image'
import { useContext } from 'react'
import { AuthContext } from '../firebase/AuthContext'
import { useSignOut } from '../firebase/auth'
import withProtection from '../firebase/components/withProtection'

export default withProtection(function DashboardPage() {
	const user = useContext(AuthContext)
	const provider = user?.providerData[0].providerId

	console.log(user)

	const handleSignOut = useSignOut()

	return (
		<Center minH="100vh" flexDirection="column">
			<Box position="fixed" top={0} left={0} minW="full" minH="full" zIndex={-1} opacity={0.9}>
				<Image
					priority
					src="/assets/img/background.webp"
					alt="abstract background"
					layout="fill"
					objectFit="cover"
				/>
			</Box>

			<Container maxW="lg" py={{ base: 2, md: 24 }} px={{ base: 4, sm: 8 }}>
				<Box
					bg="white"
					py={{ base: 12, sm: 16 }}
					px={{ base: 4, sm: 10 }}
					borderRadius={{ base: 'xl', sm: 'xl' }}
					boxShadow={useColorModeValue('lg', 'lg-dark')}
				>
					<Stack spacing={8}>
						<Stack spacing={5} color="black">
							<Text>Display name: {user?.displayName}</Text>
							<Text>Email: {user?.email}</Text>
							<Text>Provider: {provider}</Text>
						</Stack>
						<Button variant="primarySolid" onClick={handleSignOut}>
							Sign out
						</Button>
					</Stack>
				</Box>
			</Container>
		</Center>
	)
})
