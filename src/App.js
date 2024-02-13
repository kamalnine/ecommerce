
import './App.css';
import LoginForm from './Component/LoginForm';
import React,{useState} from 'react';
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
import PriceFilter from './Component/PriceFilter';
import ClothesProduct from './Component/ClothesProduct';

import Checkout from './Component/Checkout';
import AdminProductAdd from './Component/AdminProductAdd';
import OrderPlaced from './Component/OrderPlaced';
import OrderDetails from './Component/OrderDetails';
import ShoesProduct from './Component/ShoesProduct';
import JewelProduct from './Component/JewelProduct';
import BooksProduct from './Component/BooksProduct';
import HomeApplianceProduct from './Component/HomeAppliance';
import AdminGetProduct from './Component/AdminGetProduct';
import AdminUpdateProduct from './Component/AdminUpdateProduct';
import AdminGetOrder from './Component/AdminGetOrder';
import GoogleOauthTest from './Component/GoogleOAuth';
import AdminUserProfile from './Component/AdminUserProfile';
import AuthWrapper from './Component/ProtectedRoute';
import AdminMobileProduct from './Component/AdminMobileProduct';
import AdminLaptopProduct from './Component/AdminLaptopProduct';
import AdminTabletProduct from './Component/AdminTabletProduct';
import AdminShoesProduct from './Component/AdminShoesProduct';
import AdminJewelleryProduct from './Component/AdminJewelleryProduct';
import AdminClothesProduct from './Component/AdminClothesProduct';
import AdminBooksProduct from './Component/AdminBooksProduct';
import AdminHomeApplianceProduct from './Component/AdminHomeAppliance';
import Wishlist from './Component/Wishlist';
import UserProfile from './Component/userProfile';




function App() {
  const [cart,setCart] = useState([]);
  const role1 = localStorage.getItem("role") || localStorage.getItem("role1");
  const [role,setRole] = useState(null);

  


  return <BrowserRouter>

    <Routes>
      <Route path='/signup' element={<SignupForm />} />
      <Route path='/login' element={<LoginForm setRole={setRole}/>} />
    
      <Route path='/' element={<MainHeader cart={cart} />}>
       <Route path='/google' element={<GoogleOauthTest setRole={setRole}/>}/>
      <Route index element={role==="Admin" || role1==="Admin"?<AdminGetProduct/>:<Product cart={cart} setCart={setCart} />}></Route>
        <Route path='/productDetails' element={<ProductDetails cart={cart} setCart={setCart} />} />
        <Route path='/search/:term' element={<SearchProduct cart={cart} setCart={setCart}/>} />
        <Route path='/cart' element={<Cart cart={cart} setCart={setCart}/>} />
        <Route path='/mobile' element={<MobileProduct cart={cart} setCart={setCart}/>}/>
        <Route path='/laptop' element={<LaptopProduct cart={cart} setCart={setCart}/>}/>
        <Route path='/tablet' element={<TabletProduct cart={cart} setCart={setCart}/>}/>
        <Route path='/clothes' element={<ClothesProduct cart={cart} setCart={setCart}/>}/>
        <Route path='/gold' element={<JewelProduct cart={cart} setCart={setCart}/>}/>
        <Route path='/shoes' element={<ShoesProduct cart={cart} setCart={setCart}/>}/>
        <Route path='/homeappliance' element={<HomeApplianceProduct cart={cart} setCart={setCart}/>}/>
        <Route path='/books' element={<BooksProduct cart={cart} setCart={setCart}/>}/>
       
        <Route path='/checkout' element={<Checkout cart={cart} setCart={setCart}/>}/>
        <Route path='/filter' element={<PriceFilter/>}/>
        <Route path='/addproduct' element={role1==="Admin" ? <AdminProductAdd/> : <h2>You are not authorized to view this page</h2>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/update' element={role1==="Admin" ? <AdminUpdateProduct/>:<h2>You are not authorized to view this page</h2>}/>
        <Route path="/admingetorder" element={role1==="Admin" ? <AdminGetOrder/> : <h2>You are not authorized to view this page</h2>}/>
        <Route path="/AdminUser" element={role1 === "Admin" ? <AdminUserProfile/> : <h2>You are not authorized to view this page</h2>}/>
        <Route path='/placed' element={<OrderPlaced/>}/>
        <Route path='/details' element={<OrderDetails cart={cart} setCart={setCart}/>}/>
        <Route path='/adminMobile' element={role==="Admin" ? <AdminMobileProduct/>:<h2>You are not authorized to view this page</h2>}/>
        <Route path="/adminLaptop" element={role==="Admin" ? <AdminLaptopProduct/>:<h2>You are not authorized to view this page</h2>}/>
        <Route path='/adminTablet' element={role==="Admin" ? <AdminTabletProduct/>:<h2>You are not authorized to view this page</h2>}/>
        <Route path='/adminShoes' element={role==="Admin" ? <AdminShoesProduct/>:<h2>You are not authorized to view this page</h2>}/>
        <Route path='/adminGold' element={role==="Admin" ? <AdminJewelleryProduct/>:<h2>You are not authorized to view this page</h2>}/>
        <Route path='/adminClothes' element={role==="Admin" ? <AdminClothesProduct/>:<h2>You are not authorized to view this page</h2>}/>
        <Route path='/adminBooks' element={role==="Admin" ? <AdminBooksProduct/>:<h2>You are not authorized to view this page</h2>}/>
        <Route path='/adminHomeAppliances' element={role==="Admin" ? <AdminHomeApplianceProduct/>:<h2>You are not authorized to view this page</h2>}/>
        <Route path='/userprofile' element={<UserProfile/>}/>


      </Route>

    </Routes>



  </BrowserRouter>
}

export default App;
