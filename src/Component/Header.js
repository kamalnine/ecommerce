import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Header() {
    return (
        <>
            <header className='sticky-top'>
                <div className='nav-bar'>
                    <Link to={'/home'} className='brand'>ShopSphere</Link>
                    <div className='search-bar'>
                       <input type = "text" placeholder='Search Products'/>
                    </div>
                    <Link to={'/cart'} className='cart'>Cart</Link>
                 </div>
                <div className='nav-bar-wrapper'>
                    <div className='items'>Filter By {"=>"}</div>
                    <NavLink to='/home' className='items'>No Filter</NavLink>
                    <NavLink to = '/mobile' className='items'>Mobiles</NavLink>
                    <NavLink to='/laptop' className='items'>Laptops</NavLink>
                    <NavLink to='/tablet' className='items'>Tablets</NavLink>
                    <NavLink to='/clothes' className='items'>Clothes</NavLink>
                    <NavLink to='/less' className='items'>{">="}29999</NavLink>
                    <NavLink to ='/lesss' className='items'>{">="}49999</NavLink>
                    <NavLink to='/lessss' className='items'>{">="}69999</NavLink>
                    <NavLink to='/lesssss' className='items'>{">="}89999</NavLink>


                
                </div>
            </header>
        </>
    )
}

export default Header