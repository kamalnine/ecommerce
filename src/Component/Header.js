import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCartShopping, FaFilter } from 'react-icons/fa6';
import { NavDropdown } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";

function Header({ cart }) {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const sol = localStorage.getItem('resultGoogle');
    const name = localStorage.getItem('name');
    const t = localStorage.getItem('r');
    const role = localStorage.getItem("role");


    useEffect(() => {
        const logged = localStorage.getItem('log');
        setIsLoggedIn(logged === 'true'); // Convert the string to boolean
    }, []);

    localStorage.setItem('add', isLoggedIn);

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchTerm}`);
        setSearchTerm('');
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/');
        window.location.reload();
    };

    return (
        <>
       {role==="Customer" ? ( <header className="sticky-top bg-light">
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#0F1111", color: "white" }}>
                <div className="container-fluid">
                    <Link to={'/'} className="navbar-brand text-light">ShopSphere</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" style={{ color: "white" }}></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarNav" >
                        <form className="d-flex mx-auto my-2 my-lg-0" onSubmit={handleSubmit} style={{ height: "35px" }}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search Products"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-outline-success" type="submit" style={{ color: "black", backgroundColor: "white" }}>
                                <FaSearch />
                            </button>
                            &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => navigate('/filter')}
                                style={{ color: "black", backgroundColor: "white" }}
                            >
                                <FaFilter />
                            </button>
                        </form>
                        <ul className="navbar-nav">
                            {t === "Authorized" || sol === "Authorized" ? (
                                <>
                                    <li className="nav-item">
                                        <span className="navbar-text text-light" style={{ position: "absolute", left: "71vw", top: "1vh", color: "white" }}>
                                            Welcome, {name}!
                                            
                                        </span>
                                   </li>

                                    <li className="nav-item">
                                        <Link to={'/cart'} className="nav-link">
                                            <FaCartShopping style={{ color: "white" }} />
                                            <span className="badge bg-danger rounded-pill">{cart.length}</span>
                                        </Link>
                                    </li>
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    <li className="nav-item">
                                        <button
                                            className="btn btn-light"
                                            onClick={() => navigate('/details')}
                                        >
                                            My Orders
                                        </button>
                                    </li>
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link to={'/login'} className="btn btn-light">
                                            Login
                                        </Link>
                                    </li>
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <li className="nav-item">
                                        <Link to={'/signup'} className="btn btn-light">
                                            Signup
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                {t === "Authorized" || sol === "Authorized" ? (
                                    <button className="btn btn-light" onClick={handleLogout}>
                                        Logout
                                    </button>
                                ) : null}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {location.pathname === '/' && (
                <div className="nav-bar-wrapper" style={{ height: "40px", backgroundColor: "#232f3e" }}>
                    <ul className="navbar-nav" style={{ display: 'flex', flexDirection: 'row', gap: '130px', marginTop: "-15px" }}>
                        <li className="nav-item dropdown" >
                            <NavDropdown title="Electronics" id="navbarDropdown">
                                <NavDropdown.Item as={Link} to="/mobile">Mobiles</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/laptop">Laptops</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/tablet">Tablets</NavDropdown.Item>
                            </NavDropdown>
                        </li>
                        <li className="nav-item dropdown">
                            <NavDropdown title="Clothing, Shoes & Jewelry" id="navbarDropdown2">
                                <NavDropdown.Item as={Link} to="/clothes">Clothes</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/shoes">Shoes</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/gold">Jewelry</NavDropdown.Item>
                            </NavDropdown>
                        </li>
                        <li className="nav-item" style={{ color: "white" }}>
                            <NavLink to="/books" className="nav-link text-light" >
                                Books
                            </NavLink>
                        </li>
                        <li className="nav-item" style={{ color: "white" }}>
                            <NavLink to="/homeappliance" className="nav-link text-light">
                                Home & Kitchen
                            </NavLink>
                        </li>
                        <li className="nav-item" style={{ color: "white" }}>
                            <NavLink to="/less" className="nav-link text-light">
                                {'>'}=200$
                            </NavLink>
                        </li>
                        <li className="nav-item" style={{ color: "white" }}>
                            <NavLink to="/lesss" className="nav-link text-light">
                                {'>'}=400$
                            </NavLink>
                        </li>
                        <li className="nav-item" style={{ color: "white" }}>
                            <NavLink to="/lessss" className="nav-link text-light">
                                {'>'}=800$
                            </NavLink>
                        </li>
                        <li className="nav-item" style={{ color: "white" }}>
                            <NavLink to="/lesssss" className="nav-link text-light">
                                {'>'}=1600$
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
        </header>) :
       ( <header className="sticky-top bg-light">
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#0F1111", color: "white" }}>
                <div className="container-fluid">
                    <Link to={'/'} className="navbar-brand text-light">ShopSphere</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" style={{ color: "white" }}></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarNav" >
                        <form className="d-flex mx-auto my-2 my-lg-0" onSubmit={handleSubmit} style={{ height: "35px" }}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search Products"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-outline-success" type="submit" style={{ color: "black", backgroundColor: "white" }}>
                                <FaSearch />
                            </button>
                            &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => navigate('/filter')}
                                style={{ color: "black", backgroundColor: "white" }}
                            >
                                <FaFilter />
                            </button>
                        </form>
                        <ul className="navbar-nav">
                            {t === "Authorized" || sol === "Authorized" ? (
                                <>
                                    <li className="nav-item">
                                        <span className="navbar-text text-light" style={{ position: "absolute", left: "57vw", top: "1vh", color: "white" }}>
                                            (Admin) Welcome, {name}!
                                            
                                        </span>
                                   </li>

                                    <li className="nav-item">
                                        <Link to={'/cart'} className="nav-link">
                                            <FaCartShopping style={{ color: "white" }} />
                                            <span className="badge bg-danger rounded-pill">{cart.length}</span>
                                        </Link>
                                    </li>
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    <li className="nav-item">
                                        <button
                                            className="btn btn-light"
                                            onClick={() => navigate('/admingetorder')}
                                        >
                                            See All Orders
                                        </button>
                                    </li>
                                    &nbsp;  &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    <li className="nav-item">
                                        <button
                                            className="btn btn-light"
                                            onClick={() => navigate('/details')}
                                        >
                                            My Orders
                                        </button>
                                    </li>
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link to={'/login'} className="btn btn-light">
                                            Login
                                        </Link>
                                    </li>
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <li className="nav-item">
                                        <Link to={'/signup'} className="btn btn-light">
                                            Signup
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                {t === "Authorized" || sol === "Authorized" ? (
                                    <button className="btn btn-light" onClick={handleLogout}>
                                        Logout
                                    </button>
                                ) : null}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {location.pathname === '/' && (
                <div className="nav-bar-wrapper" style={{ height: "40px", backgroundColor: "#232f3e" }}>
                    <ul className="navbar-nav" style={{ display: 'flex', flexDirection: 'row', gap: '130px', marginTop: "-15px" }}>
                        <li className="nav-item dropdown" >
                            <NavDropdown title="Electronics" id="navbarDropdown">
                                <NavDropdown.Item as={Link} to="/mobile">Mobiles</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/laptop">Laptops</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/tablet">Tablets</NavDropdown.Item>
                            </NavDropdown>
                        </li>
                        <li className="nav-item dropdown">
                            <NavDropdown title="Clothing, Shoes & Jewelry" id="navbarDropdown2">
                                <NavDropdown.Item as={Link} to="/clothes">Clothes</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/shoes">Shoes</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/gold">Jewelry</NavDropdown.Item>
                            </NavDropdown>
                        </li>
                        <li className="nav-item" style={{ color: "white" }}>
                            <NavLink to="/books" className="nav-link text-light" >
                                Books
                            </NavLink>
                        </li>
                        <li className="nav-item" style={{ color: "white" }}>
                            <NavLink to="/homeappliance" className="nav-link text-light">
                                Home & Kitchen
                            </NavLink>
                        </li>
                        <li className="nav-item" style={{ color: "white" }}>
                            <NavLink to="/less" className="nav-link text-light">
                                {'>'}=200$
                            </NavLink>
                        </li>
                        <li className="nav-item" style={{ color: "white" }}>
                            <NavLink to="/lesss" className="nav-link text-light">
                                {'>'}=400$
                            </NavLink>
                        </li>
                        <li className="nav-item" style={{ color: "white" }}>
                            <NavLink to="/lessss" className="nav-link text-light">
                                {'>'}=800$
                            </NavLink>
                        </li>
                        <li className="nav-item" style={{ color: "white" }}>
                            <NavLink to="/lesssss" className="nav-link text-light">
                                {'>'}=1600$
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    
     )}
     </>
    );
}

export default Header;
