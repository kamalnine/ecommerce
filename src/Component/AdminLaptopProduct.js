import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosArrowBack } from 'react-icons/io';
function AdminLaptopProduct({ cart, setCart }) {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductByCategory();
  }, []);

  function fetchProductByCategory() {
    try {
      fetch('https://localhost:7131/api/Product/GetProductByCategory?category=laptop')
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = (productId) => {
    navigate(`/update/${productId}`);
  };

  const addToCart = (productID, name, description, price, imageURL) => {
    // Your add to cart logic
  };

  return (
    <div className='container my-5'>
         <IoIosArrowBack onClick={() => navigate(-1)} style={{ position: 'absolute', top: '67px', left: '20px', fontSize: '24px', color: 'grey', cursor: 'pointer' }} />
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
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
  );
}

export default AdminLaptopProduct;
