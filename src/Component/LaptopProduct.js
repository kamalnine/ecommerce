import { IoIosArrowBack } from "react-icons/io";
import React,{useState,useEffect} from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter,
  } from 'mdb-react-ui-kit';
  import {useNavigate} from 'react-router'
  import { ToastContainer,toast } from "react-toastify";
function LaptopProduct({cart,setCart}) {
    const [product, setProduct] = useState([]);
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

  useEffect(()=>{
    fetchProductByCategory()
  })

  function fetchProductByCategory() {
    try {
      fetch('https://localhost:7131/api/Product/GetProductByCategory?category=laptop',{
        // headers:{
        //   'Authorization': `Bearer ${token}`,
        //   'Content-Type': 'application/json'
        // }
      })
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
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
      <IoIosArrowBack onClick={()=>navigate('/')} style={{fontSize:"20px",position:"absolute",top:"8vh",left:"0.1vw"}}/>
            <div className="row" style={{ padding: "10px",position:"absolute",left:"2vw" }}>
                {product.map((prod) => (
                    <div key={prod.productID} className="col-md-4" style={{ marginBottom: "20px" }}>
                        <MDBCard  onClick={()=>navigate(`/productDetails?data1=${JSON.stringify(prod)}`)} style={{ border: "1px solid #ddd", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", borderRadius: "4px", height: '100%', width: '65%' }}>
                            <MDBCardHeader style={{ padding: '0', maxHeight: '300px' }} >
                               
                                <img src={prod.imageURL} className="card-img-top" alt="..."onClick={()=>navigate(`/productDetails?data1=${JSON.stringify(prod)}`)} style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }} />
                                
                            </MDBCardHeader>
                            <MDBCardBody style={{ padding: "1rem",maxHeight:"150px" }}>
                                <MDBCardTitle style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: '0.5rem' }}>{prod.name}</MDBCardTitle>
                                <MDBCardText style={{ marginBottom: '1rem' }}>
                                    {prod.description}{prod.productID}
                                </MDBCardText>
                               
                            </MDBCardBody>
                            <MDBCardFooter style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                                    <button className='btn btn-primary mx-3'>{prod.price}&#36;</button>
                                    {/* <button className='btn btn-warning' style={{float:"right"}} onClick={()=>addToCart(prod.productID,prod.name,prod.description,prod.price,prod.imageURL)}>Add to cart</button> */}
                                </MDBCardFooter>
                        </MDBCard>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default LaptopProduct