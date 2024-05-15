import React, { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NavigationBar from "../components/NavigationBar";
import CustomizedCreatableSelect from "./Product/CustomizedCreatableSelect.tsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Product/addProduct.css';

toast.configure();


const AddProducts = () => {
    const [name, setName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [availableItems, setAvailableItems] = useState(0);
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState();
    const history = useNavigate(); 
    const [error, setError] = useState();
    
   
    const gettingCategory = (e) => {
          
      //  console.log("category",e);
        setCategory(e.value);
        console.log("e.value",e.value);
        console.log("category",category);
       
    }

   
    const useStyles = makeStyles(theme => ({
        "@global": {
            body: {
                backgroundColor: theme.palette.common.white
            }
        },
        paper: {
            marginTop: theme.spacing(8),
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main
        },
        form: {
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(3)
        },
        submit: {
            margin: theme.spacing(3, 0, 2)
        }
    }));

    const classes = useStyles();

    const handleAddProduct = async (e) => {
      
        try { 

            e.preventDefault();
            const header = `Authorization: Bearer ${sessionStorage.getItem('myTokenName')}`;
            console.log("header", header);
            const token = sessionStorage.getItem('myTokenName');
            
            const response = await axios.post('http://localhost:8080/api/products', { 
                name, 
                category,
                price, 
                description, 
                manufacturer,
                availableItems,
                imageUrl
            }, { headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
                } 
            }); 
            // Handle successful signup 
           
            console.log(response.data); 

            
            toast(`Product ${name} added successfully`, {
                className: "toast-message",
            });
            history('/products'); 
        } catch (error) { 
            // Handle product addition error 
            console.error('Add Product failed:', error.response ? error.response.data : error.message); 
            setError(error.response ? error.response.data : error.message); 
        }

    }
    
    return (<>
        <NavigationBar getSearchText={""}/>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Add Product
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                value={name}
                                onChange={e => { setName(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <CustomizedCreatableSelect gettingCategory={gettingCategory} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="manufacturer"
                                label="Manufacturer"
                                name="manufacturer"
                                autoComplete="manufacturer"
                                value={manufacturer}
                                onChange={e => { setManufacturer(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="availableItems"
                                label="Available Items"
                                type="availableItems"
                                id="availableItems"
                                autoComplete="availableItems"
                                value={availableItems}
                                onChange={e => { setAvailableItems(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="price"
                                label="Price"
                                type="price"
                                id="price"
                                value={price}
                                onChange={e => { setPrice(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="imageUrl"
                                label="Image URL"
                                type="imageUrl"
                                id="imageUrl"
                                autoComplete="imageUrl"
                                value={imageUrl}
                                onChange={e => { setImageUrl(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="description"
                                label="Description"
                                type="description"
                                id="description"
                                autoComplete="description"
                                value={description}
                                onChange={e => { setDescription(e.target.value) }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleAddProduct}
                    >
                        Add Product
                    </Button>
                </form>
            </div>
        </Container>
        </>
    );
}

export default AddProducts;