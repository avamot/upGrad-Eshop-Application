import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, TextField, Box, Grid } from '@mui/material';
import NavigationBar from '../NavigationBar';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams(); // Get the product id from the URL
  const [product, setProduct] = useState(null); // State for product details
  const [quantity, setQuantity] = useState(1); // State for quantity
  let res;
  let [categories, setCategories] = useState([]);
  const [alignment, setAlignment] = useState('all');
  const history = useNavigate();

  React.useEffect(() => {
      getCategory();
  }, []);

   const handleChange = (event, newAlignment) => {
        if (newAlignment != null) {
            setAlignment(newAlignment);
        }
    };


  const getCategory = async () => {

    res = await axios.get('http://localhost:8080/api/products/categories');
    (res.data).map((category) => {
        categories.push(category);
        setCategories([...categories]);
    });
    

}

  // Function to fetch product details from the API
  const fetchProductDetails = async () => {
    try {
      // Make an HTTP GET request to the API endpoint
      const response = await axios.get(`http://localhost:8080/api/products/${id}`);
      // Check if response status is in the range 200-299
      if (response.status >= 200 && response.status < 300) {
        // Set the fetched product details in state
        setProduct(response.data);
      } else {
        // If response status is not in the range 200-299, throw an error
        throw new Error('Failed to fetch product details');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      // Optionally, you can set an error state here
    }
  };
  // Call the fetchProductDetails function when the component mounts or when the ID parameter changes
  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  // Event handler for changing quantity
  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value)); // Parse quantity to integer
  };

  // Event handler for placing order
  const handlePlaceOrder = (event) => {
    console.log("event", event);
    history(`/products/${id}/createOrder`);
    console.log(`Placing order for ${quantity} ${product.name}`);
  };

  // Display loading indicator while product details are being fetched
  if (!product) {
    return <div>Loading...</div>;
  }

  
  return (
    <>
        <NavigationBar />
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
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid container spacing={2} style={{display: "flex", flexDirection: "row", marginTop:"20px"}}>
        <Grid item xs={7} md={5} style={{alignContent: "flex-start"}}>
          <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '300px', maxHeight: '300px', justifySelf:"left", marginLeft:"200px"}} />
        </Grid>
        <Grid item xs={6} md={6}>
          <Stack spacing={2}>
          <Stack direction={'row'} spacing={2}>
          <Typography variant="h6">{product.name}</Typography>
          <Button variant="contained" style={{borderRadius:"50px", textTransform:"none"}}>Available Quantity: {product.availableItems} </Button>
          </Stack>
          
          <Typography>Category: <b>{product.category}</b></Typography>
          <Typography fontStyle='italic'>{product.description}</Typography>
          <Typography variant='h5' color='red'>₹{product.price}</Typography>

          <TextField
            label="Enter Quantity"
            type="number"
            value={quantity}
            style={{width:"300px"}}
            onChange={handleQuantityChange}
          />
          <Button style={{width:"fit-content"}}
            variant="contained"
            color="primary"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}

export default ProductDetail;
