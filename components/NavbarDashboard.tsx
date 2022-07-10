import {
	Box,
	Button,
	Center,
	Flex,
	HStack,
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	useBreakpointValue,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useContext } from 'react'
import { FaMoon, FaSun, FaUserAlt } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { useSignOut } from '../firebase/auth'
import { AuthContext } from '../firebase/AuthContext'
import Logo from './Logo'

export default function Navbar() {
	const user = useContext(AuthContext)
	const { colorMode, toggleColorMode } = useColorMode()
	const buttonBg = useColorModeValue('whiteAlpha.800', 'whiteAlpha.300')
	const buttonHover = { bg: useColorModeValue('whiteAlpha.900', 'whiteAlpha.400') }
	const handleSignOut = useSignOut()

	return (
		<Box as="nav" px={4} bgGradient="linear(to-r, pink.400, blue.400)">
			<Flex
				h={useBreakpointValue({ base: 14, md: 16 })}
				alignItems="center"
				justifyContent="space-between"
			>
				<Center>
					<Logo h={useBreakpointValue({ base: 8, md: 10 })} />
				</Center>

				<HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
					<IconButton
						size="lg"
						onClick={toggleColorMode}
						aria-label={colorMode === 'light' ? 'dark-mode' : 'light-mode'}
						icon={colorMode === 'light' ? <Icon as={FaMoon} /> : <Icon as={FaSun} />}
						bg={buttonBg}
						_hover={buttonHover}
					/>
					{!user ? (
						<NextLink href="/profile" passHref>
							<Button as="a" py={6} bg={buttonBg} _hover={buttonHover}>
								Sign in
							</Button>
						</NextLink>
					) : (
						<Menu>
							<MenuButton
								as={IconButton}
								size="lg"
								icon={<Icon as={FaUserAlt} />}
								bg={buttonBg}
								_hover={buttonHover}
							/>
							<MenuList>
								<NextLink href="/profile" passHref>
									<MenuItem as="a">Profile</MenuItem>
								</NextLink>
								<MenuItem>Settings</MenuItem>
								<MenuDivider />
								<MenuItem onClick={handleSignOut}>Sign out</MenuItem>
							</MenuList>
						</Menu>
					)}
				</HStack>

				<Box display={{ base: 'flex', md: 'none' }}>
					<Menu>
						<MenuButton
							bg="transparent"
							w={12}
							h={14}
							_active={{ bg: 'whiteAlpha.200' }}
							// bg={useColorModeValue('whiteAlpha.800', 'whiteAlpha.200')}
							// _hover={{ bg: useColorModeValue('whiteAlpha.900', 'whiteAlpha.300') }}
						>
							<Icon as={FiMenu} w={6} h={8} />
						</MenuButton>
						<MenuList>
							{!user ? (
								<>
									<NextLink href="/login" passHref>
										<MenuItem as="a">Sign in</MenuItem>
									</NextLink>

									<MenuDivider />

									<MenuItem onClick={toggleColorMode}>
										{colorMode === 'light' ? <Icon as={FaMoon} /> : <Icon as={FaSun} />}
									</MenuItem>
								</>
							) : (
								<>
									<NextLink href="/profile" passHref>
										<MenuItem as="a">Profile</MenuItem>
									</NextLink>
									<NextLink href="/settings" passHref>
										<MenuItem as="a">Settings</MenuItem>
									</NextLink>

									<MenuDivider />

									<MenuItem onClick={handleSignOut}>Sign out</MenuItem>
								</>
							)}
						</MenuList>
					</Menu>
				</Box>
			</Flex>
		</Box>
	)
}
