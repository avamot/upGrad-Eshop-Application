import Login from "./components/pages/Login.js";
import Signup from "./components/pages/Signup.js";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from "./components/Product/Products";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import AddProducts from './components/Product/AddProducts.js';
import ModifyProduct from "./components/Product/ModifyProduct.tsx";
import Order from "./components/Order/Order";
import ConfirmOrder from "./components/Order/ConfirmOrder.js";

function App() {
  
  return (
    
      <div className="wrapper">
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Login />} /> 
          <Route path="/signup" element={<Signup/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/products/:id" element={<ProductDetail/>} />
          <Route path="/addProduct" element={<AddProducts/>} />
          <Route path="products/modifyProduct/:id" element={<ModifyProduct/>} />
          <Route path="products/:id/createOrder" element={<Order/>} />
          <Route path="products/:id/confirmOrder" element={<ConfirmOrder/>} />
        </Routes>  
      </BrowserRouter>
     
      
    </div>


    
  );
}

export default App;
