import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import NavigationBar from '../NavigationBar';
import SelectAddress from './SelectAddress';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../Product/addProduct.css';

const steps = [
  'Items',
  'Select Address',
  'Confirm Order',
];

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

export default function HorizontalLinearAlternativeLabelStepper() {
  const [activeStep, setActiveStep] = React.useState(1); // Set activeStep to 1 initially
  const { id } = useParams(); 
    const [name, setName] = React.useState('');
    const [contactNumber, setContactNumber] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [landmark, setLandmark] = React.useState('');
    const [zipcode, setZipcode] = React.useState('');
    const [user, setUser] = React.useState('6640a3f1ee44965340e99c25');
    const [error, setError] = React.useState();
    const history = useNavigate();
    const token = sessionStorage.getItem('myTokenName');
 

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const getAddress = async (e) => {

   const addressId = e.target.value;

   try {
    const response = await axios.get(`http://localhost:8080/api/addresses/${addressId}`, { headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
                } });


                setName(response.data.name);
              setContactNumber(response.data.contactNumber);
              setStreet(response.data.street);
              setCity(response.data.city);
              setState(response.data.state);
              setLandmark(response.data.landmark);
              setZipcode(response.data.zipcode);
              }

              
                catch (error){
                  console.error('Add Product failed:', error.response ? error.response.data : error.message); 
               setError(error.response ? error.response.data : error.message); 
                }
   }
  
  const AddAddressForm = () => {
    const classes = useStyles();
    

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

        history(`/products/${id}/confirmOrder`);
    }

    
    
    const handleSaveAddress = async () => {
        
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
                            autoFocus
                            id="name"
                            label="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.field}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            id="contactNumber"
                            label="Contact Number"
                            value={contactNumber}
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
                            value={street}
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
                            value={city}
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
                            value={state}
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
                            value={landmark}
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
                            value={zipcode}
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
  return (
    <>
      <NavigationBar />
      <Box sx={{ width: '100%' }}>
        <Box mb={2}> {/* Add margin bottom to create a gap */}
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <SelectAddress getAddress = {getAddress} />
        <Typography variant="body2" align="center" marginTop={2}> {/* Adjusted marginTop */}
          -OR-
        </Typography>
        <AddAddressForm />
      </Box>
    </>
  );
}