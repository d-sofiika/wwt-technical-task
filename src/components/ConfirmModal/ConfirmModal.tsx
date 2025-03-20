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
			size="xl"
		>
			<ModalOverlay />
			<ModalContent
				alignItems="center"
				p={8}
			>
				<ModalHeader
					display="flex"
					alignItems="center"
					justifyContent="center"
					borderBottom="none"
					p={0}
					mb="120px"
					position="relative"
					w="100%"
				>
					<Text textStyle="headline-2"> {t('confirmTitle')}</Text>
				</ModalHeader>
				<ModalCloseButton
					size="lg"
					top={9}
					right={8}
					border="none"
					variant="ghost"
				/>
				<ModalFooter
					p={0}
					gap={8}
				>
					<Button
						variant="outline"
						size="lg"
						minW="280px"
						onClick={onCancel}
					>
						{t('noConfirm')}
					</Button>
					<Button
						paddingRight="70px"
						paddingLeft="70px"
						size="lg"
						colorScheme="brand"
						onClick={onConfirm}
					>
						{t('yesConfirm')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
