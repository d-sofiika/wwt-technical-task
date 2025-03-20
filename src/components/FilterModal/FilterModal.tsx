import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
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
			size="lg"
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
					/>
				</ModalHeader>

				<ModalBody>
					{filterData.map(item => (
						<div key={item.id}>
							<Text
								mb="24px"
								mt="32px"
								textStyle="headline-5"
							>
								{item.name}
							</Text>
							<SimpleGrid
								columns={[2, null, 3]}
								gap="16px"
							>
								{item.options.map(option => (
									<Checkbox
										key={option.id}
										defaultChecked={false}
									>
										{option.name}
									</Checkbox>
								))}
							</SimpleGrid>
						</div>
					))}
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="brand">{t('apply')}</Button>
					<Button
						variant="outline"
						mr={3}
						onClick={onClose}
					>
						{t('clear')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
