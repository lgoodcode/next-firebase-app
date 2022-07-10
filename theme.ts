import { Colors, extendTheme, ThemeComponents, type ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: true,
}

const styles = {
	global: {
		color: mode('gray.800', 'whiteAlpha.900'),
		bg: mode('white', 'gray.800'),
	},
}

const components: ThemeComponents = {
	Heading: {
		baseStyle: {
			fontWeight: 500,
		},
	},
	Divider: {
		baseStyle: {
			borderBottomColor: 'gray !important',
		},
	},
	Button: {
		baseStyle: {
			'&:hover:not(:disabled)': {
				top: 0.5,
			},
		},
		variants: {
			primarySolid: {
				color: 'white',
				bg: 'primary.500',
				_hover: {
					bg: 'primary.600',
				},
			},
		},
	},
}

const colors: Colors = {
	primary: {
		50: '#ffe5ff',
		100: '#fab8f7',
		200: '#f38bed',
		300: '#ee5de6',
		400: '#e830dd',
		500: '#cf17c4',
		600: '#a20f99',
		700: '#74096e',
		800: '#470343',
		900: '#1b001a',
	},
}

export default extendTheme({
	config,
	styles,
	components,
	colors,
	fonts: {
		body: 'Inter, -apple-system, system-ui, sans-serif',
		heading: 'Inter, -apple-system, system-ui, sans-serif',
	},
})
