import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Button, Flex, Text } from '@chakra-ui/react'

import { FilterModal } from '@components/FilterModal/FilterModal'

interface SearchRequestFilter {
	id: string
	selectedOptions: string[]
}
export const HomePage = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [filters, setFilters] = useState<SearchRequestFilter[]>([])
	const { t } = useTranslation('filter')
	const onOpen = () => setIsOpen(true)
	return (
		<Flex
			flexDirection="column"
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
			<Box mt={4}>
				{filters.length > 0 ? (
					<Box>
						<pre>{JSON.stringify(filters, null, 2)}</pre>{' '}
					</Box>
				) : (
					<Text>{t('noSelected')}</Text>
				)}
			</Box>
			<FilterModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				initialFilters={filters}
				setFilters={setFilters}
			/>
		</Flex>
	)
}
