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
import { CardActionArea, CardMedia, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Dropdown from '../DropDown/Dropdown';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  gridList: {
    width: "100%",
    height: "auto"
  },
  card: {
    maxWidth: 160,
    height: "100%"
  }
}));

export default function Products() {
  const [alignment, setAlignment] = useState('all');



  const [isLoggedIn, setIsLoggedIn, error, setError] = useContext(IsLoggedInContext);

  React.useEffect(() => {
    getCategory();
  }, []);


  React.useEffect(() => {
    DisplayProducts();
    console.log("products", products)
  }, []);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    console.log(newAlignment);

  };
  let [categories, setCategories] = useState([]);
  let [products, setProducts] = useState([
    {
      id: "",
      name: "",
      description: "",
      price: 0,
      availableItems: 0,
      manufacturer: "",
      category: "",
      imageUrl: ""
    }
  ]);

  const classes = useStyles();
  var data, res;

  

  const DisplayAllProducts = () => {
    if (alignment.toLowerCase().includes('all')){
      return (
         <Grid container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        style={{ margin: "50px" }}>
        {products.map((product) => (
         <Grid item md={4} key={product.id} style={{ display: 'flex' }}>
           <Card sx={{ maxWidth: 300 }} className={classes.card} style={{ padding: "0", display: 'flex' }}>
             <CardActionArea>
               <CardMedia
                 component="img"
                 alt="Contemplative Reptile"
                 height="194"
                 image={"" + product.imageUrl}
                 title="Contemplative Reptile"
   
               />
               <CardContent style={{ display: 'flex' }}>
                 <Stack direction={"row"} justifyContent={"space-between"} margin={"5px"}>
                   <Typography gutterBottom variant="h6" component="div">{product.name}</Typography>
                   <Typography gutterBottom variant="h6" component="div">&#8377;{product.price}</Typography>
                 </Stack>
                 <Typography variant="body2" color="text.secondary" style={{ margin: "5px" }}>
                   {product.description}
                 </Typography>
               </CardContent>
             </CardActionArea>
             <CardActions style={{ marginTop: "auto" }}>
               <Button size="medium">Buy</Button>
               <Grid container justifyContent="flex-end">
                 <Stack direction={"row"} spacing={2}>
                   <EditIcon />
                   <DeleteIcon />
                 </Stack>
               </Grid>
             </CardActions>
           </Card>
         </Grid>
       ))}
     </Grid>      
     )
    }

    else {
      return (<Grid container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        style={{ margin: "50px" }}>
        {(products.filter(filteredProduct => 
        filteredProduct.category.toLowerCase().includes(alignment.toLowerCase()))).map((product) => (
         <Grid item md={4} key={product.id} style={{ display: 'flex' }}>
           <Card sx={{ maxWidth: 300 }} className={classes.card} style={{ padding: "0", display: 'flex' }}>
             <CardActionArea>
               <CardMedia
                 component="img"
                 alt="Contemplative Reptile"
                 height="194"
                 image={"" + product.imageUrl}
                 title="Contemplative Reptile"
   
               />
               <CardContent style={{ display: 'flex' }}>
                 <Stack direction={"row"} justifyContent={"space-between"} margin={"5px"}>
                   <Typography gutterBottom variant="h6" component="div">{product.name}</Typography>
                   <Typography gutterBottom variant="h6" component="div">&#8377;{product.price}</Typography>
                 </Stack>
                 <Typography variant="body2" color="text.secondary" style={{ margin: "5px" }}>
                   {product.description}
                 </Typography>
               </CardContent>
             </CardActionArea>
             <CardActions style={{ marginTop: "auto" }}>
               <Button size="medium">Buy</Button>
               <Grid container justifyContent="flex-end">
                 <Stack direction={"row"} spacing={2}>
                   <EditIcon />
                   <DeleteIcon />
                 </Stack>
               </Grid>
             </CardActions>
           </Card>
         </Grid>
       ))}
     </Grid>      
     )
    }
    
  }

  const DisplayProducts = async () => {

    try {
      console.log("inside");
      const response = await axios.get('http://localhost:8080/api/products/');
      const prods = response.data;
      products = [...prods];
      setProducts(products);

      console.log("products", products);

    } catch (error) {
      console.log(error);
    }

  };


  const getCategory = async () => {

    res = await axios.get('http://localhost:8080/api/products/categories');
    (res.data).map((category) => {
      categories.push(category);
      setCategories([...categories]);
    });
    console.log("response", res);

  }
 
  return (
    <>
      <IsLoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn, error, setError]}>
        <NavigationBar />
      </IsLoggedInContext.Provider>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="20vh"
      >
        <ToggleButtonGroup style={{ alignItems: "center" }}
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton color="primary" value="all">ALL</ToggleButton>
          {categories.map((category) => {
            return <ToggleButton value={category.toString()}>{category}
            </ToggleButton>
          })}
        </ToggleButtonGroup>
      </Box>
      <Dropdown />   
       <DisplayAllProducts />  
    </>
  );
};

