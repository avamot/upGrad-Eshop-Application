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
import { Link } from 'react-router-dom';

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
    const [value, setValue] = React.useState('');
    let [newProducts, setNewProducts] = React.useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortedFilteredProducts, setSortedFilteredProducts] = useState([]);
    const [filteredBySearchProducts, setFilteredBySearchProducts] = useState([]);
    let [searchText, setSearchText] = useState();

    const getSearchText = (event) => {
        
       const text = event.target.value;
       

        setSearchText(text);
        
    
        
        if(!(text === undefined || text.length === 0)) {
          console.log(searchText);
            const filteredProducts = products.filter(product => {
                return  (product.category.toLowerCase().includes(text.toLowerCase()) ||
                         product.name.toLowerCase().includes(text.toLowerCase()) ||
                         product.description.toLowerCase().includes(text.toLowerCase()))
                })
                 
                setFilteredBySearchProducts([...filteredProducts]);
                 console.log([filteredProducts]);
        }

        DisplayAllProducts();
    
    }




    const [isLoggedIn, setIsLoggedIn, error, setError] = useContext(IsLoggedInContext);

    React.useEffect(() => {
        getCategory();
    }, []);


    React.useEffect(() => {
        GetProducts();
    }, []);

    const handleChange = (event, newAlignment) => {
        if (newAlignment != null) {
            setAlignment(newAlignment);
        }
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
        if(!(searchText === undefined || searchText.length === 0)) {
            if (value.toLowerCase().includes('')) {
                if (alignment.toLowerCase().includes('all')) {
                    return (
                        <Grid container
                            spacing={2}
                            direction="row"
                            justify="flex-start"
                            alignItems="stretch"
                            style={{ margin: "50px" }}>
                            {filteredBySearchProducts.map((product) => (
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
                                        <Link to={`/products/${product.id}`}>
                                            <Button size="lg">Buy</Button>
                                            </Link>
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
                        {(filteredBySearchProducts.filter(filteredProduct =>
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
                                        <Link to={`/products/${product.id}`}>
                                            <Button size="lg">Buy</Button>
                                            </Link>
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
            } else {
                if (alignment.toLowerCase().includes('all')) {
                    return (
                        <Grid container
                            spacing={2}
                            direction="row"
                            justify="flex-start"
                            alignItems="stretch"
                            style={{ margin: "50px" }}>
                            {sortedFilteredProducts.map((product) => (
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
                                        <Link to={`/products/${product.id}`}>
                                            <Button size="lg">Buy</Button>
                                            </Link>
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
                        {(sortedFilteredProducts.filter(filteredProduct =>
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
                                        <Link to={`/products/${product.id}`}>
                                            <Button size="lg">Buy</Button>
                                            </Link>
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
        }
        else {
            if (value.toLowerCase().includes('')) {
                if (alignment.toLowerCase().includes('all')) {
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
                                        <Link to={`/products/${product.id}`}>
                                            <Button size="lg">Buy</Button>
                                            </Link>
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
                                        <Link to={`/products/${product.id}`}>
                                            <Button size="lg">Buy</Button>
                                            </Link>
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
            } else {
                if (alignment.toLowerCase().includes('all')) {
                    return (
                        <Grid container
                            spacing={2}
                            direction="row"
                            justify="flex-start"
                            alignItems="stretch"
                            style={{ margin: "50px" }}>
                            {sortedProducts.map((product) => (
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
                                        <Link to={`/products/${product.id}`}>
                                            <Button size="lg">Buy</Button>
                                            </Link>
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
                        {(sortedProducts.filter(filteredProduct =>
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
                                        <Link to={`/products/${product.id}`}>
                                            <Button size="lg">Buy</Button>
                                            </Link>
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
        }
        
    }
    const GetProducts = async () => {

        try {
            
            const response = await axios.get('http://localhost:8080/api/products/');
            const prods = response.data;
            products = [...prods];
            setProducts(products);

            newProducts = [...products];
            setNewProducts = [...newProducts];



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
        

    }

    const Dropdown = () => {



        const handleChange = (event) => {

            setValue(event.target.value);


            if (event.target.value === '') {
                const sortedProducts = products;
                const sortedFilteredProducts = filteredBySearchProducts;
                setSortedProducts([...sortedProducts]);
                setSortedFilteredProducts([...sortedFilteredProducts]);
                
                

            }
            if (event.target.value === 'default') {
                
                if(!(searchText === undefined || searchText.length === 0)) {
                    console.log(searchText);
                      const filteredProducts1 = products.filter(product => {
                          return  (product.category.toLowerCase().includes(searchText.toLowerCase()) ||
                                   product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                   product.description.toLowerCase().includes(searchText.toLowerCase()))
                          })

                          setSortedFilteredProducts([...filteredProducts1]);
                           
                  }
                  GetProducts();
                const sortedProducts = products;  
                setSortedProducts([...products]);
                
                
                
                
                

            }

            if (event.target.value === 'HighToLow') {

                const sortedProducts = products.sort((a, b) => b.price - a.price);
                const filteredProducts = filteredBySearchProducts.sort((a, b) => b.price - a.price);
                setSortedProducts([...sortedProducts]);
                setSortedFilteredProducts([...filteredProducts]);
            }

            if (event.target.value === 'LowToHigh') {

                const sortedProducts = products.sort((a, b) => a.price - b.price);
                const filteredProducts = filteredBySearchProducts.sort((a, b) => a.price - b.price);
                setSortedProducts([...sortedProducts]);
                setSortedFilteredProducts([...filteredProducts]);
            }

            DisplayAllProducts();

        };

        return (

            <div style={{ marginLeft: "100px" }}>

                <label style={{ fontSize: '12px' }}>

                    Sort By:

                    <br /><select defaultValue="" value={value} style={{ width: "200px", height: "25px" }} onChange={handleChange}>
                        <option disabled={true} value="">Select...</option>

                        <option value="default">Default</option>

                        <option value="HighToLow">Price: High to Low</option>

                        <option value="LowToHigh">Price: Low to High</option>

                        <option value="option3">Newest</option>

                    </select>

                </label>

            </div>

        );

    };



    return (
        <>
            <IsLoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn, error, setError]}>
                <NavigationBar getSearchText={getSearchText} />
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

