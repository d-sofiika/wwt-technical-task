import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	Box,
	Button,
	Checkbox,
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
			setSelectedFilters(initialFilters)
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
				<ModalContent p={10}>
					<ModalHeader
						display="flex"
						alignItems="center"
						justifyContent="center"
						p={0}
						maxH={12}
						position="relative"
					>
						<Text textStyle="headline-2">{t('titleFilter')}</Text>
						<ModalCloseButton
							size="lg"
							top={0}
							right={0}
							border="none"
							variant="ghost"
						/>
					</ModalHeader>

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
									{item.options.map(option => (
										<Checkbox
											key={option.id}
											defaultChecked={false}
											isChecked={
												selectedFilters
													.find(finded => finded.id === item.id)
													?.selectedOptions.includes(option.id) || false
											}
											onChange={() => handleCheckboxChange(item.id, option.id)}
											sx={{
												'.chakra-checkbox__control': {
													borderRadius: '4px',
													border: `${0.5} solid #31393C`
												},
												'.chakra-checkbox__label': {
													ml: '16px'
												}
											}}
											size="lg"
										>
											{option.name}
										</Checkbox>
									))}
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
