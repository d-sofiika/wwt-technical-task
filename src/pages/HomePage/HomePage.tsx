import { useEffect, useState } from 'react'
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

	useEffect(() => {
		const savedFilters = localStorage.getItem('filters')
		if (savedFilters) {
			setFilters(JSON.parse(savedFilters))
		}
	}, [])

	useEffect(() => {
		if (filters.length > 0) {
			localStorage.setItem('filters', JSON.stringify(filters))
		}
	}, [filters])
	const onOpen = () => setIsOpen(true)
	return (
		<Flex
			p={8}
			flexDirection="column"
			alignItems="center"
		>
			<Button
				paddingRight="70px"
				paddingLeft="70px"
				size="lg"
				onClick={onOpen}
				variant="solid"
				colorScheme="brand"
			>
				{t('filters')}
			</Button>
			<Box mt={4}>
				{filters.length > 0 ? (
					<Box textStyle="headline-5">
						<pre>{JSON.stringify(filters, null, 2)}</pre>{' '}
					</Box>
				) : (
					<Text textStyle="headline-5">{t('noSelected')}</Text>
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
