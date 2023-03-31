import {IconButton, TextField} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

interface SearchInputProps {
  searchTerm: string
  size: 'small' | 'medium' | undefined
  color: 'primary' | 'secondary' | undefined
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClearSearch?: () => void
}

const SearchInput = ({size, color, onChange, onClearSearch, searchTerm}: SearchInputProps) => {
  // const handleKeyDown = (event: React.KeyboardEvent) => {
  //   if (event.key === 'Enter') {
  //     onSearch()
  //   }
  // }
  return (
    <TextField
      id='search'
      label='Search'
      value={searchTerm}
      onChange={onChange}
      size={size}
      color={color}
      variant='outlined'
      InputProps={{
        endAdornment: !!searchTerm ? (
          <IconButton sx={{mr: '-8px'}} onClick={onClearSearch}>
            <HighlightOffIcon />
          </IconButton>
        ) : (
          <SearchIcon />
        ),
        sx: {
          width: '400px',
          '& .MuiInputBase-input': {
            backgroundColor: 'white',
            borderRadius: '5px',
            padding: '10px',
          },
          '& .MuiSvgIcon-root': {
            color: 'gray',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'lightgray',
          },
        },
      }}

      // onKeyDown={handleKeyDown}
    />
  )
}

export default SearchInput
