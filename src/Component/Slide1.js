import React from 'react'
import ImageSlider1 from './ImageSlider1';
import './Slide1.css'; 

const Slide1 = () => {
    const images = [
      'https://d16pnh712pyiwa.cloudfront.net/wp-content/uploads/2020/11/Landing-page-banner-scaled.jpg',
      'https://images.freekaamaal.com/post_images/1659328056.JPG',

      
    ];
   
    return (
      <div className="center-container1">
        <div className="image-slider1">
          <ImageSlider1 images={images} />
        </div>
      </div>
    );
  };
   

export default Slide1;
