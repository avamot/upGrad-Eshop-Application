import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import NavigationBar from '../../common/NavigationBar';
import SelectAddress from './SelectAddress';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../Product/addProduct.css';
import './order.css';
import StepIcon from '@mui/material/StepIcon';
import { styled } from '@mui/system';

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
    color:"#3f51b5"
  },
  backButton: {
    marginRight: theme.spacing(1), // Add margin to create space between buttons
  },
}));

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
  const [activeStep, setActiveStep] = React.useState(1); // Set activeStep to 1 initially
  const { id } = useParams();
  const [addrId, setAddrId] = React.useState();
  const classes = useStyles();
  const location = useLocation();
  const [formData, setFormData] = React.useState({
    name: '',
    contactNumber: '',
    street: '',
    city: '',
    state: '',
    landmark: '',
    zipcode: '',
  });

  const userId = sessionStorage.getItem('userId');
  console.log("Inside Order.js userId", userId);
  const [user, setUser] = React.useState(userId);
  console.log("Inside Order.js user", user);
  const [error, setError] = React.useState();
  const history = useNavigate();
  const token = sessionStorage.getItem('myTokenName');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const getAddress = async (e) => {
    const addressId = e.target.value;
    setAddrId(addressId);
    console.log("addressId getAddress:",addrId);

    try {
      const response = await axios.get(`http://localhost:8080/api/addresses/${addressId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      // Update the form data with the response
      setFormData(
        { 
          name: response.data.name,
          contactNumber: response.data.contactNumber,
          street: response.data.street,
          city: response.data.city,
          state: response.data.state,
          landmark: response.data.landmark,
          zipcode: response.data.zipcode
        });
    } catch (error) {
      console.error('Add Product failed:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message);
    }
  };

  const handleSaveAddress = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/addresses', {
        ...formData,
        user
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("response.data", response);
      console.log("id", [id]);

  
      //setAddrId({addrId: response.data});
      console.log("response.data",response.data);
      setAddrId(response.data);
       
      console.log("addrId", addrId);
      return response.data;
    } catch (error) {
      // Handle product addition error 
      console.error('Add Product failed:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message);
    }
  };

  const handleBack = () => {
    history(`/products/${id}`);
  };

  const handleNext = async (e) => {
    let savedAddrId;
    e.preventDefault();
   
      // Validate form fields
      if (
        formData.name === '' ||
        formData.contactNumber === '' ||
        formData.city === '' ||
        formData.landmark === '' ||
        formData.street === '' ||
        formData.state === '' ||
        formData.zipcode === ''
      ) {
        toast('Please select address!', {
          className: "toast-error-message",
        });
      }
      else {
        console.log("addrId....",addrId);
        if(addrId === undefined || addrId === '' || addrId === null){
          savedAddrId = await handleSaveAddress();

          if (!savedAddrId) {
            return; // Exit if address saving failed
          }
          setAddrId(savedAddrId);

  
        }
        history(`/products/${id}/confirmOrder`, {state: {
          id: addrId || savedAddrId,
          quantity: location.state.quantity,
          name: formData.name,
          contactNumber: formData.contactNumber,
          city: formData.city,
          landmark: formData.landmark,
          street: formData.street,
          state: formData.state,
          zipcode: formData.zipcode
        }});
      
    };


  };

  return (
    <>
      <NavigationBar />
      <Box sx={{ width: '100%'}}>
        <Box mb={2} style={{display:"flex", justifyContent:"center"}}> {/* Add margin bottom to create a gap */}
          <Stepper  style={{width:"80%"}} activeStep={activeStep} >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIconRoot}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <SelectAddress getAddress={getAddress} />
        <Typography variant="body2" align="center" marginTop={2}> {/* Adjusted marginTop */}
          -OR-
        </Typography>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            Add Address
          </Typography>
          <form className={classes.form}>
            <Grid container spacing={2}> {/* Decreased spacing */}
              {Object.keys(formData).map((field, index) => (
                <Grid item xs={12} className={classes.field} key={index}>
                  <TextField
                    autoComplete={field}
                    variant="outlined"
                    fullWidth
                    required
                    name={field}
                    type={field}
                    id={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)} // Capitalize first letter
                    autoFocus={index === 0} // Autofocus on the first field
                    value={formData[field]}
                    onChange={handleChange}
                  />
                </Grid>
              ))}
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
      </Box>
    </>
  );
}
