import React, { useState, useEffect } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Button 
} from '@material-ui/core';
import { useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Slide from './Slide';

const AdminGetProduct = ({ cart, setCart }) => {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        try {
            const response = await fetch('https://localhost:7131/api/Product/GetProduct');
            const data = await response.json();

            if (data.status !== 401) {
                setProduct(data);
            } else {
               
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
          <button className="btn btn-warning" onClick={() => navigate('/addproduct')} style={{position:"absolute",left:"89vw",top:"6.5vw"}}>
        Add New Product
      </button>
            <div className='container-fluid my-5'>
          
      <br></br>
                <ToastContainer
                    position='top-right'
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='dark'
                />
                <TableContainer component={Paper}>
                    <Table aria-label="product table">
                        <TableHead>
                            <TableRow>
                            <TableCell>Sr. No</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product.map((prod,index) => (
                                <TableRow key={prod.productID}>
                                      <TableCell>{index + 1}</TableCell>
                                    <TableCell>{prod.name}</TableCell>
                                    <TableCell>{prod.description}</TableCell>
                                    <TableCell>{prod.price}&#36;</TableCell>
                                    <TableCell>{prod.category}</TableCell>
                                    <TableCell>{prod.quantity}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            onClick={() => navigate(`/update?data2=${JSON.stringify(prod)}`)}
                                        >
                                            Update
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default AdminGetProduct;
