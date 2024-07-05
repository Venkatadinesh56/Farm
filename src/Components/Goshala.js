import React from 'react';
import './Goshala.css';

const CowBreedSection = ({ imageSrc1, imageSrc2, title, description }) => {
  return (
    <div className="cow-breed-section">
      <div className="images-container">
        <img src={imageSrc1} alt={title} className="cow-breed-image" />
        <img src={imageSrc2} alt={title} className="cow-breed-image" />
      </div>
      <div className="cow-breed-description">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

const Goshala = () => {
  return (
    <div className="goshala-container">
      <div className="g_header">
        <h1>Goshala</h1>
        <img className="logo_g" src="https://png.pngtree.com/png-vector/20220616/ourmid/pngtree-vector-of-cow-head-design-on-white-background-png-image_5049060.png" alt="Goshala Logo" />
      </div>
      <CowBreedSection 
        imageSrc1="https://iskcongev.com/wp-content/uploads/2023/02/about-goshala-2.jpg" 
        imageSrc2="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhKfe3uDkTtjzJG1so7IMke6a_bEovVcaZewDRRRLSj0ElGQageToi-u_1Im1x5YQbd1E&usqp=CAU" 
        title="Cow Well-being" 
        description=" Provides a safe heaven where cows are sheltered from harm, given proper medical care, and provided with nutritious food. By prioritizing the well-being of cows, Goshalas uphold the values of compassion and ahimsa (non-violence) deeply ingrained in Hindu philosophy."
      />
      <CowBreedSection 
        imageSrc1="https://iskcongev.com/wp-content/uploads/2022/01/Dangi-breed.jpg" 
        imageSrc2="https://as2.ftcdn.net/v2/jpg/05/23/57/17/1000_F_523571782_HTB5SQBkfpA5TiKwI0lpHe3sK0VmCaVZ.jpg" 
        title="Shelter and Food" 
        description="Goshalas offer shelter to cows, protecting them from harsh environmental conditions and ensuring their comfort. Additionally, they ensure access to quality food, essential for maintaining the health and vitality of cows. Adequate shelter and food contribute significantly to the overall welfare of cows within Goshalas."
      />
      <CowBreedSection 
        imageSrc1="https://www.rupanugabhajanashram.com/wp-content/uploads/2023/09/rupanuga-bhajan-ashram-goshala-cows-2023-6.jpg" 
        imageSrc2="https://thumbs.dreamstime.com/b/milking-cow-indian-men-milks-cows-farm-selective-focus-milking-cow-indian-men-milks-cows-farm-selective-focus-250716757.jpg" 
        title="Milk Production" 
        description="Beyond cow well-being, Goshalas also play a crucial role in milk production. By providing proper care, nutrition, and a conducive environment, Goshalas facilitate optimal milk production from cows. This milk, revered for its purity and nutritional value, serves as a vital resource for various purposes, including religious rituals, culinary use, and commercial production."
      />
      <div className="image-gallery-container">
        <h2>Image Gallery</h2>
        <div className="image-gallery">
          <img src="https://iskcongev.com/wp-content/uploads/2022/01/Tharparkar-breed.jpg" alt="Image 1" />
          <img src="https://t3.ftcdn.net/jpg/04/14/63/54/360_F_414635468_jDqwLq24XmGPvGu1TcwcxG88f0qjCxem.jpg" alt="Image 2" />
          <img src="https://media-cdn.tripadvisor.com/media/photo-s/0d/ff/cc/cb/goshala.jpg" alt="Image 3" />
          <img src="https://www.iskcontirupati.org/images/about/gauseva4.jpg" alt="Image 4" />
          <img src="https://www.iskcontirupati.org/images/about/gauseva6.jpg" alt="Image 5" />
          <img src="https://anudinamgoshala.org/wp-content/uploads/2022/05/ARS_0743_1-min-scaled.jpg" alt="Image 6" />
          <img src="https://www.iskconbangalore.org/wp-content/uploads/2015/11/a15-cows-at-goshala-1200x800.jpg" alt="Image 7" />
          <img src='https://www.livelaw.in/h-upload/2021/11/03/403485-cowcalf.jpg'alt='Image 8'/>
          <img src='https://t4.ftcdn.net/jpg/03/53/28/39/240_F_353283931_x0WFJMiwiOnJ26eOcVEfLrFTXwthx1fl.jpg'alt='Image 9'/>
          <img src='https://t3.ftcdn.net/jpg/05/23/74/42/360_F_523744263_GbrCZI96kvHYlcXfOhG6AbvukFB4gd28.jpg'alt='Image 10'/>
          <img src='https://t4.ftcdn.net/jpg/05/20/96/37/240_F_520963775_DneUletAd0Y2ves2QZY2oVjWYy4tcTwM.jpg'alt='Image 8'/>
          <img src='https://static.toiimg.com/thumb/msid-93560706,imgsize-1244611,width-400,height-225,resizemode-72/93560706.jpg'alt='Image 8'/>       
          </div>
    </div>
</div>
  );
};

export default Goshala;
