import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate,useLocation } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";

function Header({cart}) {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchTerm}`)
        setSearchTerm("");
    }


    return (
        <>
            <header className='sticky-top'>
                <div className='nav-bar'>
                    <Link to={'/home'} className='brand'>ShopSphere</Link>
                    <form className='search-bar' onSubmit={handleSubmit}>
                        <input type="text" placeholder='Search Products' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </form>
                    <Link to={'/cart'} className='cart'>
                        <button type="button" className="btn btn-primary position-relative">
                        <FaCartShopping /> 
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cart.length}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </button>
                    </Link>

                </div>
                {
                location.pathname==='/home' && (
                    <div className='nav-bar-wrapper'>
                    <NavLink className='items' onClick={toggleFilterVisibility}>Filter By {"=>"}</NavLink>
                    {isFilterVisible && (
                        <>
                            <NavLink to='/home' className='items'>No Filter</NavLink>
                            <NavLink to='/mobile' className='items'>Mobiles</NavLink>
                            <NavLink to='/laptop' className='items'>Laptops</NavLink>
                            <NavLink to='/tablet' className='items'>Tablets</NavLink>
                            <NavLink to='/clothes' className='items'>Clothes</NavLink>
                            <NavLink to='/less' className='items'>{">="}29999</NavLink>
                            <NavLink to='/lesss' className='items'>{">="}49999</NavLink>
                            <NavLink to='/lessss' className='items'>{">="}69999</NavLink>
                            <NavLink to='/lesssss' className='items'>{">="}89999</NavLink>
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