import { Checkbox } from '@chakra-ui/react'

import { FilterItem, SearchRequestFilter } from './filterTypes'

interface FilterCheckboxProps {
	filter: FilterItem
	selectedFilters: SearchRequestFilter[]
	onChange: (filterId: string, optionId: string) => void
}

export const FilterCheckbox = ({
	filter,
	selectedFilters,
	onChange
}: FilterCheckboxProps) => {
	return (
		<>
			{filter.options.map(option => (
				<Checkbox
					key={option.id}
					defaultChecked={false}
					isChecked={
						selectedFilters
							.find(finded => finded.id === filter.id)
							?.selectedOptions.includes(option.id) || false
					}
					onChange={() => onChange(filter.id, option.id)}
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
		</>
	)
}
