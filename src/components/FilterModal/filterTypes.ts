export interface Option {
	id: string
	name: string
	description: string
}

export interface FilterItem {
	id: string
	name: string
	description?: string
	type: string
	options: Option[]
}
export interface SearchRequestFilter {
	id: string
	selectedOptions: string[]
}
export interface FilterModalProps {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	initialFilters: SearchRequestFilter[]
	setFilters: React.Dispatch<React.SetStateAction<SearchRequestFilter[]>>
}
