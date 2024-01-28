import React,{useEffect, useState} from 'react'
import { useParams,useNavigate } from 'react-router'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
} from 'mdb-react-ui-kit';

const SearchProduct = () => {
console.log(useParams());
const {term} = useParams();
const[searchProduct,setSearchProduct] = useState([]);
const navigate = useNavigate();

useEffect(()=>{
  fetchProductBySearch();
})
function fetchProductBySearch() {
  try {
    
    
    fetch(`https://localhost:7131/api/Product/Search?keyword=${term}`,{
    
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchProduct(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  catch (error) {
    console.log(error);
  }
}
  return (
    <div className='container my-5'>
    <div className="row" style={{ padding: "10px" }}>
        {searchProduct
        .map((prod) => (
            <div key={prod.productID} className="col-md-4" style={{ marginBottom: "20px" }}>
                <MDBCard style={{ border: "1px solid #ddd", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", borderRadius: "4px", height: '100%', width: '100%' }}>
                    <MDBCardHeader style={{ padding: '0', maxHeight: '300px' }} onClick={()=>navigate(`/productDetails?data1=${JSON.stringify(prod)}`)}>
                       
                        <img src={prod.imageURL} className="card-img-top" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }} />
                        
                    </MDBCardHeader>
                    <MDBCardBody style={{ padding: "1rem",maxHeight:"150px" }}>
                        <MDBCardTitle style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: '0.5rem' }}>{prod.name}</MDBCardTitle>
                        <MDBCardText style={{ marginBottom: '1rem' }}>
                            {prod.description}{prod.productID}
                        </MDBCardText>
                       
                    </MDBCardBody>
                    <MDBCardFooter style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                            <button className='btn btn-primary mx-3'>{prod.price} &#8377;</button>
                            <button className='btn btn-warning' style={{float:"right"}}>Add to cart</button>
                        </MDBCardFooter>
                </MDBCard>
            </div>
        ))}
    </div>
</div>
  )
}

export default SearchProduct