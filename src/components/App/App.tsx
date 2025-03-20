import { Box } from '@chakra-ui/react'

import { HomePage } from '@pages/HomePage/HomePage'

export const App = () => {
	return (
		<Box
			maxW="90rem"
			mx="auto"
			minH="100dvh"
		>
			<HomePage />
		</Box>
	)
}
