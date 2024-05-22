import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import NavigationBar from '../../common/NavigationBar';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../Product/addProduct.css';
import StepIcon from '@mui/material/StepIcon';
import { styled } from '@mui/system';


const steps = [
    'Items',
    'Select Address',
    'Confirm Order',
];

const ColorlibStepIconRoot = styled(StepIcon)(({ theme }) => ({
    color: '#3f51b5',
    '&.Mui-active': {
      color: '#3f51b5',
    },
    '&.Mui-completed': {
      color: '#3f51b5',
    },
  }));

export default function HorizontalLinearAlternativeLabelStepper() {
    const [selectAddress, setselectAddress] = React.useState('');
    const [error, setError] = useState();
    const userId = sessionStorage.getItem('userId');
    const [user, setUser] = React.useState(userId);
    
       
  
    const location = useLocation();
    
    console.log("location",location);
    
  let [addresses, setAddresses] = React.useState([
    {
        id: "",
        name: "",
        contactNumber: "",
        city: "",
        landmark: "",
        street: "",
        state: "",
        zipcode: "",
        user: ""
    }
  ]); 
  
  React.useEffect(() => {
    getAddresses();
    console.log("addresses:", addresses)
}, []);

  
const getAddresses = async(e) => {
      try {
        const addressId = e.target.value;
        const token = sessionStorage.getItem('myTokenName');
        const response = await axios.get(`http://localhost:8080/api/addresses/${addressId}`, { headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
                } });
      

      const adds = response.data;
            addresses = [...adds];
            setAddresses(addresses);

      } catch(error) {

      }
  }

    const { id } = useParams(); // Get the product id from the URL
    const [product, setProduct] = useState(null); // State for product details
    const [productName, setProductName] = useState(null);
    const [productId, setProductId] = useState(null);
    const [quantity, setQuantity] = useState(location.state.quantity); // State for quantity
    const [activeStep, setActiveStep] = React.useState(2);
    const history = useNavigate();

    

    const fetchProductDetails = async () => {
        try {
            // Make an HTTP GET request to the API endpoint
            const response = await axios.get(`http://localhost:8080/api/products/${id}`);
            // Check if response status is in the range 200-299
            if (response.status >= 200 && response.status < 300) {
                // Set the fetched product details in state
                setProduct(response.data);
                setProductName(response.data.name);
                setProductId(response.data.id);

                console.log("productName",productName);
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

    const handlePlaceOrder = () => {
        // Handle order placing logic here, then redirect to products page
        setActiveStep(3);
        placeOrder();
        
    };

    const placeOrder = async () => {
        const token = sessionStorage.getItem('myTokenName');
        
        console.log(location);
        const address = location.state.id;
        const newProduct = JSON.stringify(product);
        console.log("quan",quantity);
        console.log("productName",user);
        console.log("productId",id);
        console.log("address",address);
        console.log("userId", userId);
        console.log("user", user);
        try {
            const response = await axios.post('http://localhost:8080/api/orders', 
            {
                "quantity": quantity,
                "user": user,
                "product": id,
                "address": address
              },
             { headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
                } });
   
            console.log(response.data); 
            console.log("product.availableItems - quantity",product.availableItems - quantity);
            // setProduct((prevState) => {
            //     return {
            //         ...prevState,
            //         availableItems: product.availableItems - quantity
            //     }
            // });

            setProduct(() => {
                return  {
                    ...product,
                    availableItems: product.availableItems - quantity
                 }
            }
               );
            console.log("product",product);
            console.log("id",[id]);
            // try {
            //      console.log("axios.put",product,id);
            //     axios.put(`http://localhost:8080/api/products/${id}`, { 
            //             ...product
            //         }, { headers: {
            //           //  'Content-Type': 'application/json',
            //             'Authorization': `Bearer ${token}`  
            //             } 
            //         }); 
            //      console.log("data sent:" ,product);
                
            // } catch (error) {
            //     // Handle signup error 
            //     console.error('Product Modification failed:', error.response ? error.response.data : error.message);
            //     setError(error.response ? error.response.data : error.message);
            // }

            toast(`Order placed successfully`, {
                className: "toast-message",
            });

            history('/products');
           }
           catch (error) { 
               // Handle product addition error 
               console.error('Order creation failed:', error.response ? error.response.data : error.message); 
               setError(error.response ? error.response.data : error.message); 
           }
    }

    return (
        <>
            <NavigationBar />
            <Box sx={{ width: '100%' }}>
                <Box mb={2} style={{display:"flex", justifyContent:"center"}}> {/* Add margin bottom to create a gap */}
                    <Stepper style={{width:"80%"}} activeStep={activeStep}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={ColorlibStepIconRoot}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                {product && (
                    <Grid container style={{display:"flex", width:"1100px", marginLeft:"200px"}}>
                        <Grid item xs={4} md={8}>
                            <Paper style={{height: "300px"}} elevation={3} sx={{ padding: 4 }}>
                                <Typography variant="h5">{product.name}</Typography> <br/>
                                <Typography>Quantity: <strong>{quantity}</strong></Typography><br/>
                                <Typography>Category: <strong>{product.category}</strong></Typography> <br/>
                                
                                <Typography>{product.description}</Typography> <br/>
                                
                                <Typography variant="h6" color="red">Total Price: ₹ {product.price * quantity}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={8} md={4}>
                            <Paper style={{height: "300px"}} elevation={3} sx={{ padding: 4 }}>
                                <Typography variant="h5">Address Details :</Typography>
                                <Typography>{location.state.name} </Typography>
                                <Typography>{location.state.contactNumber} </Typography>
                                <Typography>{location.state.street} <strong></strong></Typography>
                                <Typography>{location.state.city}</Typography>
                                <Typography>{location.state.state}</Typography>
                                <Typography>{location.state.landmark}</Typography>
                                <Typography>{location.state.zipcode}</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                )}
                <Box sx={{ display: 'flex', justifyContent:"center", mt: 2 }}>
                    <Stack direction={"row"} spacing={2}>
                    <Button variant="text" color="inherit" onClick={() => history(-1)}>BACK</Button>
                    <Button variant="contained" color="primary" onClick={handlePlaceOrder} style={{backgroundColor: "#3f51b5"}}>PLACE ORDER</Button>
                    </Stack>
                </Box>
            </Box>
        </>
    );
}
