import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Button } from '@chakra-ui/react'

import { FilterModal } from '@components/FilterModal/FilterModal'

export const HomePage = () => {
	const [isOpen, setIsOpen] = useState(true)
	const { t } = useTranslation('filter')
	const onOpen = () => setIsOpen(true)
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Button
				onClick={onOpen}
				variant="solid"
				colorScheme="brand"
				size="md"
			>
				{t('filters')}
			</Button>

			<FilterModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
		</Box>
	)
}
