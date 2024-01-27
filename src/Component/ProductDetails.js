import React,{useState,useEffect} from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
} from 'mdb-react-ui-kit';



function ProductDetails() {
    const [id,setid]=useState();
    const[jsonData,setJsonData]=useState({});
    const[name,setName] = useState("");
    const[description,setDescription] = useState("");
    const[imageURL,setImageURL] = useState("");
    const[price,setPrice] = useState("");
    const[category,setCategory] = useState("");
    const[relatedProduct,setRelatedProduct] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
          try {
              const params = new URLSearchParams(window.location.search).get("data1");
              const parsedData = JSON.parse(params);
              setJsonData(parsedData);
              setid(parsedData.productID);
              setName(parsedData.name);
              setDescription(parsedData.description);
              setImageURL(parsedData.imageURL);
              setPrice(parsedData.price);
              setCategory(parsedData.category);
  
      console.log(category);
            
          } catch (error) {
              console.error('Error parsing JSON:', error);
            
          }
      };
  
      fetchData();
      fetchProductByCategory();
    
  }, []);
 
  function fetchProductByCategory() {
    try {
      const params = new URLSearchParams(window.location.search).get("data1");
      const parsedData = JSON.parse(params);

      
      fetch(`https://localhost:7131/api/Product/GetProductByCategory?category=${parsedData.category}`,{
        // headers:{
        //   'Authorization': `Bearer ${token}`,
        //   'Content-Type': 'application/json'
        // }
      })
        .then((response) => response.json())
        .then((data) => {
          setRelatedProduct(data);
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
    <>
    <div className="container con">
      <div className='img'>
      <img src={imageURL} alt=""/>
      </div>

      <div className="text-center">
        <h1 className='card-title'>{name}</h1>
        <p className="card-text">{description}</p>
        <button className='btn btn-primary mx-3'>{price} &#8377;</button>
        <button className="btn btn-warning">Add To Cart</button>
      </div>
    </div>
    <div className="related-products my-5" >
      <br></br><br></br>
        <h2>Related Products</h2>
        <div className='container my-5'>
            <div className="row" style={{ padding: "10px",position:"absolute",left:"2vw" }}>
                {relatedProduct.map((prod) => (
                    <div key={prod.productID} className="col-md-4" style={{ marginBottom: "20px" }}>
                        <MDBCard style={{ border: "1px solid #ddd", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", borderRadius: "4px", height: '100%', width: '65%' }}>
                            <MDBCardHeader style={{ padding: '0', maxHeight: '300px' }} >
                               
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
      </div>
    
 
    </>
  )
}

export default ProductDetails