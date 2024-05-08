import * as React from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import axios from 'axios';
import NavigationBar from '../components/NavigationBar';
import IsLoggedInContext from '../components/IsLoggedInContext';

export default function Products() {
  const [alignment, setAlignment] = React.useState('all');
  //  const [error, setError] = React.useState(''); 
  console.log("context: ", IsLoggedInContext);
  console.log("useContext(context): ", React.useContext(IsLoggedInContext));


  const [isLoggedIn, setIsLoggedIn, error, setError] = React.useContext(IsLoggedInContext);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  let [categories, setCategories] = React.useState([]);
  var response, data, res;




  //   response = await (fetch('http://localhost:8080/api/products/categories'));
  //  data = await response.json();
  //   console.log(data);


  // }
  // getCategories();

  // const response = () =>
  // (axios.get('http://localhost:8080/api/products/categories')).map((category) => {
  //   setCategories(category)
  // });

  //response();

  React.useEffect(() => {
    getCategory();
  }, []);

  //   console.log("response.data", response.data);
  // try {
  //  const [categories, setCategories] = React.useState([]);
  // React.useEffect(() => {
  const getCategory = async () => {

    res = await axios.get('http://localhost:8080/api/products/categories');
    (res.data).map((category) => {
      categories.push(category);
      setCategories([...categories]);
    });
    console.log("response", res);
    // setCategories(...res.data);


    // data = response.json();


    // console.log("response.data", JSON.parse(res.data));
  }
  //   getCategory()
  //  }, [categories])
  // } catch (error){
  //   console.log("error", error);
  // }




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
            return <ToggleButton value={Math.random}>{category}</ToggleButton>
          })}
        </ToggleButtonGroup>
      </Box>

    </>
  );


}

