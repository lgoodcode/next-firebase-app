import { ChakraProvider } from '@chakra-ui/provider'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../firebase/AuthContext'
import theme from '../theme'

// import { motion } from 'framer-motion'

function MyApp({ Component, pageProps, router }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<AuthProvider>
				{/* <motion.div
				key={router.route}
				initial="pageInitial"
				animate="pageAnimate"
				transition={{ duration: 1 }}
				variants={{
					pageInitial: {
						position: 'absolute',
						left: '-50%',
						height: '100%',
						width: '100%',
					},
					pageAnimate: {
						position: 'absolute',
						left: 0,
						height: '100%',
						width: '100%',
					},
				}}
			> */}
				<Component {...pageProps} />
				{/* </motion.div> */}
			</AuthProvider>
		</ChakraProvider>
	)
}

export default MyApp
