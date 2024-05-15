import React, { useState, useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NavigationBar from "./NavigationBar.js"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


toast.configure();

type Product = {
    name: string;
    category: string;
    manufacturer: string;
    availableItems: number;
    price: number;
    imageUrl: string;
    description: string;
  };

const intitialState = {
    name: "",
    category: "",
    manufacturer: "",
    availableItems: 0,
    price: 0,
    imageUrl: "",
    description: ""
}

const ModifyProducts = () => {
    const { id } = useParams();
    const [error, setError] = useState();
    const history = useNavigate();

   const [product, setProduct] = useState(intitialState);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setProduct((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
   
  const handleModifyProduct = (e) => {
        
    e.preventDefault();

    const data = { product, id };

    const token = sessionStorage.getItem('myTokenName');
    console.log(token);

    try {

        axios.put(`http://localhost:8080/api/products/${id}`, { 
                ...product
            }, { headers: {
              //  'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
                } 
            }); 
         console.log("data sent:" ,product);
        toast(`Product ${product.name} modified successfully`, {
            className: "toast-message",
        });
        history('/products');
    } catch (error) {
        // Handle signup error 
        console.error('Product Modification failed:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data : error.message);
    }

}
useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(data);
        console.log("data",data);

      } catch (error: any) {
        console.error(error.response.data);
      }
    })();
  }, []);

    

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

    



    return (<>
            <NavigationBar getSearchText={""}/>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Modify Product
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
                                value={product.name || ""}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="category"
                                label="Category"
                                name="category"
                                autoComplete="category"
                                value={product.category || ""}
                                onChange={handleChange}
                            />
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
                                value={product.manufacturer || ""}
                                onChange={handleChange}
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
                                value={product.availableItems || ""}
                                onChange={handleChange}
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
                                value={product.price || ""}
                                onChange={handleChange}
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
                                value={product.imageUrl || ""}
                                onChange={handleChange}
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
                                value={product.description || ""}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleModifyProduct}>
                        Modify Product
                    </Button>
                </form>
            </div>
        </Container>
    </>

    );
}

export default ModifyProducts;