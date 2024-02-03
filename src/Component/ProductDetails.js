import React,{useState,useEffect} from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
} from 'mdb-react-ui-kit';
import {ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { IoIosArrowBack } from "react-icons/io";



function ProductDetails({cart,setCart}) {
    const [id,setid]=useState();
    // const[setJsonData]=useState({});
    const[name,setName] = useState("");
    const[description,setDescription] = useState("");
    const[imageURL,setImageURL] = useState("");
    const[price,setPrice] = useState("");
    // const[setCategory] = useState("");
    const[relatedProduct,setRelatedProduct] = useState([]);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
   const t = localStorage.getItem("r");
   const u= localStorage.getItem("resultGoogle");
    useEffect(() => {
        const logged = localStorage.getItem("log");
       
        setIsLoggedIn(logged === "true"); // Convert the string to boolean
    }, []);
    const addToCart = (productID, name, description, price, imageURL) => {
      if (t==="Authorized" || u==="Authorized") {
      const obj = {
          productID, name, description, price, imageURL
      }
      setCart([...cart, obj]);
      console.log(cart);
      toast.success('🦄 Item Added To Cart!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
         
          });
        }
        else{
          toast.error('Please login first to add items to cart', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }    
  }
    useEffect(() => {
      const fetchData = async () => {
          try {
              const params = new URLSearchParams(window.location.search).get("data1");
              const parsedData = JSON.parse(params);
              // setJsonData(parsedData);
              setid(parsedData.productID);
              setName(parsedData.name);
              setDescription(parsedData.description);
              setImageURL(parsedData.imageURL);
              setPrice(parsedData.price);
              // setCategory(parsedData.category);
  
    
            
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
<IoIosArrowBack onClick={()=>navigate('/')} style={{position:"absolute",top:"10vh",left:"6vw",fontSize:"50px"}}/>
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
    <div className="container con">
      <div className='img' >
      <img src={imageURL} alt="" style={{width:"25vw"}}/>
      </div>

      <div className="text-center">
        <h1 className='card-title'>{name}</h1>
        <p className="card-text">{description}</p>
        <button className='btn btn-primary mx-3'>{price}&#36;</button>
        <button className="btn btn-warning" onClick={()=>addToCart(id,name,description,price,imageURL)}>Add To Cart</button>
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
                               
                                <img src={prod.imageURL} className="card-img-top" alt="..."  style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }} onClick={()=>navigate(`/productDetails?data1=${JSON.stringify(prod)}`)}/>
                                
                            </MDBCardHeader>
                            <MDBCardBody style={{ padding: "1rem",maxHeight:"150px" }}>
                                <MDBCardTitle style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: '0.5rem' }}>{prod.name}</MDBCardTitle>
                                <MDBCardText style={{ marginBottom: '1rem' }}>
                                    {prod.description}{prod.productID}
                                </MDBCardText>
                               
                            </MDBCardBody>
                            <MDBCardFooter style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                                    <button className='btn btn-primary mx-3'>{prod.price}&#36;</button>
                                    <button className='btn btn-warning' onClick={()=>addToCart(prod.productID,prod.name,prod.description,prod.price,prod.imageURL)} style={{float:"right"}}>Add to cart</button>
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