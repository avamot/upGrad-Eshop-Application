import * as React from 'react';
import { MenuItem} from "@material-ui/core";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '60%', // Adjusted width
    margin: '0 auto', // Center the container
  },
  formControl: {
    marginBottom: theme.spacing(4), // Increase margin bottom for larger gap
  },
}));

export default function SelectAddress({getAddress}) {
  const classes = useStyles();
  const [selectAddress, setselectAddress] = React.useState('Select...');
  
 
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

  const getAddresses = async() => {
      try {
        
        const token = sessionStorage.getItem('myTokenName');
        const response = await axios.get('http://localhost:8080/api/addresses', { headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  
          } 
      }); 

      const adds = response.data;
            addresses = [...adds];
            setAddresses(addresses);

      } catch(error) {

      }
  }


  return (
    <div className={classes.container}>
      <FormControl fullWidth className={classes.formControl}>
        <Select 
         id= "Select"
         defaultValue= {'Select...'}
         placeholder='Select...'
          value={selectAddress ? selectAddress : 'Select...'}
          onChange={(e) => getAddress(e)}>
        {   addresses.map(address => {
             return <MenuItem value={address.id}>{address.name}</MenuItem>
            })}
        </Select>
      </FormControl>
    </div>
  );
}
