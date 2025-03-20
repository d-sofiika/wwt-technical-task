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

import data from '../../temp/filterData.json'

interface Option {
	id: string
	name: string
	description: string
}

interface FilterItem {
	id: string
	name: string
	description?: string
	type: string
	options: Option[]
}
interface FilterModalProps {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const FilterModal = ({ isOpen, setIsOpen }: FilterModalProps) => {
	const { t } = useTranslation('filter')
	const [filterData, setFilterData] = useState<FilterItem[]>([])
	const onClose = () => setIsOpen(false)

	useEffect(() => {
		setFilterData(data.filterItems)
	}, [])
	return (
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
						paddingRight="70px"
						paddingLeft="70px"
						size="lg"
						colorScheme="brand"
					>
						{t('apply')}
					</Button>
					<Button
						position="absolute"
						variant="ghost"
						textDecoration="underline"
						onClick={onClose}
						right={10}
						border="none"
						color="primary.100"
					>
						{t('clear')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
