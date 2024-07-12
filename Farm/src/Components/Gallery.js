import React from 'react';
import './Gallery.css';
import MangoFarm from '../assets/MangoFarm.mp4';

const mangoImages = [
  { src: 'https://mangoesmart.com/Images/Product/banganpalli.png', alt: 'Mango 1', text: 'Banganpalli' },
  { src: 'https://m.media-amazon.com/images/I/31dsEGZcuML._SX300_SY300_QL70_FMwebp_.jpg', alt: 'Mango 2', text: 'Dasheri' },
  { src: 'https://mangoesmart.com/Images/Product/kesar.png', alt: 'Mango 3', text: 'Kesar' },
  { src: 'https://mangoesmart.com/Images/Product/chinna_rasalu_mango_online_hyderabad.jpg', alt: 'Mango 4', text: 'Chinna Rasalu' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Carabao_mangoes_%28Philippines%29.jpg/330px-Carabao_mangoes_%28Philippines%29.jpg', alt: 'Mango 4', text: 'Carabao' },
  { src: 'https://www.bobbasmangoes.com/cdn/shop/files/langra_1024x1024.jpg?v=1683028585', alt: 'Mango 1', text: 'Langra' },
  { src: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/fruit/a/k/m/-original-imag2gy48ufdr8zj.jpeg?q=90', alt: 'Mango 1', text: 'Chausa ' },
  { src: 'https://5.imimg.com/data5/HN/LA/BB/SELLER-21493216/totapuri-mango.jpg', alt: 'Mango 1', text: 'Totapuri' },
];

const MangoGallery = () => {
  return (
    <div className="gallery-container">
      <h1>Mango Gallery</h1>
      <div className="banner">
        <video autoPlay muted loop playsInline
        style={{ width: 'calc(100% - 40px)', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
        >
          <source src={MangoFarm} type="video/mp4" />
        </video>
      </div>
      <h1>Mango Varieties</h1>
      <div className="gallery">
        {mangoImages.map((image, index) => (
          <div className="gallery-item" key={index}>
            <img src={image.src} alt={image.alt} />
            <div className="overlay">
              <div className="text">{image.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangoGallery;
