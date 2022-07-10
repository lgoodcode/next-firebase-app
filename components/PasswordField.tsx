import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react'
import { forwardRef, useState, type ChangeEvent, type Ref } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/Hi'

export type PasswordFieldProps = {
	// ref: Ref<HTMLInputElement>
	error: string | undefined
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	onBlur?: () => void
}

export default forwardRef(function PasswordField(
	{ error, onBlur, onChange }: PasswordFieldProps,
	ref: Ref<HTMLInputElement>
) {
	const [isMasked, setIsMasked] = useState(false)
	const onClickReveal = () => setIsMasked(!isMasked)

	return (
		<FormControl isInvalid={Boolean(error)}>
			<FormLabel htmlFor="password">Password</FormLabel>
			<InputGroup>
				<Input
					ref={ref}
					id="password"
					name="password"
					type={isMasked ? 'text' : 'password'}
					onBlur={onBlur}
					onChange={onChange}
				/>
				<InputRightElement>
					<IconButton
						variant="ghost"
						aria-label={isMasked ? 'Reveal password' : 'Mask password'}
						icon={isMasked ? <HiEyeOff /> : <HiEye />}
						onClick={onClickReveal}
					></IconButton>
				</InputRightElement>
			</InputGroup>
			<FormErrorMessage>{error}</FormErrorMessage>
		</FormControl>
	)
})
