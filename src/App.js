import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IsLoggedInContext from './components/IsLoggedInContext';
import { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import { Auth0Provider } from '@auth0/auth0-react';
import Products2 from "./components/Product/Products2";
import Products from "./components/Product/Products";
import ProductCard from "./common/ProductCard";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import AddProducts from './components/AddProducts';



function App() {
  
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [error, setError] = useState();
 const isUserLoggedIn = sessionStorage.getItem("authenticatedUser");
 console.log(isUserLoggedIn);

  return (
    
      <div className="wrapper">
      <Auth0Provider>
      <BrowserRouter>
      <IsLoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn, error, setError]}>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/products/:id" element={<ProductDetail/>} />
          <Route path="/addProduct" element={<AddProducts/>} />
        </Routes>  
         </IsLoggedInContext.Provider>
      </BrowserRouter>
      </Auth0Provider>
      
    </div>


    
  );
}

export default App;
