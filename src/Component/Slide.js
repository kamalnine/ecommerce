import React from 'react';
import ImageSlider from './ImageSlider';
import './Slide.css';  // Import the CSS file
 
const Slide = () => {
  const images = [
    'https://www.xda-developers.com/files/2022/09/iPhone-14-midnight.jpg',
    'https://www.resetdigitale.it/118801-thickbox_default/tablet-apple-ipad-pro-12-128gb-wifi-grigio.jpg',
    'https://i1.wp.com/www.mac-ave.com/wp-content/uploads/2021/01/iPad_Air_Wi-Fi_Space_Gray_PDP_Image_Position-1B__en-US1000x1000.jpg',
    'https://www.bhphotovideo.com/images/images2500x2500/asus_republic_of_gamers_g750jx_db71_983612.jpg',
    'https://www.bhphotovideo.com/images/images2500x2500/hp_4su75ut_aba_elitebook_x360_1030_g3_i7_8650u_1425670.jpg',
    
  ];
 
  return (
    <div className="center-container">
      <div className="image-slider">
        <ImageSlider images={images} />
      </div>
    </div>
  );
};
 
export default Slide;