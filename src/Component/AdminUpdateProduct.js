import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { IoIosArrowBack } from 'react-icons/io';
import 'react-toastify/dist/ReactToastify.css';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter } from 'mdb-react-ui-kit';

function AdminUpdateProduct({ cart, setCart }) {
  const [id, setId] = useState('');
  const [jsonData, setJsonData] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(window.location.search).get('data2');
        if (params) {
          const parsedData = JSON.parse(params);
          setJsonData(parsedData);
          setId(parsedData.productID);
          setName(parsedData.name);
          setDescription(parsedData.description);
          setImageURL(parsedData.imageURL);
          setPrice(parsedData.price);
          setQuantity(parsedData.quantity);
          setCategory(parsedData.category);
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
       
      }
    };

    fetchData();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`https://localhost:7131/api/Product/Delete/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      console.warn(data);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async () => {
    try {
      console.log({ id, name, description, price, quantity, category, imageURL });
      const item = { id, name, description, price, quantity, category, imageURL };
      const response = await fetch(`https://localhost:7131/api/Product/UpdateProduct/${id}?name=${name}&description=${description}&price=${price}&quantity=${quantity}&category=${category}&imageurl=${imageURL}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container">
        <IoIosArrowBack onClick={() => navigate('/')} style={{ position: 'absolute', top: '67px', left: '20px', fontSize: '24px', color: 'grey', cursor: 'pointer' }} />
        <h1>You're Viewing the Product <b>{jsonData.name}</b> details.</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">Name</label>
            <input type="text" className="form-control" id="productName" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">Description</label>
            <input type="text" className="form-control" id="productDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">Price</label>
            <input type="number" className="form-control" id="productPrice" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="productQuantity" className="form-label">Quantity</label>
            <input type="number" className="form-control" id="productQuantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="productCategory" className="form-label">Category</label>
            <input type="text" className="form-control" id="productCategory" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
         
         <button type="button" className="btn btn-danger mr-2" onClick={() => deleteProduct(id)}>Delete</button>
         &nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" className="btn btn-warning mr-2" onClick={updateProduct}>Update</button>
        </form>
      </div>
    </>
  );
}

export default AdminUpdateProduct;
