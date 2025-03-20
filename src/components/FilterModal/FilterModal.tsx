import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Text
} from '@chakra-ui/react'

import { ConfirmModal } from '@components/ConfirmModal/ConfirmModal'

import data from '../../temp/filterData.json'
import { FilterCheckbox } from './FilterCheckbox'
import {
	FilterItem,
	FilterModalProps,
	SearchRequestFilter
} from './filterTypes'

export const FilterModal = ({
	isOpen,
	setIsOpen,
	initialFilters,
	setFilters
}: FilterModalProps) => {
	const { t } = useTranslation('filter')
	const [filterData, setFilterData] = useState<FilterItem[]>([])
	const [selectedFilters, setSelectedFilters] = useState<SearchRequestFilter[]>(
		initialFilters || []
	)
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	const onClose = () => setIsOpen(false)
	const handleApplyClick = () => {
		setIsConfirmOpen(true)
	}
	const confirmApply = () => {
		localStorage.setItem('filters', JSON.stringify(selectedFilters))
		setFilters(selectedFilters)
		setIsConfirmOpen(false)
		onClose()
	}
	const handleCancelConfirm = () => {
		setSelectedFilters(initialFilters)
		setIsConfirmOpen(false)
		onClose()
	}
	useEffect(() => {
		setFilterData(data.filterItems)
	}, [])

	useEffect(() => {
		if (isOpen) {
			const savedFilters = localStorage.getItem('filters')
			if (savedFilters) {
				setSelectedFilters(JSON.parse(savedFilters))
			} else {
				setSelectedFilters(initialFilters)
			}
		}
	}, [isOpen, initialFilters])

	const handleCheckboxChange = (filterId: string, optionId: string) => {
		setSelectedFilters(prevFilters => {
			const existingFilter = prevFilters.find(filter => filter.id === filterId)

			if (existingFilter) {
				const updatedOptions = existingFilter.selectedOptions.includes(optionId)
					? existingFilter.selectedOptions.filter(opt => opt !== optionId)
					: [...existingFilter.selectedOptions, optionId]

				return prevFilters.map(filter =>
					filter.id === filterId
						? { ...filter, selectedOptions: updatedOptions }
						: filter
				)
			}

			return [...prevFilters, { id: filterId, selectedOptions: [optionId] }]
		})
	}
	const clearFilters = () => setSelectedFilters([])
	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size="xl"
			>
				<ModalOverlay />
				<ModalContent p={8}>
					<ModalHeader
						display="flex"
						alignItems="center"
						justifyContent="center"
						p={0}
						maxH={12}
					>
						<Text textStyle="headline-2">{t('titleFilter')}</Text>
					</ModalHeader>
					<ModalCloseButton
						size="lg"
						top={9}
						right={8}
						border="none"
						variant="ghost"
					/>

					<ModalBody p={0}>
						{filterData.map(item => (
							<Box
								key={item.id}
								paddingBottom={8}
								borderBottom="1px solid #AAAAAA"
							>
								<Text
									mb={6}
									mt={8}
									textStyle="headline-5"
								>
									{item.name}
								</Text>
								<SimpleGrid
									columns={[2, null, 3]}
									gap={4}
								>
									<FilterCheckbox
										filter={item}
										selectedFilters={selectedFilters}
										onChange={handleCheckboxChange}
									/>
								</SimpleGrid>
							</Box>
						))}
					</ModalBody>
					<ModalFooter
						display="flex"
						alignItems="center"
						justifyContent="center"
						p={0}
						mt={8}
					>
						<Button
							onClick={handleApplyClick}
							paddingRight="70px"
							paddingLeft="70px"
							size="lg"
							colorScheme="brand"
						>
							{t('apply')}
						</Button>
						<Button
							onClick={clearFilters}
							position="absolute"
							variant="ghost"
							textDecoration="underline"
							right={10}
							border="none"
							color="primary.100"
						>
							{t('clear')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<ConfirmModal
				isOpen={isConfirmOpen}
				onClose={() => setIsConfirmOpen(false)}
				onConfirm={confirmApply}
				onCancel={handleCancelConfirm}
			/>
		</>
	)
}
