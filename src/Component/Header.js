import React, { useState,useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";

function Header({ cart }) {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const sol = localStorage.getItem("resultGoogle");
   
    useEffect(() => {
        const logged = localStorage.getItem("log");
        const logged1 = localStorage.getItem("log1");
        setIsLoggedIn(logged === "true") // Convert the string to boolean
    }, []);
    
  localStorage.setItem("add",isLoggedIn);

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchTerm}`)
        setSearchTerm("");
    }
    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
     }

  


    return (
        <>
            <header className='sticky-top'>
                <div className='nav-bar'>
                    <Link to={'/'} className='brand'>ShopSphere</Link>
                    <form className='search-bar' onSubmit={handleSubmit}>
                        <input type="text" placeholder='Search Products' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </form>
                    {isLoggedIn || sol==='Authorized' ?  <Link to={'/cart'} className='cart'>
                        <button type="button" className="btn btn-primary position-relative">
                            <FaCartShopping />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cart.length}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </button>
                    </Link> : ""}
                   
                    {isLoggedIn || sol==='Authorized' ? (
                       <button type="button" onClick={handleLogout} className="btn btn-warning position-relative">
                       Logout </button>
                    ) :
                    <>
                    <Link to={'/login'} className="login">
                        <button type="button" className="btn btn-warning position-relative" style={{position:"absolute",right:"-20px"}}>
                            Login </button>
                    </Link>
                    <Link to={'/signup'} className="signup">
                        <button type="button" className="btn btn-warning position-relative"style={{position:"absolute",right:"10px"}}>
                            Signup </button>
                    </Link>
                </>
                        
                            
                       


                    }


                </div>
                {
                    location.pathname === '/' && (
                        <div className='nav-bar-wrapper'>
                            <NavLink className='items' onClick={toggleFilterVisibility}>Filter By {"=>"}</NavLink>
                            {isFilterVisible && (
                                <>
                                    <NavLink to='/' className='items'>No Filter</NavLink>
                                    <NavLink to='/mobile' className='items'>Mobiles</NavLink>
                                    <NavLink to='/laptop' className='items'>Laptops</NavLink>
                                    <NavLink to='/tablet' className='items'>Tablets</NavLink>
                                    <NavLink to='/clothes' className='items'>Clothes</NavLink>
                                    <NavLink to='/less' className='items'>{"<="}29999</NavLink>
                                    <NavLink to='/lesss' className='items'>{"<="}49999</NavLink>
                                    <NavLink to='/lessss' className='items'>{"<="}69999</NavLink>
                                    <NavLink to='/lesssss' className='items'>{"<="}89999</NavLink>
                                </>
                            )}


                        </div>
                    )
                }

            </header>
        </>
    )
}

export default Header