import { useTranslation } from 'react-i18next'

import {
	Button,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text
} from '@chakra-ui/react'

interface ConfirmModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	onCancel: () => void
}
export const ConfirmModal = ({
	isOpen,
	onClose,
	onConfirm,
	onCancel
}: ConfirmModalProps) => {
	const { t } = useTranslation('filter')

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader borderBottom="none">
					<Text textStyle="headline-2"> {t('confirmTitle')}</Text>

					<ModalCloseButton
						size="lg"
						top={0}
						right={0}
						border="none"
						variant="ghost"
					/>
				</ModalHeader>
				<ModalFooter>
					<Button
						paddingRight="70px"
						paddingLeft="70px"
						size="lg"
						colorScheme="brand"
						onClick={onCancel}
					>
						{t('noConfirm')}
					</Button>
					<Button
						variant="outline"
						ml={3}
						onClick={onConfirm}
					>
						{t('yesConfirm')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
