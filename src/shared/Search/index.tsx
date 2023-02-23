import {IconButton, TextField} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface SearchInputProps {
  size: 'small' | 'medium' | undefined
  color: 'primary' | 'secondary' | undefined
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: () => void
}

const SearchInput = ({size, color, onChange, onSearch}: SearchInputProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearch()
    }
  }
  return (
    <TextField
      id='search'
      label='Search'
      size={size}
      color={color}
      variant='outlined'
      InputProps={{
        endAdornment: (
          <IconButton sx={{pr: 0}} onClick={onSearch}>
            <SearchIcon />
          </IconButton>
        ),
        sx: {
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
      onChange={onChange}
      onKeyDown={handleKeyDown}
    />
  )
}

export default SearchInput
