
import './App.css';
import LoginForm from './Component/LoginForm';
import React,{useState,useEffect} from 'react';
import SignupForm from './Component/SignupForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import MainHeader from './MainHeader';
import Product from './Component/Product';
import ProductDetails from './Component/ProductDetails';
import SearchProduct from './Component/SearchProduct';
import Cart from './Component/Cart';
import MobileProduct from './Component/MobileProduct';
import LaptopProduct from './Component/LaptopProduct';
import TabletProduct from './Component/TabletProduct';
import ClothesProduct from './Component/ClothesProduct';
import PriceLess29999 from './Component/PriceLess29999';
import PriceLess49999 from './Component/PriceLess49999';
import PriceLess69999 from './Component/PriceLess69999';
import PriceLess89999 from './Component/PriceLess89999';
import Checkout from './Component/Checkout';
import AdminProductAdd from './Component/AdminProductAdd';
function App() {
  const [cart,setCart] = useState([]);
 
  return <BrowserRouter>

    <Routes>
      <Route path='/signup' element={<SignupForm />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/' element={<MainHeader cart={cart} />}>
        <Route index element={<Product cart={cart} setCart={setCart} />} />
        <Route path='/productDetails' element={<ProductDetails cart={cart} setCart={setCart} />} />
        <Route path='/search/:term' element={<SearchProduct cart={cart} setCart={setCart}/>} />
        <Route path='/cart' element={<Cart cart={cart} setCart={setCart}/>} />
        <Route path='/mobile' element={<MobileProduct cart={cart} setCart={setCart}/>}/>
        <Route path='/laptop' element={<LaptopProduct cart={cart} setCart={setCart}/>}/>
        <Route path='/tablet' element={<TabletProduct cart={cart} setCart={setCart}/>}/>
        <Route path='/clothes' element={<ClothesProduct cart={cart} setCart={setCart}/>}/>
        <Route path='/less' element={<PriceLess29999 cart={cart} setCart={setCart}/>}/>
        <Route path='/lesss' element={<PriceLess49999 cart={cart} setCart={setCart}/>}/>
        <Route path='/lessss' element={<PriceLess69999 cart={cart} setCart={setCart}/>}/>
        <Route path='/lesssss' element={<PriceLess89999 cart={cart} setCart={setCart}/>}/>
        <Route path='/checkout' element={<Checkout cart={cart} setCart={setCart}/>}/>
        <Route path='/addproduct' element={<AdminProductAdd/>}/>


      </Route>


    </Routes>



  </BrowserRouter>
}

export default App;
