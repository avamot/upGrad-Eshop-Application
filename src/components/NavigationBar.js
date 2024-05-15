import { styled, alpha } from '@mui/material/styles';
import React, { useState, useEffect, useContext }  from "react";


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import Button from '@mui/material/Button';
import Link from "@mui/material/Link";

import { useNavigate } from 'react-router-dom'; 



import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';





const AddProductLinks = () => {



  const isAuthorized = sessionStorage.getItem('isAuthorized');
  
  if ((isAuthorized && isAuthorized === 'true') && window.location.href.endsWith('/products')){
  
    return (
        <Link href="/addProduct" m={1} color="inherit" variant='body2'>Add Product</Link>
    )
   }
};

const DisplayLinks = () => {
  const token = sessionStorage.getItem('myTokenName');

  const history = useNavigate(); 
 

  const handleLogout = () => { 
   
     sessionStorage.removeItem('myTokenName');
     sessionStorage.removeItem('isAuthorized');

    
    history('/'); 
  }; 
 
    if (token) {
      
      return (<div>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}> 
        <Link href="/products" m={1} color="inherit" variant='body2'>Home</Link>
        <AddProductLinks />
        <Button type="submit" onClick={handleLogout} variant="contained" color="error">LOGOUT</Button>
        </Box>
      </div>)
    }
    else  {
      return (
        <>
        <Box flexGrow={1} /> 
          <Link href="/" m={2} color="inherit" variant='body2'>Login</Link>
          <Link href="/signup" m={2} color="inherit" variant='body2'>Sign Up</Link>
        </>
      )
    }
};
  





const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
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
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const NavigationBar = ({getSearchText}) => {
//  const [text, setText] = useState('');
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <ShoppingCartIcon></ShoppingCartIcon>
          <Typography
            variant="h6"
            noWrap
            component="div"
            padding={2}
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >upGrad E-shop</Typography>
          <Search
            style={{
              width: '25%'
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChangeCapture={newText => getSearchText(newText)}
            />
          </Search>

          <Box flexGrow={1} />
          <DisplayLinks />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavigationBar;