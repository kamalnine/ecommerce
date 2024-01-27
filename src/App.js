import { ToastContainer } from 'react-toastify';
import './App.css';
import LoginForm from './Component/LoginForm';
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

function App() {
  return <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route index element={<SignupForm />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/' element={<MainHeader />}>
        <Route path='/home' element={<Product />} />
        <Route path='/productDetails' element={<ProductDetails />} />
        <Route path='/search' element={<SearchProduct />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/mobile' element={<MobileProduct/>}/>
        <Route path='/laptop' element={<LaptopProduct/>}/>
        <Route path='/tablet' element={<TabletProduct/>}/>
        <Route path='/clothes' element={<ClothesProduct/>}/>
        <Route path='/less' element={<PriceLess29999/>}/>
        <Route path='/lesss' element={<PriceLess49999/>}/>
        <Route path='/lessss' element={<PriceLess69999/>}/>
        <Route path='/lesssss' element={<PriceLess89999/>}/>


      </Route>


    </Routes>



  </BrowserRouter>
}

export default App;
