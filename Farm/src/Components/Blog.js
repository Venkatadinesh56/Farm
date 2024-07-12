import './Blog.css';
import React from 'react';
export default function Products() {
  return (
    <div className="products-page">
      <h2 >Our Products</h2>
      <div className="product-list">
        <div className="product">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg" alt="Alphonso Mango" />
          <h3>Alphonso Mango</h3>
          <p>The Alphonso mango is often referred to as the "King of Mangoes" due to its rich, sweet taste and smooth texture.</p>
        </div>
        <div className="product">
          <img src="https://www.pureroot.in/uploads/products/1653629943kesarMango.webp" alt="Kesar Mango" />
          <h3>Kesar Mango</h3>
          <p>Kesar mangoes are known for their distinct sweet flavor and vibrant orange flesh. They are popular for making desserts and juices.</p>
        </div>
        <div className="product">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKxHT6WDgFsQWJeG0cXz8wsilhJ_lqV7iSMg&s" alt="Langra Mango" />
          <h3>Langra Mango</h3>
          <p>Langra mangoes have a tangy-sweet taste and fibrous texture. They are ideal for eating fresh or using in salads and chutneys.</p>
        </div>
        <div className="product">
          <img src="https://seed2plant.in/cdn/shop/files/banganapalli.webp?v=1683639738" alt="Banganapalli Mango" />
          <h3>Banganapalli</h3>
          <p>Banganapalle mangoes is a mango variety produced in Banganapalle of Nandyal District in the Indian state of Andhra Pradesh.</p>
        </div>
        <div className="product">
          <img src="https://indiangloriousnursery.com/wp-content/uploads/2023/04/419Zfo0yAkL.jpg" alt="Neelum Mango" />
          <h3>Neelum</h3>
          <p>Neelum is a South Indian dessert mango, widely grown throughout the country and to an increasing extent in southernmost China. The fruit weigh 9 to 12 oz, with the general shape of a fat cashew nut. They are smooth-skinned and bright yellow upon ripening and have no blush. The flesh is deep yellow or orange.</p>
          </div>
          <div className="product">
            <img src="https://media.easemytrip.com/media/Blog/India/636963790834862178/63696379083486217863Y6St.jpg" alt="Badami Mango"/>
            <h3>Badami</h3>
            <p>Badami is the most popular mango variety of the state of Karnataka. It is mostly referred as the own Alphonso of the state. The taste and texture of this mango variety is almost similar to Alphonso. This is the reason; it is beinng liked by a huge number of people. The variety of mango got its name from the Badami city of Karnataka. The best season to find Badami Mango is from April to June.</p>
          </div>
      </div>
    </div>
  );
}