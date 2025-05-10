import React from 'react'
import Navigation from './customer/components/Navigation/Navigation'
import HomePage from './customer/pages/HomePage'
import Footer from './customer/components/Footer/Footer'
import Product from './customer/components/Product/Product'
import ProductDetails from './customer/components/ProductDetails/ProductDetails'
import CartItem from './customer/components/Cart/Cart'
import Cart from './customer/components/Cart/Cart'
import Checkout from './customer/components/Checkout/Checkout'
import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import CustomerRoutes from './Routers/CustomerRoutes'
import { CartProvider } from './customer/components/context/CartContext'
import { AddressProvider } from './customer/components/context/AddressContext'
const App = () => {
  return (


    <div >
      <AddressProvider>
      <CartProvider>
      <BrowserRouter>
    <Routes>
      <Route path='/*' element={<CustomerRoutes/>}></Route>
       {/* <Navigation /> */}
      
        {/* <HomePage /> */}
        {/* <Product/> */}
        
{/* <ProductDetails/> */}
 {/* <Cart/> */}
  {/* <Checkout /> */}
    
      {/* <Footer/> */}
    </Routes>
    </BrowserRouter>
    </CartProvider>
    </AddressProvider>
     
    </div>
   
    
  )
}

export default App
