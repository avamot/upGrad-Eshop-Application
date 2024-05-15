import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../Product/addProduct.css';

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
        alignItems: "center",
        width: "25%", // Adjusted width
        margin: "auto"
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(2, 0), // Adjusted spacing
    },
    field: {
        marginBottom: theme.spacing(1), // Adjusted spacing
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center', // Center the buttons horizontally
        width: "100%",
        marginTop: theme.spacing(1), // Adjusted spacing
    },
    backButton: {
        marginRight: theme.spacing(1), // Add margin to create space between buttons
    },
}));

export default function AddAddressForm(addressId) {
    const classes = useStyles();
    const { id } = useParams(); 
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [landmark, setLandmark] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [user, setUser] = useState('6640a3f1ee44965340e99c25');
    const [error, setError] = useState();
    const history = useNavigate();

    const handleBack = () => {
        history(`/products/${id}`);
    }

    const handleNext =  (e) => {
        
        const preventDefault = () => {

            if( name === '' || contactNumber === '' || city === '' ||
                landmark === '' || street === '' || state === '' || zipcode === ''){
                    toast('Please select address!', {
                        className: "toast-error-message",
                    });
                }
            
        }
        preventDefault();

       
    }

    const getAddress = (e) => {
        console.log("inside getSdress", e);
   
       //  const selectedAddress  = () => {
       //   return addresses.filter(address => address.id === event.target.value);
      
       //    };
     }

    const handleSaveAddress = async () => {
        const token = sessionStorage.getItem('myTokenName');
        try {
            const response = await axios.post('http://localhost:8080/api/addresses', {
               name,
               contactNumber,
               city,
               landmark,
               street,
               state,
               zipcode,
               user
            }, { headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
                } });
   
            console.log(response.data); 
            console.log("id",[id]);
           }
           catch (error) { 
               // Handle product addition error 
               console.error('Add Product failed:', error.response ? error.response.data : error.message); 
               setError(error.response ? error.response.data : error.message); 
           }
    }

    return (
        <div className={classes.paper}>
            <Typography variant="h5" gutterBottom>
                Add Address
            </Typography>
            <form className={classes.form}>
                <Grid container spacing={1}> {/* Decreased spacing */}
                    <Grid item xs={12} className={classes.field}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            autoFocus="autofocus"
                            id="name"
                            label="Name"
                            defaultValue={name}
                            onChange={e => {
                                this.cursor = e.target.selectionStart;
                                setName(e.target.value);
                            }
                        }  
                        onFocus={(e) => {
                            e.target.selectionStart = this.cursor;
                          }
                        } 
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.field}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            id="contactNumber"
                            label="Contact Number"
                            defaultValue={contactNumber}
                            onChange={e => setContactNumber(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.field}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            id="street"
                            label="Street"
                            defaultValue={street}
                            onChange={e => setStreet(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.field}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            id="city"
                            label="City"
                            defaultValue={city}
                            onChange={e => setCity(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.field}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            id="state"
                            label="State"
                            defaultValue={state}
                            onChange={e => setState(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.field}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            id="landmark"
                            label="Landmark"
                            defaultValue={landmark}
                            onChange={e => setLandmark(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.field}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            id="zipcode"
                            label="Zip Code"
                            defaultValue={zipcode}
                            onChange={e => setZipcode(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.buttonContainer}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSaveAddress}
                            fullWidth
                        >
                            SAVE THE ADDRESS
                        </Button>
                    </Grid>
                    <Grid item xs={12} className={classes.buttonContainer}>
                        <Button
                            onClick={handleBack}
                            variant="contained"
                            color="primary"
                            className={`${classes.submit} ${classes.backButton}`}
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleNext}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}
