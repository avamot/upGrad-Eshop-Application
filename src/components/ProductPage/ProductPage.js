import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import NavigationBar from '../NavigationBar';
import IsLoggedInContext from '../IsLoggedInContext';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import { Grid } from '@material-ui/core';
import { CardActionArea, CardMedia, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const ProductPage = () => {
     
    const fetchProductDetails = async () => {
        const response = await axios.get('httpshttp://localhost:8080/api/products/')
    }

    return ( <div>

    </div> );
}
 
export default ProductPage;


