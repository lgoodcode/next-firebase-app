import {
	Box,
	Button,
	Center,
	Checkbox,
	Container,
	Divider,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	HStack,
	Input,
	Link,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
} from '@chakra-ui/react'
import DOMPurify from 'dompurify'
import Image from 'next/image'
import NextLink from 'next/link'
import { useEffect, useState, type ChangeEvent } from 'react'
import Logo from '../components/Logo'
import OAuthButtonGroup from '../components/OAuthButtonGroup'
import PasswordField from '../components/PasswordField'
import { loginWithEmail, useAuthRedirect } from '../firebase/auth'
import parseErrorString from '../firebase/parseErrorString'
import useForm, { type Validations } from '../hooks/useForm'
import { emailReg, passwordReg } from '../utilities/regexp'

type Data = Record<'email' | 'password', string>

const validations: Validations<Data> = {
	email: {
		required: {
			value: true,
			message: 'Please enter a valid email address',
		},
		pattern: {
			value: emailReg,
			message: 'Please enter a valid email address',
		},
	},
	password: {
		required: {
			value: true,
			message: 'Password must be at least 8 characters, contain a number, and a special character',
		},
		pattern: {
			value: passwordReg,
			message: 'Password must be at least 8 characters, contain a number, and a special character',
		},
	},
}

export default function LoginPage() {
	useAuthRedirect('/dashboard')

	const remembered = Boolean(localStorage.getItem('remember'))
	const rememberedEmail = localStorage.getItem('email') ?? undefined
	const [serverError, setServerError] = useState('')
	const [remember, setRememeber] = useState(remembered)
	const handleToggle = (e: ChangeEvent<HTMLInputElement>) => setRememeber(e.target.checked)

	useEffect(() => {
		if (remember) {
			localStorage.setItem('remember', 'true')
			localStorage.setItem('LOCAL_SESSION', 'true')
		} else {
			localStorage.removeItem('remember')
			localStorage.removeItem('LOCAL_SESSION')
		}
	}, [remember])

	const onSubmit = async (data: Data) => {
		const err = await loginWithEmail(data.email, data.password)

		if (err) {
			setServerError(parseErrorString(err))
			return false
		}

		if (remembered) {
			localStorage.setItem('email', data.email)
		} else {
			localStorage.removeItem('email')
		}

		return true
	}

	const { status, errors, handleChange, handleBlur, handleSubmit } = useForm<Data>({
		initialValues: {
			email: rememberedEmail,
		},
		validations,
		onSubmit,
		sanitizeFn: DOMPurify.sanitize,
	})

	return (
		<Center minH="100vh" flexDirection="column">
			<Box position="fixed" top={0} left={0} minW="full" minH="full" zIndex={-1} opacity={0.9}>
				<Image
					src="/assets/img/background.webp"
					alt="abstract background"
					layout="fill"
					objectFit="cover"
					priority
				/>
			</Box>

			<Container maxW="lg" py={{ base: 2, md: 24 }} px={{ base: 4, sm: 8 }}>
				<Box
					w="100%"
					bg={useColorModeValue('white', 'gray.800')}
					py={{ base: 12, sm: 16 }}
					px={{ base: 4, sm: 10 }}
					borderRadius="xl"
					boxShadow="lg"
				>
					<Stack spacing={8} position="relative">
						<Flex justifyContent="center">
							<Logo h={useBreakpointValue({ base: 14, sm: 16 })} />
						</Flex>

						<Stack spacing={{ base: 6, md: 8 }} textAlign="center">
							<Heading size="lg">Register an account</Heading>
							<Heading size="sm">
								Don&apos;t have an account?{' '}
								<NextLink href="/register" passHref>
									<Link color={useColorModeValue('blue', 'blue.400')}>Sign up</Link>
								</NextLink>
							</Heading>
							{serverError && (
								<Box bg="red.500" py={4} borderRadius="md">
									<Heading size="sm" color="white">
										{serverError}
									</Heading>
								</Box>
							)}
						</Stack>
					</Stack>

					<Box mt={8}>
						<form onSubmit={handleSubmit} noValidate>
							<Stack spacing={6}>
								<Stack spacing={5}>
									<FormControl isInvalid={Boolean(errors.email)}>
										<FormLabel htmlFor="email">Email</FormLabel>
										<Input
											id="email"
											type="email"
											defaultValue={rememberedEmail}
											onBlur={handleBlur('email')}
											onChange={handleChange('email')}
										/>
										<FormErrorMessage>{errors.email}</FormErrorMessage>
									</FormControl>
									<PasswordField
										error={errors.password}
										onBlur={handleBlur('password')}
										onChange={handleChange('password')}
									/>
								</Stack>

								<HStack justify="space-between">
									<Checkbox defaultChecked={remembered} onChange={handleToggle}>
										Remember me
									</Checkbox>
									<Link href="/forgot-password" color={useColorModeValue('blue', 'blue.400')}>
										Forgot password?
									</Link>
								</HStack>

								<Stack spacing={6}>
									<Button
										type="submit"
										variant="primarySolid"
										isLoading={status === 'loading'}
										loadingText="Submitting"
									>
										Log in
									</Button>
									<HStack>
										<Divider />
										<Text size="sm" whiteSpace="nowrap" color="gray">
											or
										</Text>
										<Divider />
									</HStack>

									<OAuthButtonGroup />
								</Stack>
							</Stack>
						</form>
					</Box>
				</Box>
			</Container>
		</Center>
	)
}
