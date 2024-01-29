import "./SearchBar.css"
import {styled, alpha} from "@mui/material/styles"
import { Button, InputBase, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import { useRef } from "react";
import {useNavigate} from "react-router-dom"


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: alpha("#700016", 0.15),
  },
  
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.down('sm')]: {
      width:'11ch',
      '&:focus': {
        borderRadius: '5px',
        
      },
    },
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        borderRadius: '5px',
        
      },
    },
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        borderRadius: '5px'      
      },
      
    }
  }
}));
  

const SearchBar = ({mobile}) => {
    const searchRef = useRef();
    const navigate = useNavigate();
    const handleSearchClick = () => {
        const baseURL = "/store?query=";
        const encodedSearch = encodeURI(searchRef.current.value);
        navigate(baseURL + encodedSearch);
    }
    return (
        <Stack direction="row" spacing={2} sx={mobile ? {width: "50%"} : {width:"300px"}}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    id="clothing-search"
                    placeholder="Vad letar du efter"
                    inputRef={searchRef}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            <Button onClick={handleSearchClick} variant="contained" className="header-search-bar-button">Sök</Button>
        </Stack>
  )
}

export default SearchBar;