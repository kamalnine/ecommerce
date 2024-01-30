import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import './AdminProductAdd.css'




function AdminProductAdd() {
  const [name,setName] = useState();
  const [description,setDescription] = useState();
  const [price,setprice]= useState();
  const [quantity,setQuantity] = useState();
  const [category,setCategory] = useState();
  const [imageURL,setImageUrl] = useState();

  const navigate = useNavigate();
  


  async function onSubmitClick() {
    try {
      console.log({name,description,price,quantity,category,imageURL });
      let item = { name,description,price,quantity,category,imageURL }
      let result = await fetch("https://localhost:7131/api/Product", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }

      })
      result = await result.json()
      console.warn("result", result);
      navigate('/');
    }
    catch (error) {
      console.log(error);
    }
  }

  function handleBackClick() {
    navigate('/');
  }

  return (
    <div>
       <br></br>
       <i className="fa fa-chevron-circle-left" aria-hidden="true" onClick={handleBackClick} style ={{top:"4.7vw", position:"absolute",left:"0.5vw", fontSize:"20px",color:"grey"}}></i>
      <h2 style={{left:"2vw" , position:"absolute"}}>patient Details</h2>
      <br /><br />

      <div className='row'>
        <div className='col-md-3'>
          <div className='form-group'>
            <label name="text">Enter the name: </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" />
            <br />
            <br />
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label name="text">Enter the Description: </label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} name="description" />
            <br />
            <br />
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label name="price">Enter the Price: </label>
            <input type="number" name="price" value={price} onChange={(e) => setprice(e.target.value)} />
            <br />
            <br />
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label name="quanity">Enter the quanity: </label>
            <input type="number" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <br />
            <br />
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label name="category">Enter the Category: </label>
            <input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <br />
            <br />
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label name="imageURL">Enter the imagURL: </label>
            <input type="text" name="address" value={imageURL} onChange={(e) => setImageUrl(e.target.value)} />
            <br />
            <br />
          </div>
        </div>
      
      

      </div>
      <button type='submit' className='btn btn-info' onClick={onSubmitClick} >Add New Product</button>
     
     
    

    </div>
  )
}

export default AdminProductAdd
